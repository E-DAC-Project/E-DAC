import React, { useEffect, useState } from "react";
import axios from "../pages/axios";
import { toast } from "react-toastify";

function AdminMCQ() {
  const [mcqs, setMcqs] = useState([]);
  const [newMCQ, setNewMCQ] = useState({
    question: "",
    options: { A: "", B: "", C: "", D: "" },
    answer: "",
    explanation: "",
  });

  const [selectedAnswers, setSelectedAnswers] = useState({});

  useEffect(() => {
    fetchMCQs();
  }, []);

  const fetchMCQs = async () => {
    try {
      const res = await axios.get("/api/mcq");
      setMcqs(res.data);
    } catch {
      toast.error("Failed to load MCQs");
    }
  };

  const handleAdd = async () => {
    const { question, options, answer } = newMCQ;
    if (!question || !options.A || !options.B || !options.C || !options.D || !answer) {
      toast.warning("All fields are required");
      return;
    }
    try {
      await axios.post("/api/mcq", newMCQ);
      toast.success("MCQ added!");
      setNewMCQ({ question: "", options: { A: "", B: "", C: "", D: "" }, answer: "", explanation: "" });
      fetchMCQs();
    } catch {
      toast.error("Failed to add MCQ");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this MCQ?")) return;
    try {
      await axios.delete(`/api/mcq/${id}`);
      toast.success("Deleted successfully");
      fetchMCQs();
    } catch {
      toast.error("Failed to delete");
    }
  };

  const handleOptionSelect = (mcqId, selectedKey) => {
    setSelectedAnswers((prev) => ({ ...prev, [mcqId]: selectedKey }));
  };

  const handleTryAgain = (mcqId) => {
    setSelectedAnswers((prev) => {
      const updated = { ...prev };
      delete updated[mcqId];
      return updated;
    });
  };

  return (
    <div className="admin-wrapper">
      <h2 className="admin-header">Manage MCQs</h2>

      <div className="mb-4">
        <input
          className="form-control mb-2"
          placeholder="Question"
          value={newMCQ.question}
          onChange={(e) => setNewMCQ({ ...newMCQ, question: e.target.value })}
        />
        {["A", "B", "C", "D"].map((key) => (
          <input
            key={key}
            className="form-control mb-2"
            placeholder={`Option ${key}`}
            value={newMCQ.options[key]}
            onChange={(e) =>
              setNewMCQ({
                ...newMCQ,
                options: { ...newMCQ.options, [key]: e.target.value },
              })
            }
          />
        ))}
        <select
          className="form-select mb-2"
          value={newMCQ.answer}
          onChange={(e) => setNewMCQ({ ...newMCQ, answer: e.target.value })}
        >
          <option value="">-- Correct Answer --</option>
          {["A", "B", "C", "D"].map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
        <textarea
          className="form-control mb-2"
          rows={2}
          placeholder="Explanation (optional)"
          value={newMCQ.explanation}
          onChange={(e) => setNewMCQ({ ...newMCQ, explanation: e.target.value })}
        />
        <button className="btn btn-primary" onClick={handleAdd}>
          Add MCQ
        </button>
      </div>

      <hr />

      <ul className="list-group">
        {mcqs.map((mcq) => {
          const selected = selectedAnswers[mcq._id];
          const isCorrect = selected === mcq.answer;
          return (
            <li key={mcq._id} className="list-group-item">
              <strong>Q:</strong> {mcq.question}
              <ul className="list-unstyled mt-2">
                {Object.entries(mcq.options).map(([key, value]) => (
                  <li key={key}>
                    <button
                      onClick={() => handleOptionSelect(mcq._id, key)}
                      disabled={selected}
                      className={`btn btn-sm me-2 ${
                        selected
                          ? key === mcq.answer
                            ? "btn-success"
                            : key === selected
                            ? "btn-danger"
                            : "btn-outline-secondary"
                          : "btn-outline-primary"
                      }`}
                    >
                      {key}. {value}
                    </button>
                  </li>
                ))}
              </ul>

              {selected && (
                <>
                  <div className="mt-2">
                    <strong>
                      {isCorrect ? "✅ Correct!" : `❌ Incorrect. Correct Answer: ${mcq.answer}`}
                    </strong>
                  </div>
                  {mcq.explanation && (
                    <div className="text-muted mt-1">
                      <em>Explanation:</em> {mcq.explanation}
                    </div>
                  )}
                  <button
                    onClick={() => handleTryAgain(mcq._id)}
                    className="btn btn-sm btn-secondary mt-2"
                  >
                    Try Again
                  </button>
                </>
              )}
              <button
                className="btn btn-sm btn-danger mt-3"
                onClick={() => handleDelete(mcq._id)}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default AdminMCQ;
