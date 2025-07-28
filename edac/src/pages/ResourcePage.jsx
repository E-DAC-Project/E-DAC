import React from "react";
import { useParams } from "react-router-dom";
import Syllabus from "./Syllabus";
import MCQs from "./MCQs";
import InterviewQuestions from "./InterviewQuestions";
import ReferenceBooks from "./ReferenceBooks";
import ExamLinks from "./ExamLinks";

export default function ResourcePage() {
  const { module, resource } = useParams();
  const resourceKey = resource.toLowerCase();

  const components = {
    syllabus: <Syllabus module={module} />,
    mcq: <MCQs module={module} />,
    "interview-questions": <InterviewQuestions module={module} />,
    "reference-books": <ReferenceBooks module={module} />,
    "exam-links": <ExamLinks module={module} />,
  };

  return components[resourceKey] || <h2>Resource not found for "{module}"</h2>;
}
