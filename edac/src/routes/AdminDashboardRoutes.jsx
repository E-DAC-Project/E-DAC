import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import AdminDashboard from "../dashboards/AdminDashboard";
import AdminCourses from "../admin/AdminCourses";
import AdminStudents from "../admin/AdminStudents";
import AdminSyllabus from "../admin/AdminSyllabus";
import AdminMCQ from "../admin/AdminMCQ";
import AdminInterview from "../admin/AdminInterview";
import AdminBooks from "../admin/AdminBooks";
import AdminExams from "../admin/AdminExams";

function AdminDashboardRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />}>
        <Route index element={<Navigate to="courses" replace />} />
        <Route path="courses" element={<AdminCourses />} />
        <Route path="students" element={<AdminStudents />} />
        <Route path="syllabus" element={<AdminSyllabus />} />
        <Route path="mcq" element={<AdminMCQ />} />
        <Route path="interview" element={<AdminInterview />} />
        <Route path="referenceBooks" element={<AdminBooks />} />
        <Route path="examLinks" element={<AdminExams />} />
      </Route>
    </Routes>
  );
}

export default AdminDashboardRoutes;
