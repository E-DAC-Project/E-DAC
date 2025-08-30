import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";

const ModuleDetails = () => {
  const { id } = useParams(); // module ID from URL
  const [topics, setTopics] = useState([]);
  const [expandedTopic, setExpandedTopic] = useState(null);
  const [topicName, setTopicName] = useState("");
  const [role, setRole] = useState(null);


  useEffect(() => {
    fetchTopics();
    const userRole = JSON.parse(localStorage.getItem("role")) || JSON.parse(sessionStorage.getItem("role"));
    if (userRole) setRole(userRole);
  }, []);

  const fetchTopics = async () => {
    try {
      const token =
        sessionStorage.getItem("token") || localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:8080/topics/getTopics/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      //console.log(res)
      // Initially, remove subtopics (will be fetched on demand)
      const topicsWithoutSubtopics = res.data.map((t) => ({
        ...t,
        subtopics: [],
      }));
      setTopics(topicsWithoutSubtopics);
    } catch (error) {
      console.error("Failed to fetch topics:", error);
    }
  };

  // Add a new topic
  const handleAddTopic = async () => {
    if (!topicName.trim()) {
      toast.warning("Topic name cannot be empty");
      return;
    }
    try {
      console.log(topicName)
      const token =
        sessionStorage.getItem("token") || localStorage.getItem("token");
      await axios.post(
        `http://localhost:8080/topics/addTopic/${id}`,
        { topicName: topicName },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      setTopicName("");
      fetchTopics();
    } catch (error) {
      toast.error("Failed to add topic");
      console.error("Failed to add topic:", error);
    }
  };

  // Fetch subtopics for a given topic
  const fetchSubtopics = async (topicId) => {
    try {
      const token =
        sessionStorage.getItem("token") || localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:8080/subTopics/getSubTopics/${topicId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      console.log(res.data)
      setTopics((prev) =>
        prev.map((topic) =>
          topic.id === topicId ? { ...topic, subtopics: res.data } : topic
        )
      );
    } catch (error) {
      console.error("Failed to fetch subtopics:", error);
    }
  };

  const toggleTopic = (topicId) => {
    if (expandedTopic === topicId) {
      setExpandedTopic(null);
    } else {
      setExpandedTopic(topicId);
      fetchSubtopics(topicId); // fetch subtopics on click
    }
  };

  const handleEditTopic = (topicId) => {
    console.log("Edit topic:", topicId);
  };

  const handleDeleteTopic = async (topicId) => {
    if (!window.confirm("Delete this topic?")) return;
    try {
      const token =
        sessionStorage.getItem("token") || localStorage.getItem("token");
      await axios.delete(`http://localhost:8080/topics/deleteTopic/${topicId}`, {
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
      const token =
        sessionStorage.getItem("token") || localStorage.getItem("token");
      await axios.delete(`http://localhost:8080/subTopics/deleteSubTopic/${subtopicId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      fetchSubtopics(expandedTopic); // refresh only current topic’s subtopics
    } catch (error) {
      console.error("Delete subtopic failed:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Module Topics</h2>
      {/* Add Topic Form */}
      {role === "ROLE_ADMIN" && (
        <div className="mb-3 d-flex">
          <input
            type="text"
            className="form-control me-2"
            placeholder="New topic name"
            value={topicName}
            onChange={(e) => setTopicName(e.target.value)}
          />
          <button className="btn btn-success" onClick={handleAddTopic}>
            <FaPlus /> Add Topic
          </button>
        </div>
      )}
      {topics.map((topic) => (
        <div key={topic.id} className="card mb-2">
          <div
            className="card-header d-flex justify-content-between align-items-center"
            onClick={() => toggleTopic(topic.id)}
            style={{ cursor: "pointer" }}
          >
            <span>{topic.topicName}</span>
            {role === "ROLE_ADMIN" && (
              <span>
                <FaEdit
                  className="me-3 text-primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditTopic(topic.id);
                  }}
                  style={{cursor:"pointer"}}
                />
                <FaTrash
                  className="text-danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteTopic(topic.id);
                  }}
                  style={{cursor:"pointer"}}
                />
              </span>
            )}
          </div>

          {expandedTopic === topic.id && topic.subtopics.length > 0 && (
            <ul className="list-group list-group-flush">
              {topic.subtopics.map((sub) => (
                <li
                  key={sub.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  {sub.subTopicName}
                  {role === "ROLE_ADMIN" && (
                    <span>
                      <FaEdit
                        className="me-3 text-primary"
                        onClick={() => handleEditSubtopic(sub.id)}
                        style={{cursor:"pointer"}}
                      />
                      <FaTrash
                        className="text-danger"
                        onClick={() => handleDeleteSubtopic(sub.id)}
                        style={{cursor:"pointer"}}
                      />
                    </span>
                  )}
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
