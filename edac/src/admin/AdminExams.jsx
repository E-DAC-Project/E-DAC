import React, { useState, useEffect } from "react";
import axios from "axios";
//import toast from "react-hot-toast";
import { toast } from 'react-toastify';
import { useParams } from "react-router-dom";

export default function QuizExam() {
  const [stage, setStage] = useState("instructions"); // "instructions" | "exam" | "result"
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 min in seconds
  const [score, setScore] = useState(0);
  const [submittedAnswers, setSubmittedAnswers] = useState([]);
  const moduleId = useParams();
  // Fetch quiz questions from backend
  const fetchQuestions = async () => {
    try {
      const token =
        sessionStorage.getItem("token") || localStorage.getItem("token");
        console.log(token);
      const res = await axios.get(
        `http://localhost:8080/quiz/getQuestions/${moduleId.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setQuestions(res.data);
    } catch (err) {
      toast.error("Failed to fetch quiz questions");
      console.error(err);
    }
  };

  // Timer effect
  useEffect(() => {
    let timer;
    if (stage === "exam" && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    }
    if (timeLeft === 0 && stage === "exam") {
      handleSubmit();
    }
    return () => clearInterval(timer);
  }, [stage, timeLeft]);

  // Start exam
  const startExam = () => {
    fetchQuestions();
    setStage("exam");
    setTimeLeft(600); // reset timer
  };

  // Handle answer select
  const handleAnswer = (qId, option) => {
    setAnswers((prev) => ({ ...prev, [qId]: option }));
  };

  // Submit exam
  const handleSubmit = async () => {
    try {
      const token =
        sessionStorage.getItem("token") || localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:8080/quiz/submit",
        { answers, moduleId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setScore(res.data.score);
      setSubmittedAnswers(res.data.answers); // [{questionId, selected, correct}]
      setStage("result");
    } catch (err) {
      toast.error("Failed to submit quiz");
      console.error(err);
    }
  };

  // Format time (mm:ss)
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="quiz-container p-4">
      {stage === "instructions" && (
        <div className="bg-light p-4 rounded shadow">
          <h3>Quiz Instructions</h3>
          <ul>
            <li>Duration: 10 minutes</li>
            <li>Total Questions: 10</li>
            <li>Each correct answer: +1 mark</li>
            <li>No negative marking</li>
            <li>Once started, the timer cannot be paused</li>
          </ul>
          <button className="btn btn-primary mt-3" onClick={startExam}>
            Start Exam
          </button>
        </div>
      )}

      {stage === "exam" && (
        <div>
          <div className="d-flex justify-content-between mb-3">
            <h4>Quiz</h4>
            <h5>Time Left: {formatTime(timeLeft)}</h5>
          </div>
          {questions.map((q, idx) => (
            <div key={q.id} className="mb-3 p-3 border rounded">
              <strong>
                {idx + 1}. {q.questionText}
              </strong>
              <div>
                {q.options.map((opt, i) => (
                  <div key={i}>
                    <input
                      type="radio"
                      name={`q-${q.id}`}
                      value={opt}
                      checked={answers[q.id] === opt}
                      onChange={() => handleAnswer(q.id, opt)}
                    />
                    <label className="ms-2">{opt}</label>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button className="btn btn-success mt-3" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      )}

      {stage === "result" && (
        <div className="p-4 bg-light rounded">
          <h3>Your Score: {score} / 10</h3>
          <h5>Answer Review:</h5>
          {submittedAnswers.map((ans, idx) => (
            <div
              key={ans.questionId}
              className={`p-2 my-2 rounded ${
                ans.selected === ans.correct ? "bg-success text-white" : "bg-danger text-white"
              }`}
            >
              <strong>Q{idx + 1}:</strong> {ans.questionText}
              <br />
              <span>Your Answer: {ans.selected}</span>
              <br />
              <span>Correct Answer: {ans.correct}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
