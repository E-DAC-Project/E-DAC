import React from 'react';
import './ResourcePage.css';

export default function ExamLinks({ module }) {
  return (
    <div className="resource-wrapper">
      <h2 className="resource-title">{module} - Exam Links</h2>
      <p className="resource-description">
        This page contains useful online exam links and resources for <strong>{module}</strong>, including mock tests and certification portals.
      </p>
    </div>
  );
}
