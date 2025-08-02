import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import StudentDashboard from "../dashboards/StudentDashboard";
import MyProfile from "../student/MyProfile";
import MyCourse from "../student/MyCourse";
import Certificate from "../student/Certificate";
import OpenProjects from "../student/OpenProjects";
import Settings from "../student/Settings";

function StudentDashboardRoutes() {
  return (
    <Routes>
      <Route path="/" element={<StudentDashboard />}>
        <Route index element={<Navigate to="profile" replace />} />
        <Route path="profile" element={<MyProfile />} />
        <Route path="course" element={<MyCourse />} />
        <Route path="certificate" element={<Certificate />} />
        <Route path="projects" element={<OpenProjects />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default StudentDashboardRoutes;
