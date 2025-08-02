import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useOutletContext } from "react-router-dom";

function AdminInterview() {
  const { courses } = useOutletContext();
  const [selectedCourse, setSelectedCourse] = useState("");

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [newQuestion, setNewQuestion] = useState({
    question: "",
    answer: "",
  });

  useEffect(() => {
    if (!selectedCourse) return;

    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/interview?course=${selectedCourse}`);
        setQuestions(res.data);
      } catch (err) {
        toast.error("Failed to fetch interview questions");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [selectedCourse]);

  const addQuestion = async () => {
    if (!newQuestion.question.trim() || !newQuestion.answer.trim()) {
      toast.warning("Question and answer cannot be empty.");
      return;
    }

    try {
      await axios.post("/api/interview", {
        ...newQuestion,
        course: selectedCourse,
      });
      toast.success("Question added!");
      setQuestions(prev => [...prev, newQuestion]);
      setNewQuestion({ question: "", answer: "" });
    } catch (err) {
      toast.error("Failed to add interview question.");
    }
  };

  const deleteQuestion = async (id) => {
    if (!window.confirm("Are you sure you want to delete this question?")) return;
    try {
      await axios.delete(`/api/interview/${id}`);
      setQuestions(prev => prev.filter((q) => q._id !== id));
      toast.success("Question deleted.");
    } catch (err) {
      toast.error("Failed to delete question.");
    }
  };

  return (
    <div className="admin-wrapper">
      <h2 className="admin-header">Manage Interview Questions</h2>

      <div className="mb-3">
        <label>Select Course</label>
        <select
          className="form-select"
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          <option value="">-- Select Course --</option>
          {courses.map((course, i) => (
            <option key={i} value={course}>{course}</option>
          ))}
        </select>
      </div>

      {selectedCourse && (
        <>
          <div className="mb-4">
            <h5>Add New Interview Question</h5>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Enter question"
              value={newQuestion.question}
              onChange={(e) =>
                setNewQuestion({ ...newQuestion, question: e.target.value })
              }
            />
            <textarea
              className="form-control mb-3"
              placeholder="Enter answer"
              rows={4}
              value={newQuestion.answer}
              onChange={(e) =>
                setNewQuestion({ ...newQuestion, answer: e.target.value })
              }
            />
            <button className="btn btn-primary" onClick={addQuestion}>
              Add Question
            </button>
          </div>

          <h5>Existing Questions</h5>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul className="list-group">
              {questions.map((q) => (
                <li key={q._id || q.question} className="list-group-item">
                  <strong>Q:</strong> {q.question}<br />
                  <strong>A:</strong> {q.answer}
                  <br />
                  <button
                    className="btn btn-sm btn-danger mt-2"
                    onClick={() => deleteQuestion(q._id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}

export default AdminInterview;
