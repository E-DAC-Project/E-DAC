import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ExamInstruction() {
  const { quizId } = useParams(); // get quizId from route
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const token =
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");

  useEffect(() => {
    async function fetchQuiz() {
      try {
        setLoading(true);
        setErr("");

        const res = await fetch(`http://localhost:8080/quiz/quizInstruction/${quizId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to load quiz details");
        }

        const data = await res.json();
        setQuiz(data);
      } catch (e) {
        setErr(e.message || "Error fetching quiz");
      } finally {
        setLoading(false);
      }
    }

    fetchQuiz();
  }, [quizId, token]);

  if (loading) {
    return <div className="p-6">Loading instructions…</div>;
  }

  if (err) {
    return (
      <div className="p-6 text-red-600">
        Error loading instructions: {err}
      </div>
    );
  }

  if (!quiz) return null;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-3">Exam Instructions</h2>

      <div className="border p-4 rounded-lg bg-gray-50 mb-4">
        <p className="font-semibold mb-2">{quiz.title}</p>
        <ul className="list-disc pl-6 text-gray-700 space-y-1">
          <li>Duration: {quiz.durationMinutes} minutes</li>
          <li>Number of Questions: 10</li>
          <li>Marks: 1 mark for each correct answer</li>
          <li>No negative marking</li>
          <li>Do not refresh the page during the exam</li>
        </ul>
      </div>

      <button
        onClick={() => navigate(`/adminDashboard/exam/${quizId}/start`)}
        className="btn btn-primary mt-3"
      >
        Start Exam
      </button>
    </div>
  );
}
