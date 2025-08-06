import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Pencil, Trash2, Plus } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [module_period, setModule_period] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editedCourse, setEditedCourse] = useState("");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:8080/module/getModules", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
      });
      console.log(response.data);
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const addCourse = async () => {
    const name = courseName.trim();
    const desc = courseDescription.trim();
    const period = module_period;
    console.log(period);
    if (!name) {
      toast.warning("Course name cannot be empty.");
      return;
    }
    if (!desc) {
      toast.warning("Course description cannot be empty.");
      return;
    }
    if (!period) {
      toast.warning("module period cannot be empty");
      return;
    }
    if (courses.includes(name)) {
      toast.warning("Course already exists.");
      return;
    }

    try {
      console.log(sessionStorage.getItem("token"));
      const res = await axios.post(
        "http://localhost:8080/module/addModule",
        {
          moduleName: name,
          description: desc,
          modulePeriod: period
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
          },
          withCredentials: true
        }
      );

      fetchCourses();
      toast.success("Course added!");
    } catch (error) {
      console.error("Add course error:", error);
      toast.error("Failed to add course.");
    }
  };

  const deleteCourse = async (index) => {
    const courseToDelete = courses[index];

    try {
<<<<<<< HEAD
      await axios.delete(`/${courseToDelete.id}`);
=======
      await axios.delete(`/api/courses/${courseToDelete.id}`);
>>>>>>> 867c969890030c44060d9f74dce3fe9a20a91dc9
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
      <div className="input-group mb-3">
        <input
          value={courseDescription}
          onChange={(e) => setCourseDescription(e.target.value)}
          className="form-control"
          placeholder="New course description"
        />
      </div>
      <label className="block mb-2 font-medium">Module Period (in months)</label>
      <select
        className="border p-2 w-full mb-4"
        value={module_period}
        onChange={(e) => setModule_period(e.target.value)}
        required
      >
        <option value="">Select period</option>
        {[1, 2, 3, 4, 5, 6].map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </select>
      <div className="col-md-2">
        <button className="btn btn-primary w-100" onClick={addCourse}>
          <Plus size={16} /> Add
        </button>
      </div>
      <div className="module-list">
        {courses.map((mod) => (
          <div key={mod.id} className="card mb-3 p-3 shadow-sm">
            <h4>{mod.moduleName}</h4>
            <p><strong>Description:</strong> {mod.description}</p>
            <p><strong>Period:</strong> {mod.modulePeriod} month</p>
            <div className="btn-group">
              <button className="btn btn-primary" onClick={() => updateCourse(mod)}>Edit</button>
              <button className="btn btn-danger" onClick={() => deleteCourse(mod.id)}>Delete</button>
              <button className="btn btn-success">Add Topic</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default AdminCourses;


