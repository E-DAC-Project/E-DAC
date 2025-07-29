import React from "react";
import "./StudentCard.css";
export default function () {
  return (
    <div>
      <div className="custom-card">
        <img src="images/card.jpg" alt="Card Image" />
        <div className="card-body">
          <div className="custom-progress">
            <div className="progress-bar"></div>
            <span>55%</span>
          </div>
          <p className="card-text">55/100 lectures completed</p>
          <h4>Course Name</h4>
          <small>Last Read: Layout Grids Guidelines</small>
          <button>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-play-circle"
                viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445" />
              </svg>
            </span>{" "}
            Resume Course
          </button>
        </div>
      </div>
    </div>
  );
}
