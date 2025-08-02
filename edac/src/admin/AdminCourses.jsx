import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Pencil, Trash2, Plus } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";


function AdminCourses() {
  const { courses, setCourses } = useOutletContext();
  const [courseName, setCourseName] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editedCourse, setEditedCourse] = useState("");

  useEffect(() => {
  const fetchCourses = async () => {
    try {
      const response = await axios.get("/api/courses");
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };
  fetchCourses();
}, [setCourses]);

const addCourse = async () => {
  const trimmed = courseName.trim();
  if (!trimmed) {
    toast.warning("Course name cannot be empty.");
    return;
  }

  if (courses.includes(trimmed)) {
    toast.warning("Course already exists.");
    return;
  }

  try {
    const res = await axios.post("/api/courses", { name: trimmed });
    setCourses([...courses, res.data.name]); 
    setCourseName("");
    toast.success("Course added!");
  } catch (error) {
    console.error("Add course error:", error);
    toast.error("Failed to add course.");
  }
};

const deleteCourse = async (index) => {
  const courseToDelete = courses[index];

  try {
    await axios.delete(`/api/courses/${courseToDelete.id}`); 
    const updated = [...courses];
    updated.splice(index, 1);
    setCourses(updated);
    toast.success("Course deleted.");
  } catch (error) {
    console.error("Delete course error:", error);
    toast.error("Failed to delete course.");
  }
};

const updateCourse = async (index) => {
  const trimmed = editedCourse.trim();
  if (!trimmed) {
    toast.warning("Course name cannot be empty.");
    return;
  }

  const courseToUpdate = courses[index];

  try {
    const res = await axios.put(`/api/courses/${courseToUpdate.id}`, { name: trimmed });
    const updated = [...courses];
    updated[index] = res.data.name; 
    setCourses(updated);
    setEditIndex(null);
    setEditedCourse("");
    toast.success("Course updated!");
  } catch (error) {
    console.error("Update course error:", error);
    toast.error("Failed to update course.");
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
