import React, { useEffect, useState } from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";

function AdminSyllabus() {
  const { courses } = useOutletContext();

  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");

  const [newTopic, setNewTopic] = useState({ name: "", subtopics: [] });
  const [subtopicInput, setSubtopicInput] = useState("");

  const fetchTopics = React.useCallback(async () => {
    if (!selectedCourse) return;
    setLoading(true);
    try {
      const res = await axios.get(`/api/syllabus?course=${selectedCourse}`);
      setTopics(res.data);
    } catch (err) {
      toast.error("Failed to fetch syllabus.");
    } finally {
      setLoading(false);
    }
  }, [selectedCourse]);

  useEffect(() => {
    if (selectedCourse) fetchTopics();
  }, [selectedCourse, fetchTopics]);

  const addTopic = async () => {
    if (!newTopic.name.trim()) {
      toast.warning("Topic name cannot be empty.");
      return;
    }
    try {
      await axios.post("/api/syllabus", {
        name: newTopic.name,
        course: selectedCourse,
        subtopics: newTopic.subtopics,
      });
      setNewTopic({ name: "", subtopics: [] });
      setSubtopicInput("");
      fetchTopics();
      toast.success("Topic added!");
    } catch {
      toast.error("Failed to add topic.");
    }
  };

  const deleteTopic = async (topicId) => {
    if (!window.confirm("Are you sure you want to delete this topic?")) return;
    try {
      await axios.delete(`/api/syllabus/${topicId}`);
      fetchTopics();
      toast.success("Topic deleted.");
    } catch {
      toast.error("Failed to delete topic.");
    }
  };

  const deleteSubtopic = async (topicId, subtopicId) => {
    if (!window.confirm("Are you sure you want to delete this subtopic?")) return;
    try {
      await axios.delete(`/api/syllabus/${topicId}/subtopics/${subtopicId}`);
      fetchTopics();
      toast.success("Subtopic deleted.");
    } catch {
      toast.error("Failed to delete subtopic.");
    }
  };

  const addSubtopicToNewTopic = () => {
    if (!subtopicInput.trim()) return;
    setNewTopic((prev) => ({
      ...prev,
      subtopics: [...prev.subtopics, { name: subtopicInput }],
    }));
    setSubtopicInput("");
  };

  const addSubtopicToTopic = async (topicId, name) => {
    if (!name.trim()) return;
    try {
      await axios.post(`/api/syllabus/${topicId}/subtopics`, { name });
      fetchTopics();
      toast.success("Subtopic added.");
    } catch {
      toast.error("Failed to add subtopic.");
    }
  };

  return (
    <div>
      <h2>Manage Syllabus</h2>

      <div className="mb-3">
        <label htmlFor="courseSelect" className="form-label">Select Course</label>
        <select
          id="courseSelect"
          className="form-select"
          value={selectedCourse}
          onChange={(e) => {
            setSelectedCourse(e.target.value);
            setTopics([]);
          }}
        >
          <option value="">-- Choose Course --</option>
          {courses.map((course, i) => (
            <option key={i} value={course}>{course}</option>
          ))}
        </select>
      </div>

      {selectedCourse && (
        <>
          <div style={{ marginBottom: 20 }}>
            <h4>Add New Topic</h4>
            <input
              type="text"
              placeholder="Topic Name"
              value={newTopic.name}
              onChange={(e) => setNewTopic({ ...newTopic, name: e.target.value })}
              className="form-control mb-2"
            />
            <div className="mb-2 border p-2">
              <label>Subtopics:</label>
              <ul>
                {newTopic.subtopics.map((s, i) => <li key={i}>{s.name}</li>)}
              </ul>
              <input
                type="text"
                placeholder="New Subtopic"
                value={subtopicInput}
                onChange={(e) => setSubtopicInput(e.target.value)}
                className="form-control mb-2"
                style={{ width: "70%", display: "inline-block", marginRight: 10 }}
              />
              <button
                className="btn btn-secondary"
                onClick={addSubtopicToNewTopic}
                style={{ marginBottom: 10, width: "15%" }}
              >
                Add Subtopic
              </button>
            </div>
          </div>

          <button className="btn btn-primary mt-2" onClick={addTopic}>
            Add Topic
          </button>

          <hr />

          <h4>Topics for {selectedCourse}</h4>
          {loading && <p>Loading...</p>}
          {!loading && topics.length === 0 && <p>No topics available.</p>}
          {!loading && topics.map((topic) => (
            <div key={topic._id} className="border p-3 mb-3 bg-light rounded">
              <h5>
                {topic.name}
                <button
                  onClick={() => deleteTopic(topic._id)}
                  className="btn btn-danger btn-sm ms-2"
                >
                  Delete Topic
                </button>
              </h5>

              <SubtopicsList
                topic={topic}
                deleteSubtopic={deleteSubtopic}
                addSubtopicToTopic={addSubtopicToTopic}
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
}

function SubtopicsList({ topic, deleteSubtopic, addSubtopicToTopic }) {
  const [subInput, setSubInput] = useState("");

  const handleAddSubtopic = () => {
    addSubtopicToTopic(topic._id, subInput);
    setSubInput("");
  };

  return (
    <div>
      <ul>
        {topic.subtopics?.map((s) => (
          <li
            key={s._id}
            className="d-flex justify-content-between align-items-center"
          >
            {s.name}
            <button
              className="btn btn-danger btn-sm"
              onClick={() => deleteSubtopic(topic._id, s._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={subInput}
        onChange={(e) => setSubInput(e.target.value)}
        placeholder="Add Subtopic"
        className="form-control d-inline-block me-2"
        style={{ width: "70%" }}
      />
      <button className="btn btn-secondary" onClick={handleAddSubtopic}>
        Add Subtopic
      </button>
    </div>
  );
}

export default AdminSyllabus;
