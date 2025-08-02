import React from "react";
import {
  FaUser,
  FaBook,
  FaCertificate,
  FaProjectDiagram,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

export default function StudentSidebar() {
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
        zIndex: 1000,
      }}
    >
      <div>
        <h4 className="mb-4">Student Panel</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <NavLink
              to="profile"
              className="nav-link text-white d-flex align-items-center"
            >
              <FaUser className="me-2" /> My Profile
            </NavLink>
          </li>
          <li className="nav-item mb-2">
            <NavLink
              to="course"
              className="nav-link text-white d-flex align-items-center"
            >
              <FaBook className="me-2" /> My Course
            </NavLink>
          </li>
          <li className="nav-item mb-2">
            <NavLink
              to="certificate"
              className="nav-link text-white d-flex align-items-center"
            >
              <FaCertificate className="me-2" /> Certificate
            </NavLink>
          </li>
          <li className="nav-item mb-2">
            <NavLink
              to="projects"
              className="nav-link text-white d-flex align-items-center"
            >
              <FaProjectDiagram className="me-2" /> Open Projects
            </NavLink>
          </li>
          <li className="nav-item mb-2">
            <NavLink
              to="settings"
              className="nav-link text-white d-flex align-items-center"
            >
              <FaCog className="me-2" /> Settings
            </NavLink>
          </li>
        </ul>
      <button
        className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center"
        onClick={handleLogout}
      >
        <FaSignOutAlt className="me-2" /> Logout
      </button>
      </div>

    </div>
  );
}
