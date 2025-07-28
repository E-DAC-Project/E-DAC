import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { FaBook, FaUser } from "react-icons/fa"; // Importing Font Awesome icons from react-icons
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [courses, setCourses] = useState([
    "C++",
    "Core Java",
    ".NET",
    "Data Structures",
    "Web Programming",
    "Operating System",
    "Database Management",
    "Advance Java",
    "Aptitude and Reasoning",
  ]);

  return (
    <div className="container-fluid dashboard-wrapper">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-2 sidebar bg-dark text-white p-3 min-vh-100">
          <h4 className="mb-4">Dashboard</h4>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <Link className="nav-link text-white d-flex align-items-center" to="/adminDashboard/courses">
                <FaBook className="me-2" /> Courses
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white d-flex align-items-center" to="/adminDashboard/students">
                <FaUser className="me-2" /> Students
              </Link>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="col-md-10 main-content p-4">
          <Outlet context={{ courses, setCourses }} />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
