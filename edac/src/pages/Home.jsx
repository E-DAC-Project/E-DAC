
import React from "react";
import { Link } from "react-router-dom";
import home from "../images/home_img.png";
import "./Home.css";

export default function Home() {
  return (
    <div>
      {/* Welcome Section */}
      <div className="home-container py-5">
        <h2 className="text-center mb-4 gradient-text">Welcome to E-DAC</h2>
        <div className="home-content d-flex">
          <div className="home-text">
            <h2 className="gradient-text">Your Success, Our Mission</h2>
            <p>
              Unlock your true potential and rise above the ordinary. Stand out in
              a crowd of millions with the power of knowledge. Our
              industry-aligned courses and expert mentorship pave your way to
              excellence. This is more than learning — it's your journey to shine
              brighter than ever. Step in, stand out, and soar high.
            </p>
            <div className="btn btn-primary" style={{ borderRadius: "10px", width:"auto" }}>
              <Link to="/modules" style={{ textDecoration: "none", color: "white" }}>Explore Now</Link>
            </div>
          </div>
          <div className="home-image">
            <img src={home} alt="Home img" />
          </div>
        </div>
      </div>

      {/* Workflow Section */}
      <div className="workflow-container">
        <h2 className="workflow-title">Our Workflow</h2>
        <div className="workflow-steps">
          <div className="workflow-step">
            <div className="step-content">
              <h3>Professional Mentorship</h3>
              <p>Boost your career with right guidance from top notch experts.</p>
            </div>
          </div>
          <div className="workflow-step">
            <div className="step-content">
              <h3>Group Collaboration</h3>
              <p>You can participate in group discussions where your opinions are valued, heard and implemented..</p>
            </div>
          </div>
          <div className="workflow-step">
            <div className="step-content">
              <h3>Real-Time Projects</h3>
              <p>After completing theoretical knowledge, you will receive practical, hands-experience while working on live projects.</p>
            </div>
          </div>
          <div className="workflow-step">
            <div className="step-content">
              <h3>Placement Assistance</h3>
              <p>Learn how to ace any interview with our comprehensive placement assistance program.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

