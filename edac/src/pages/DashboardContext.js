import React, { createContext, useContext, useState } from "react";

// Create context
const DashboardContext = createContext();

// Custom hook for using context
export const useDashboard = () => useContext(DashboardContext);

// Provider component
export const DashboardProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);

  return (
    <DashboardContext.Provider value={{ courses, setCourses, students, setStudents }}>
      {children}
    </DashboardContext.Provider>
  );
};
