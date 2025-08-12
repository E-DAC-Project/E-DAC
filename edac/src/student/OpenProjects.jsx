import React, { useEffect, useState } from "react";
import axios from "../pages/axios";

export default function OpenProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const course = storedUser?.course?.name;

    const fetchProjects = async () => {
      try {
        const res = await axios.get("/api/open-projects", {
          params: { course }
        });
        setProjects(res.data);
      } catch {
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div>
      <h3 className="mb-3">Open Projects</h3>
      <div className="card p-3">
        {loading ? (
          <p>Loading projects...</p>
        ) : projects.length === 0 ? (
          <p>No open projects available.</p>
        ) : (
          <ul className="list-group">
            {projects.map((project) => (
              <li key={project.id} className="list-group-item">
                {project.title} – {project.techStack}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
