import React from "react";
import {
  FaBook,
  FaBookOpen,
  FaClipboardList,
  FaFileAlt,
  FaLink,
  FaQuestionCircle,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

export default function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/login");
  };

  return (
    <div
      className="bg-dark text-white d-flex flex-column justify-content-between"
      style={{
        width: "240px",
        height: "100vh",
        position: "fixed",
        top: "80px",
        left: 0,
        padding: "20px",
      }}
    >
      {/* Top Menu */}
      <div>
        <h4 className="mb-4">Dashboard</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <NavLink to="courses" className="nav-link text-white d-flex align-items-center">
              <FaBook className="me-2" /> Courses
            </NavLink>
          </li>
          <li className="nav-item mb-2">
            <NavLink to="students" className="nav-link text-white d-flex align-items-center">
              <FaUser className="me-2" /> Students
            </NavLink>
          </li>
          <li className="nav-item mb-2">
            <NavLink to="syllabus" className="nav-link text-white d-flex align-items-center">
              <FaFileAlt className="me-2" /> Syllabus
            </NavLink>
          </li>
          <li className="nav-item mb-2">
            <NavLink to="mcq" className="nav-link text-white d-flex align-items-center">
              <FaQuestionCircle className="me-2" /> MCQs
            </NavLink>
          </li>
          <li className="nav-item mb-2">
            <NavLink to="interview" className="nav-link text-white d-flex align-items-center">
              <FaClipboardList className="me-2" /> Interview Questions
            </NavLink>
          </li>
          <li className="nav-item mb-2">
            <NavLink to="referenceBooks" className="nav-link text-white d-flex align-items-center">
              <FaBookOpen className="me-2" /> Reference Books
            </NavLink>
          </li>
          <li className="nav-item mb-2">
            <NavLink to="examLinks" className="nav-link text-white d-flex align-items-center">
              <FaLink className="me-2" /> Exam Links
            </NavLink>
          </li>
        </ul>
        <button
          className="btn btn-danger w-100 d-flex align-items-center justify-content-center"
          onClick={handleLogout}
        >
          <FaSignOutAlt className="me-2" /> Logout
        </button>
      </div>

      
    </div>
  );
}
