import React from 'react';
import './ResourcePage.css';

export default function InterviewQuestions({ module }) {
  return (
    <div className="resource-wrapper">
      <h2 className="resource-title">{module} - Interview Questions</h2>
      <p className="resource-description">
        This section provides important interview questions based on <strong>{module}</strong> to help prepare for job placements.
      </p>
    </div>
  );
}
