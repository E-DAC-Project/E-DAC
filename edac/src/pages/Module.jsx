
import React from "react";
import "./EDACModules.css";

const edacModules = [
  {
    name: "C++",
    resources: [
      "Syllabus",
      "MCQ",
      "Interview Questions",
      "Reference Books",
      "Exam Links",
    ],
  },
  {
    name: "Java",
    resources: [
      "Syllabus",
      "MCQ",
      "Interview Questions",
      "Reference Books",
      "Exam Links",
    ],
  },
  {
    name: ".Net",
    resources: [
      "Syllabus",
      "MCQ",
      "Interview Questions",
      "Reference Books",
      "Exam Links",
    ],
  },
  {
    name: "Data Structures",
    resources: [
      "Syllabus",
      "MCQ",
      "Interview Questions",
      "Reference Books",
      "Exam Links",
    ],
  },
  {
    name: "Web Programming",
    resources: [
      "Syllabus",
      "MCQ",
      "Interview Questions",
      "Reference Books",
      "Exam Links",
    ],
  },
  {
    name: "Operating Systems",
    resources: [
      "Syllabus",
      "MCQ",
      "Interview Questions",
      "Reference Books",
      "Exam Links",
    ],
  },
  {
    name: "Database Management",
    resources: [
      "Syllabus",
      "MCQ",
      "Interview Questions",
      "Reference Books",
      "Exam Links",
    ],
  },
  {
    name: "Advance Java",
    resources: [
      "Syllabus",
      "MCQ",
      "Interview Questions",
      "Reference Books",
      "Exam Links",
    ],
  },
  {
    name: "Aptitude And Reasoning",
    resources: [
      "Syllabus",
      "MCQ",
      "Interview Questions",
      "Reference Books",
      "Exam Links",
    ],
  },
];

const EDACModulesSection = () => {
  return (
    <>
      <h1 className="heading">E-DAC Course Modules</h1>
      <div className="module-section">
        {edacModules.map((module, index) => (
          <div key={index} className="module-card">
            <h2>{module.name}</h2>
            <ul>
              {module.resources.map((resource, idx) => (
                <li key={idx}>
                  <a
                    href={`/${module.name
                      .toLowerCase()
                      .replace(/\s/g, "-")}/${resource
                      .toLowerCase()
                      .replace(/\s/g, "-")}`}
                  >
                    {resource}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
};

export default EDACModulesSection;
