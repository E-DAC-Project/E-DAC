import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useOutletContext } from "react-router-dom";

function AdminExams() {
  const { courses } = useOutletContext();
  const [selectedCourse, setSelectedCourse] = useState("");
  const [exams, setExams] = useState([]);
  const [newExam, setNewExam] = useState("");

  useEffect(() => {
    if (!selectedCourse) return;

    const fetchExams = async () => {
      try {
        const res = await axios.get(`/api/exams?course=${selectedCourse}`);
        setExams(res.data);
      } catch {
        toast.error("Failed to load exams.");
      }
    };

    fetchExams();
  }, [selectedCourse]);

  const addExam = async () => {
    if (!newExam.trim()) return toast.warning("Exam link cannot be empty.");
    try {
      await axios.post("/api/exams", { link: newExam, course: selectedCourse });
      toast.success("Exam link added.");
      setNewExam("");
      setExams(prev => [...prev, { link: newExam }]);
    } catch {
      toast.error("Failed to add exam link.");
    }
  };

  const deleteExam = async (id) => {
    if (!window.confirm("Delete this exam link?")) return;
    try {
      await axios.delete(`/api/exams/${id}`);
      setExams((prev) => prev.filter((e) => e._id !== id));
      toast.success("Exam link deleted.");
    } catch {
      toast.error("Failed to delete exam.");
    }
  };

  return (
    <div className="admin-wrapper">
      <h2 className="admin-header">Manage Exam Links</h2>

      <div className="mb-3">
        <label>Select Course</label>
        <select
          className="form-select"
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          <option value="">-- Select Course --</option>
          {courses.map((c, i) => (
            <option key={i} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {selectedCourse && (
        <>
          <div className="mb-4">
            <input
              className="form-control mb-2"
              placeholder="Exam Link"
              value={newExam}
              onChange={(e) => setNewExam(e.target.value)}
            />
            <button className="btn btn-primary" onClick={addExam}>
              Add Link
            </button>
          </div>

          <ul className="list-group">
            {exams.map((e) => (
              <li key={e._id || e.link} className="list-group-item d-flex justify-content-between align-items-center">
                <a href={e.link} target="_blank" rel="noopener noreferrer">{e.link}</a>
                <button className="btn btn-sm btn-danger" onClick={() => deleteExam(e._id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default AdminExams;
