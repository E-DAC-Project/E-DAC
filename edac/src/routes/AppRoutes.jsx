import React from "react";
import { Routes, Route, Outlet, useLocation } from "react-router-dom";

import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import EDACModulesSection from "../pages/Module";
import Login from "../pages/Login";
import ResourcePage from "../pages/ResourcePage";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AdminDashboardRoutes from "./AdminDashboardRoutes";
import StudentDashboardRoutes from "./StudentDashboardRoutes";

function MainLayout() {
  const location = useLocation();
  const hideLayout =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!hideLayout && <Navbar />}
      <Outlet />
      {!hideLayout && <Footer />}
    </>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Routes with Navbar/Footer */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/modules" element={<EDACModulesSection />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/:module/:resource" element={<ResourcePage />} />
      {/* Admin Dashboard Routes */}
      <Route path="/adminDashboard/*" element={<AdminDashboardRoutes />} />

      {/* Student Dashboard Routes */}
      <Route path="/studentDashboard/*" element={<StudentDashboardRoutes />} />
      </Route>
    </Routes>
  );
}
