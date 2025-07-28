import React from 'react';
import './ResourcePage.css';

export default function ReferenceBooks({ module }) {
  return (
    <div className="resource-wrapper">
      <h2 className="resource-title">{module} - Reference Books</h2>
      <p className="resource-description">
        Browse recommended books and publications for <strong>{module}</strong>. These help deepen your understanding of the subject.
      </p>
    </div>
  );
}
