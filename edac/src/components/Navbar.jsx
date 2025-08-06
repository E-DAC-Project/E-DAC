import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import '../App.css';

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? 'dark-theme' : '';
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <nav className={`navbar navbar-expand-lg shadow-sm px-4 sticky-top ${darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-white'}`}>
      <Link className="navbar-brand d-flex align-items-center" to="/">
        <img src={logo} alt="E-DAC Logo" width="40" height="40" className="me-2" />
        <strong className={darkMode ? 'text-light' : 'text-primary'}>E-DAC</strong>
      </Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto">
          <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/modules">Modules</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/contact">Contact Us</Link></li>
        </ul>
        <form className="d-flex me-3">
          <input className="form-control rounded-pill px-3" type="search" placeholder="Search" />
        </form>
        <Link to="/login" className="btn btn-outline-primary me-3">Login</Link>
        
        {/* Dark Mode Toggle */}
        <div className="form-check form-switch">
          <input className="form-check-input" type="checkbox" role="switch" id="themeSwitch" onChange={toggleTheme} checked={darkMode} />
          <label className="form-check-label" htmlFor="themeSwitch" style={{ color: darkMode ? '#fff' : '#000' }}>Dark</label>
        </div>
      </div>
    </nav>
  );
}
