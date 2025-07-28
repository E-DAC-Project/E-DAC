import React from 'react';
import './ResourcePage.css';

export default function MCQs({ module }) {
  return (
    <div className="resource-wrapper">
      <h2 className="resource-title">{module} - MCQs</h2>
      <p className="resource-description">
        This page contains practice multiple choice questions (MCQs) for <strong>{module}</strong>. Use this to test your knowledge.
      </p>
    </div>
  );
}
