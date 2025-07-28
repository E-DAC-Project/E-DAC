import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Pencil, Trash2, Plus } from "lucide-react";

function AdminStudents() {
  const { courses } = useOutletContext();
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: "", course: "" });
  const [editIndex, setEditIndex] = useState(null);
  const [editedStudent, setEditedStudent] = useState({ name: "", course: "" });

  const addStudent = () => {
    if (newStudent.name && newStudent.course) {
      setStudents([...students, newStudent]);
      setNewStudent({ name: "", course: "" });
    }
  };

  const deleteStudent = (index) => {
    const updated = [...students];
    updated.splice(index, 1);
    setStudents(updated);
  };

  const updateStudent = () => {
    if (editedStudent.name && editedStudent.course) {
      const updated = [...students];
      updated[editIndex] = editedStudent;
      setStudents(updated);
      setEditIndex(null);
    }
  };

  return (
    <div>
      <h2 className="text-primary mb-4">Manage Students</h2>
      <div className="row mb-3">
        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="Student name"
            value={newStudent.name}
            onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
          />
        </div>
        <div className="col-md-5">
          <select
            className="form-control"
            value={newStudent.course}
            onChange={(e) => setNewStudent({ ...newStudent, course: e.target.value })}
          >
            <option value="">Select Course</option>
            {courses.map((course, index) => (
              <option key={index} value={course}>{course}</option>
            ))}
          </select>
        </div>
      </div>
        <div className="col-md-2">
          <button className="btn btn-primary w-100" onClick={addStudent}>
            <Plus size={16} /> Add
          </button>
        </div>

      {courses.map((course) => (
        <div key={course} className="mb-4">
          <h5>{course}</h5>
          <ul className="list-group">
            {students.filter(s => s.course === course).length === 0 ? (
              <li className="list-group-item text-muted">No students in this course.</li>
            ) : (
              students
                .map((student, index) => ({ ...student, index }))
                .filter((s) => s.course === course)
                .map((s) => (
                  <li key={s.index} className="list-group-item d-flex justify-content-between align-items-center">
                    {editIndex === s.index ? (
                      <>
                        <input
                          className="form-control me-2"
                          value={editedStudent.name}
                          onChange={(e) => setEditedStudent({ ...editedStudent, name: e.target.value })}
                        />
                        <select
                          className="form-select me-2"
                          value={editedStudent.course}
                          onChange={(e) => setEditedStudent({ ...editedStudent, course: e.target.value })}
                        >
                          {courses.map((c, i) => (
                            <option key={i} value={c}>{c}</option>
                          ))}
                        </select>
                        <button className="btn btn-success btn-sm me-1" onClick={updateStudent}>
                          Save
                        </button>
                        <button className="btn btn-secondary btn-sm" onClick={() => setEditIndex(null)}>
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <span>{s.name}</span>
                        <div>
                          <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() => {
                              setEditIndex(s.index);
                              setEditedStudent({ name: s.name, course: s.course });
                            }}
                          >
                            <Pencil size={14} />
                          </button>
                          <button className="btn btn-danger btn-sm" onClick={() => deleteStudent(s.index)}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </>
                    )}
                  </li>
                ))
            )}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default AdminStudents;
