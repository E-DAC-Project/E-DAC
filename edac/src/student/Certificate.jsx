import React, { useEffect, useState } from "react";

export default function Certificate() {
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setCourse(parsed.course);
    }
  }, []);

  if (!course) return <p>Loading...</p>;

  const isCompleted = course.status?.toLowerCase() === "completed";

  return (
    <div>
      <h3 className="mb-3">Certificates</h3>
      <div className="card p-3">
        {isCompleted ? (
          <>
            <p>🎉 Congratulations! You’ve completed the course.</p>
            <a
              href={course.certificateUrl}
              download
              className="btn btn-success mt-2"
            >
              Download Certificate
            </a>
          </>
        ) : (
          <>
            <p>You will receive a certificate upon course completion.</p>
            <button className="btn btn-secondary mt-2" disabled>
              Download Certificate (Not Available)
            </button>
          </>
        )}
      </div>
    </div>
  );
}
