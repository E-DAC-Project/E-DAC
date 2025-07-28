import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import EDACModulesSection from "../pages/Module";
import Login from "../pages/Login";
import AdminDashboard from "../pages/AdminDashboard";
import AdminCourses from "../pages/AdminCourses";
import AdminStudents from "../pages/AdminStudents";
import ResourcePage from "../pages/ResourcePage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/modules" element={<EDACModulesSection />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/:module/:resource" element={<ResourcePage />} />

      {/* Admin Dashboard layout */}
      <Route path="/adminDashboard/*" element={<AdminDashboard />}>
        <Route index element={<Navigate to="courses" replace />} />
        <Route path="courses" element={<AdminCourses />} />
        <Route path="students" element={<AdminStudents />} />
      </Route>
    </Routes>
  );
}
