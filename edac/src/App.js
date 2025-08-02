import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <ToastContainer position="top-right" autoClose={2000} />
    </BrowserRouter>
  );
}

export default App;
