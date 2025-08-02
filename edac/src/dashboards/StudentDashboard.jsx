
import React from "react";
import { Outlet } from "react-router-dom";
import StudentSidebar from "../components/StudentSidebar";

export default function StudentDashboardLayout() {
  return (
    <div className="d-flex">
      <StudentSidebar />
      <div className="flex-grow-1 p-3" style={{ marginLeft: "240px" }}>
        <Outlet />
      </div>
    </div>
  );
}
