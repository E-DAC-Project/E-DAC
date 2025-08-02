import React, { useEffect, useState } from "react";

export default function MyCourse() {
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setCourse(parsed.course); 
    }
  }, []);

  if (!course) return <p>Loading course details...</p>;

  return (
    <div>
      <h3 className="mb-3">My Course</h3>
      <div className="card p-3">
        <p><strong>Course Name:</strong> {course.name}</p>
        <p><strong>Duration:</strong> {course.duration}</p>
        <p><strong>Status:</strong> {course.status}</p>
        <p><strong>Progress:</strong> {course.progress}%</p>
      </div>
    </div>
  );
}
