import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ExamResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result; // get result from navigation state

  if (!result) {
    return (
      <div className="text-center mt-8 text-lg">
        No result found! Please submit exam again.
        <button
          onClick={() => navigate("/")}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (

    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Exam Result</h1>

      {/* Score Summary */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-green-100 rounded-lg text-center">
          <h2 className="text-lg font-semibold">Score</h2>
          <p className="text-xl font-bold">
            {result.score} / {result.totalQuestions}
          </p>
        </div>
        <div className="p-4 bg-blue-100 rounded-lg text-center">
          <h2 className="text-lg font-semibold">Correct</h2>
          <p className="text-xl font-bold">{result.correctAnswers}</p>
        </div>
        <div className="p-4 bg-red-100 rounded-lg text-center">
          <h2 className="text-lg font-semibold">Wrong</h2>
          <p className="text-xl font-bold">{result.wrongAnswers}</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded-lg text-center">
          <h2 className="text-lg font-semibold">Total Questions</h2>
          <p className="text-xl font-bold">{result.totalQuestions}</p>
        </div>
      </div>
    </div>
  );
};
export default ExamResult;