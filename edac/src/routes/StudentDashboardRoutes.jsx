import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import StudentDashboard from "../dashboards/StudentDashboard";
import MyProfile from "../student/MyProfile";
import AdminCourses from "../admin/AdminCourses";

function StudentDashboardRoutes() {
  return (
    <Routes>
      <Route path="/" element={<StudentDashboard />}>
        <Route index element={<Navigate to="profile" replace />} />
        <Route path="profile" element={<MyProfile />} />
        <Route path="courses" element={<AdminCourses />} />
      </Route>
    </Routes>
  );
}

export default StudentDashboardRoutes;
