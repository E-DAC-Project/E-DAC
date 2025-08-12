import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

const ModuleDetails = () => {
  const { id } = useParams(); // module ID from URL
  const [topics, setTopics] = useState([]);
  const [expandedTopic, setExpandedTopic] = useState(null);

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      const token = sessionStorage.getItem("token") || localStorage.getItem("token");
      const res = await axios.get(`http://localhost:8080/topic/getTopics/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setTopics(res.data); // [{id, name, subtopics: [{id, name}]}]
    } catch (error) {
      console.error("Failed to fetch topics:", error);
    }
  };

  const handleEditTopic = (topicId) => {
    console.log("Edit topic:", topicId);
  };

  const handleDeleteTopic = async (topicId) => {
    if (!window.confirm("Delete this topic?")) return;
    try {
      const token = sessionStorage.getItem("token") || localStorage.getItem("token");
      await axios.delete(`http://localhost:8080/topic/${topicId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      fetchTopics();
    } catch (error) {
      console.error("Delete topic failed:", error);
    }
  };

  const handleEditSubtopic = (subtopicId) => {
    console.log("Edit subtopic:", subtopicId);
  };

  const handleDeleteSubtopic = async (subtopicId) => {
    if (!window.confirm("Delete this subtopic?")) return;
    try {
      const token = sessionStorage.getItem("token") || localStorage.getItem("token");
      await axios.delete(`http://localhost:8080/subtopic/${subtopicId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      fetchTopics();
    } catch (error) {
      console.error("Delete subtopic failed:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Module Topics</h2>
      {topics.map((topic) => (
        <div key={topic.id} className="card mb-2">
          <div
            className="card-header d-flex justify-content-between align-items-center"
            onClick={() => setExpandedTopic(expandedTopic === topic.id ? null : topic.id)}
            style={{ cursor: "pointer" }}
          >
            <span>{topic.name}</span>
            <span>
              <FaEdit className="me-3 text-primary" onClick={(e) => { e.stopPropagation(); handleEditTopic(topic.id); }} />
              <FaTrash className="text-danger" onClick={(e) => { e.stopPropagation(); handleDeleteTopic(topic.id); }} />
            </span>
          </div>

          {expandedTopic === topic.id && (
            <ul className="list-group list-group-flush">
              {topic.subtopics.map((sub) => (
                <li
                  key={sub.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  {sub.name}
                  <span>
                    <FaEdit className="me-3 text-primary" onClick={() => handleEditSubtopic(sub.id)} />
                    <FaTrash className="text-danger" onClick={() => handleDeleteSubtopic(sub.id)} />
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default ModuleDetails;
