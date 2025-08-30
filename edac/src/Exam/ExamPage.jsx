import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ExamPage() {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [timeLeft, setTimeLeft] = useState(600); // default 10 minutes
  const timerRef = useRef(null);

  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

    useEffect(() => {
        const endTime = localStorage.getItem(`quiz-${quizId}-endTime`);
        if (!endTime) {
            // Exam is already submitted or expired
            navigate("/adminDashboard/courses", { replace: true });
            toast.error("Failed to find exams for these module");
        }
    }, [quizId, navigate]);
  // Fetch Questions
  useEffect(() => {
    async function fetchQuestions() {
      try {
        setLoading(true);
        setErr("");

        const res = await fetch(
          `http://localhost:8080/quiz/startQuiz/${quizId}?count=10`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) throw new Error("Failed to load questions");

        const data = await res.json();
        setQuestions(data);
      } catch (e) {
        setErr(e.message || "Error fetching questions");
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, [quizId, token]);

  // Timer logic with persistence
  useEffect(() => {
    let savedEndTime = localStorage.getItem(`quiz-${quizId}-endTime`);

    if (!savedEndTime) {
      const endTime = Date.now() + 600 * 1000; // 10 minutes
      localStorage.setItem(`quiz-${quizId}-endTime`, endTime);
      savedEndTime = endTime;
    }

    timerRef.current = setInterval(() => {
      const remaining = Math.max(
        0,
        Math.floor((savedEndTime - Date.now()) / 1000)
      );
      setTimeLeft(remaining);

      if (remaining <= 0) {
        clearInterval(timerRef.current);
        handleSubmit(); // auto submit
      }
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [quizId]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" + s : s}`;
  };

  const handleOptionSelect = (qId, option) => {
    setAnswers((prev) => ({
      ...prev,
      [qId]: option,
    }));
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length !== questions.length) {
      alert("Please answer all questions before submitting!");
      return;
    }

    const responses = Object.entries(answers).map(([qId, opt]) => ({
      questionId: qId,
      selectedAnswerId: opt.id,
    }));

    const payload = {
      quizId: quizId,
      responses: responses,
    };
    console.log(payload);

    try {
      const res = await fetch(
        `http://localhost:8080/quiz/submitQuiz/${quizId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error("Failed to submit exam");

      const result = await res.json();

      // clear timer data after submit
      localStorage.removeItem(`quiz-${quizId}-endTime`);

      navigate(`/adminDashboard/exam/${quizId}/result`, { state: { result }, replace:true });
    } catch (e) {
      setErr(e.message || "Error submitting exam");
    }
  };

  if (loading) return <div className="p-6">Loading questions…</div>;
  if (err) return <div className="p-6 text-red-600">Error: {err}</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Exam</h2>
        <div className="text-lg font-semibold text-red-600">
          Time Left: {formatTime(timeLeft)}
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="space-y-6"
      >
        {questions.map((q, idx) => (
          <div key={q.id} className="card shadow-sm mb-4 width:100%">
            <div className="card-body">
              <h5 className="mb-3">
                {idx + 1}. {q.questionText}
              </h5>
              <div className="d-flex flex-column gap-2">
                {q.answers.map((opt, i) => (
                  <label key={i} className="block">
                    <input
                      type="radio"
                      name={`q-${q.id}`}
                      value={opt.text}
                      checked={answers[q.id] === opt}
                      onChange={() => handleOptionSelect(q.id, opt)}
                      className="mr-2"
                    />
                    {opt.text}
                  </label>
                ))}
              </div>
            </div>
          </div>
        ))}

        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
