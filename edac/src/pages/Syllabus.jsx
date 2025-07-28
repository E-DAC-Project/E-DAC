import React from 'react';
import './ResourcePage.css';

export default function Syllabus({ module }) {
  return (
    <div className="resource-wrapper">
      <h2 className="resource-title">{module} - Syllabus</h2>
      <p className="resource-description">
        This page shows the syllabus for the <strong>{module}</strong> module. You can include topics,
        units, timelines, and assessment strategies here.
      </p>
    </div>
  );
}
