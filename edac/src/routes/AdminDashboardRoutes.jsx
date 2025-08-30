import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import AdminDashboard from "../dashboards/AdminDashboard";
import AdminCourses from "../admin/AdminCourses";
import AdminStudents from "../admin/AdminStudents";
import AdminSyllabus from "../admin/AdminSyllabus";
import AdminMCQ from "../admin/AdminMCQ";
import AdminInterview from "../admin/AdminInterview";
import AdminBooks from "../admin/AdminBooks";
import ExamList from "../Exam/ExamList";
import ExamInstruction from '../Exam/ExamInstruction';
import ExamPage from '../Exam/ExamPage'
import ExamResult from '../Exam/ExamResult';

function AdminDashboardRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />}>
        <Route index element={<Navigate to="courses" replace />} />
        <Route path="courses" element={<AdminCourses />} />
        <Route path="students" element={<AdminStudents />} />
        <Route path="syllabus/:id" element={<AdminSyllabus />} />
        <Route path="mcq" element={<AdminMCQ />} />
        <Route path="interview" element={<AdminInterview />} />
        <Route path="referenceBooks" element={<AdminBooks />} />
        <Route path="examLinks/:moduleId" element={<ExamList />} />
        <Route path="exam/:quizId/instructions" element={<ExamInstruction />} />
        <Route path="exam/:quizId/start" element={<ExamPage />} />
        <Route path="exam/:quizId/result" element={<ExamResult />} />
      </Route>
    </Routes>
  );
}

export default AdminDashboardRoutes;
