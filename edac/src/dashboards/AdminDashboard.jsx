import React, {useState } from "react";
import { Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminDashboard.css";
import AdminSidebar from "../components/AdminSidebar";

function AdminDashboard() {
  const [courses, setCourses] = useState(null);

  
  return (
    <div className="container-fluid dashboard-wrapper">
      <div className="row">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content */}
        <div className="col-md-10 main-content p-4" style={{ marginLeft: "240px" }}>
          <Outlet context={{ courses, setCourses }} />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
