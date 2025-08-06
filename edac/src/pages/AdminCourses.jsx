import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Pencil, Trash2, Plus } from "lucide-react";

function AdminCourses() {
  const { courses, setCourses } = useOutletContext();
  const [courseName, setCourseName] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editedCourse, setEditedCourse] = useState("");

  const addCourse = () => {
    const trimmed = courseName.trim();
    if (trimmed && !courses.includes(trimmed)) {
      setCourses([...courses, trimmed]);
      setCourseName("");
    }
  };

  const deleteCourse = (index) => {
    const updated = [...courses];
    updated.splice(index, 1);
    setCourses(updated);
  };

  const updateCourse = (index) => {
    const trimmed = editedCourse.trim();
    if (trimmed) {
      const updated = [...courses];
      updated[index] = trimmed;
      setCourses(updated);
      setEditIndex(null);
      setEditedCourse("");
    }
  };

  return (
    <div>
      <h2 className="text-primary mb-4">Manage Courses</h2>
      <div className="input-group mb-3">
        <input
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          className="form-control"
          placeholder="New course name"
        />
      </div>
        <div className="col-md-2">
                  <button className="btn btn-primary w-100" onClick={addCourse}>
                    <Plus size={16} /> Add
                  </button>
                </div>
      <ul className="list-group">
        {courses.map((course, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            {editIndex === index ? (
              <>
                <input
                  className="form-control me-2"
                  value={editedCourse}
                  onChange={(e) => setEditedCourse(e.target.value)}
                />
                <button className="btn btn-success btn-sm me-1" onClick={() => updateCourse(index)}>
                  Save
                </button>
                <button className="btn btn-secondary btn-sm" onClick={() => setEditIndex(null)}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span>{course}</span>
                <div>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => {
                      setEditIndex(index);
                      setEditedCourse(course);
                    }}
                  >
                    <Pencil size={14} />
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => deleteCourse(index)}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminCourses;
