import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

/**
 * ExamList
 * - Reads :moduleId from URL
 * - Calls GET /api/modules/{moduleId}/quizzes with JWT
 * - Renders list of available quizzes
 */
export default function ExamList() {
  const { moduleId } = useParams();
  const navigate = useNavigate();

  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // Grab token from wherever you store it.
  const token = localStorage.getItem("token") ||
    sessionStorage.getItem("token");

  useEffect(() => {
    // if (!token) {
    //   // No token → send to login (adjust route as per your app)
    //   navigate("/login", { replace: true });
    //   return;
    // }

    const controller = new AbortController();

    async function loadQuizzes() {
      try {
        setLoading(true);
        setErr("");

        const res = await fetch(`http://localhost:8080/quiz/quizList/${moduleId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          signal: controller.signal,
        });

        if (res.status === 401 || res.status === 403) {
          // Auth issue → redirect
          navigate("/login", { replace: true });
          return;
        }
        if (!res.ok) {
          console.log(moduleId);
          const text = await res.text();
          throw new Error(text || `Request failed (${res.status})`);
        }

        const data = await res.json();
        setQuizzes(Array.isArray(data) ? data : []);
      } catch (e) {
        if (e.name !== "AbortError") setErr(e.message || "Failed to load quizzes.");
      } finally {
        setLoading(false);
      }
    }

    loadQuizzes();
    return () => controller.abort();
  }, [moduleId, navigate, token]);

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold mb-3">Available Quizzes</h2>
        <p>Loading quizzes…</p>
      </div>
    );
  }

  if (err) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold mb-3">Available Quizzes</h2>
        <div className="p-4 rounded bg-red-50 border border-red-200 text-red-700">
          {err}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-baseline gap-2 mb-4">
        <h2 className="text-xl font-bold">Available Quizzes</h2>
      </div>

      {quizzes.length === 0 ? (
        <div className="p-4 rounded border">No quizzes found for this module.</div>
      ) : (
        <ul className="grid gap-4">
          {quizzes.map((q) => (
            <li key={q.id} className="border rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{q.title}</h3>
                  <p className="text-sm text-gray-600">
                    Duration: {q.durationMinutes ?? q.duration_minutes} minutes
                  </p>
                  <button className="btn btn-primary mt-3" onClick={() => navigate(`/adminDashboard/exam/${q.id}/instructions`)}>Take Exam</button>
                </div>
                {/* Next page is the instruction page we’ll build later */}
                
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
