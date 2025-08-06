import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Pencil, Trash2, Plus } from "lucide-react";

function AdminStudents() {
  // ✅ Use a null-safe way to access `courses`
  const outletContext = useOutletContext();
  const courses = outletContext?.courses ?? [];

  const [students, setStudents] = useState([]);
  const [studentName, setStudentName] = useState("");
  const [studentCourse, setStudentCourse] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editedStudent, setEditedStudent] = useState({ name: "", course: "" });

  const handleAddStudent = () => {
    if (!studentName || !studentCourse) return;
    setStudents([...students, { name: studentName, course: studentCourse }]);
    setStudentName("");
    setStudentCourse("");
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditedStudent(students[index]);
  };

  const handleUpdateStudent = () => {
    const updatedStudents = [...students];
    updatedStudents[editIndex] = editedStudent;
    setStudents(updatedStudents);
    setEditIndex(null);
    setEditedStudent({ name: "", course: "" });
  };

  const handleDeleteStudent = (index) => {
    const updatedStudents = [...students];
    updatedStudents.splice(index, 1);
    setStudents(updatedStudents);
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Student Management</h3>
      <div className="row mb-4">
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Student Name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />
        </div>
        <div className="col">
          <select
            className="form-select"
            value={studentCourse}
            onChange={(e) => setStudentCourse(e.target.value)}
          >
            <option value="">Select Course</option>
            {Array.isArray(courses) &&
              courses.map((course, index) => (
                <option key={index} value={course}>
                  {course}
                </option>
              ))}
          </select>
        </div>
        <div className="col-auto">
          <button className="btn btn-primary" onClick={handleAddStudent}>
            <Plus className="me-1" size={18} />
            Add Student
          </button>
        </div>
      </div>

      {Array.isArray(courses) &&
        courses.map((course) => (
          <div key={course} className="mb-4">
            <h5>{course}</h5>
            <ul className="list-group">
              {students
                .filter((s) => s.course === course)
                .map((student, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    {editIndex === index ? (
                      <div className="d-flex w-100">
                        <input
                          type="text"
                          className="form-control me-2"
                          value={editedStudent.name}
                          onChange={(e) =>
                            setEditedStudent({
                              ...editedStudent,
                              name: e.target.value,
                            })
                          }
                        />
                        <select
                          className="form-select me-2"
                          value={editedStudent.course}
                          onChange={(e) =>
                            setEditedStudent({
                              ...editedStudent,
                              course: e.target.value,
                            })
                          }
                        >
                          <option value="">Select Course</option>
                          {courses.map((c, i) => (
                            <option key={i} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                        <button
                          className="btn btn-success"
                          onClick={handleUpdateStudent}
                        >
                          Update
                        </button>
                      </div>
                    ) : (
                      <>
                        <span>{student.name}</span>
                        <div>
                          <button
                            className="btn btn-sm btn-warning me-2"
                            onClick={() => handleEditClick(index)}
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDeleteStudent(index)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </>
                    )}
                  </li>
                ))}
            </ul>
          </div>
        ))}
    </div>
  );
}

export default AdminStudents;
