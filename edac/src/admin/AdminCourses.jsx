
import React, { useState, useEffect, useRef } from "react";
// import { useOutletContext } from "react-router-dom";
import { Plus } from "lucide-react";
import { toast } from "react-toastify";
import axios from "../pages/axios";
import { useNavigate } from "react-router-dom";

function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [module_period, setModule_period] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ moduleName: '', description: '', modulePeriod: 1 });
  const [editId, setEditId] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  const formRef = useRef(null);

  useEffect(() => {
    let savedToken;
    if (sessionStorage.length !== 0) {
      savedToken = sessionStorage.getItem("token");
    } else {
      savedToken = localStorage.getItem("token");
    }
    setToken(savedToken);
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/module/getModules",
          {
            headers: {
              Authorization: `Bearer ${savedToken}`,
            },
          }
        );
        // console.log(response.data);
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);


  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/module/getModules",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response.data);
      console.log(response.data);
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleEdit = async (module) => {
    setEditId(module.id);
    setEditMode(true);
    setFormData({
      moduleName: module.moduleName,
      description: module.description,
      modulePeriod: module.modulePeriod,
    });
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      console.log(token)
      await axios.put(`http://localhost:8080/module/editModule/${editId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          }, withCredentials: true
        });
      setEditMode(false);
      setFormData({ moduleName: '', description: '', modulePeriod: 1 });
      setEditId(null);
      fetchCourses();
      toast.success("Module updated!");
    } catch (error) {
      console.error("Update failed:", error);
      toast.warning("Failed to update module");
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
      
      const res = await axios.post(
        "http://localhost:8080/module/addModule",
        {
          moduleName: name,
          description: desc,
          modulePeriod: period,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
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
    if (!window.confirm("Are you sure you want to delete this module?")) {
      return;
    }

    try {
      const res = await axios.delete(
        `http://localhost:8080/module/deleteModule/${index}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      toast.success("Module deleted!");
      fetchCourses();
    } catch (error) {
      console.error("Delete course error:", error);
      toast.error("Failed to delete course.");
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
      <label className="block mb-2 font-medium">
        Module Period (in months)
      </label>
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


      <form ref={formRef}>
         
        {editMode && (
        <div className="mb-3 p-3 border rounded shadow bg-gray-100">
          <h3 className="text-primary mb-4">Edit Module</h3>
          <input
            type="text"
            value={formData.moduleName}
            onChange={(e) => setFormData({ ...formData, moduleName: e.target.value })}
            placeholder="Module Name"
            className="block mb-2 p-2 w-full border rounded"
          />
          <input
            type="text"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Description"
            className="block mb-5 p-2 w-full border rounded"
          />
          <select
            value={formData.modulePeriod}
            onChange={(e) => setFormData({ ...formData, modulePeriod: parseInt(e.target.value) })}
            className="block mb-4 p-2 w-full border rounded"
          >
            {[1, 2, 3, 4, 5, 6].map((m) => (
              <option key={m} value={m}>{m} month{m > 1 ? 's' : ''}</option>
            ))}
          </select>
          <button
            onClick={handleUpdate}
            className="btn btn-primary w-100"
          >
            Update Module
          </button>
        </div>
      )}
      </form>


      <div className="module-list">
        {courses.map((mod) => (
          <div key={mod.id} className="card mb-3 p-3 shadow-sm" >
            <h4 onClick={() => navigate(`/adminDashboard/syllabus/${mod.id}`)}
          style={{ cursor: "pointer" }}>{mod.moduleName}</h4>
            <p>
              <strong>Description:</strong> {mod.description}
            </p>
            <p>
              <strong>Period:</strong> {mod.modulePeriod} month
            </p>
            <div className="btn-group">
              <button
                className="btn btn-primary"
                onClick={() => handleEdit(mod)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => deleteCourse(mod.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default AdminCourses;
