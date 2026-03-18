import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

const AssessmentLevel = () => {
  const { subject, level } = useParams();
  const levelNum = parseInt(level, 10);
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [sectionMetadata, setSectionMetadata] = useState({ name: "", timeLimit: 0 });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [candidate, setCandidate] = useState(null);
  const timerRef = useRef(null);
  const mountedRef = useRef(false);

  const QUESTION_COUNT = { 1: 30, 2: 30, 3: 40 };
  const TIMER_MINUTES = levelNum === 3 ? 30 : 25;

  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;

    const fetchStatus = async () => {
      try {
        const candData = JSON.parse(localStorage.getItem("candidate") || "{}");
        setCandidate(candData);

        const res = await api.get(`/assessment/status/${subject}`, { withCredentials: true });
        if (res.data?.error) {
          setError(res.data.error);
          setIsLocked(true);
          setLoading(false);
          return;
        }
        const nextLevel = Number(res.data.nextLevel) || 1;
        if (nextLevel < levelNum) {
          setError("You cannot attempt this level.");
          setIsLocked(true);
          setLoading(false);
          return;
        }
        await fetchQuestions();
      } catch (err) {
        console.error("Status check failed:", err);
        setError("Failed to check level status. Make sure you are logged in.");
        setIsLocked(true);
        setLoading(false);
      }
    };

    const fetchQuestions = async () => {
      try {
        const res = await api.get(`/assessment/${subject}/level/${levelNum}`, { withCredentials: true });
        if (res.data?.error) {
          setError(res.data.error);
          setIsLocked(true);
          setLoading(false);
          return;
        }
        const qs = res.data.questions || [];
        
        if (qs.length === 0) {
            setError(res.data.message || "No questions found for this level.");
            setIsLocked(true);
            setLoading(false);
            return;
        }

        setQuestions(qs);
        setSectionMetadata({
          name: res.data.sectionName || "Assessment Section",
          timeLimit: res.data.timeLimit || 10
        });
        setTimeLeft((res.data.timeLimit || 10) * 60);
        setAnswers({});
        setSubmitted(false);
        setError("");
        setIsLocked(false);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load questions:", err);
        setError("Failed to load questions.");
        setIsLocked(true);
        setLoading(false);
      }
    };

    fetchStatus();
  }, [subject, level]);

  useEffect(() => {
    if (isLocked || submitted || timeLeft <= 0) return;

    const tick = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(tick);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(tick);
  }, [timeLeft, isLocked, submitted]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const logActivity = async (eventType, details = "") => {
    if (!candidate || submitted) return;
    try {
      await api.post("/monitoring/log", {
        candidateId: candidate.id,
        candidateName: candidate.fullName || candidate.name,
        assessmentName: subject,
        section: sectionMetadata.name,
        questionNumber: currentQuestionIndex + 1,
        eventType,
        eventDetails: details,
        violationCount,
        timeLeft
      }, { withCredentials: true });
    } catch (err) {
      console.error("Failed to log activity:", err);
    }
  };

  useEffect(() => {
    if (!loading && questions.length > 0) {
        logActivity("EXAM_STARTED", "Candidate started the level");
    }
  }, [loading]);

  useEffect(() => {
    if (currentQuestionIndex > 0 || questions.length > 0) {
        logActivity("QUESTION_CHANGED", `Moved to question ${currentQuestionIndex + 1}`);
    }
  }, [currentQuestionIndex]);

  // Auto-save answers every 30 seconds
  useEffect(() => {
    if (submitted || isLocked || questions.length === 0) return;

    const autoSaveInterval = setInterval(() => {
        const formattedAnswers = {};
        questions.forEach(q => {
            formattedAnswers[q.id.toString()] = answers[q.id] || "";
        });

        api.post(`/assessment/${subject}/submit/${levelNum}?autosave=true`, {
            answers: formattedAnswers,
            violations: violationCount,
            lastActivity,
            isAutoSave: true
        }, { withCredentials: true }).catch(err => console.error("Auto-save failed:", err));
        
        logActivity("AUTO_SAVE", "Answers auto-saved");
    }, 30000);

    return () => clearInterval(autoSaveInterval);
  }, [answers, questions, submitted, isLocked]);

  const [violationCount, setViolationCount] = useState(0);
  const [lastActivity, setLastActivity] = useState("");
  const MAX_VIOLATIONS = 3;

  useEffect(() => {
    if (violationCount >= MAX_VIOLATIONS && !submitted) {
      alert("Maximum violations reached. Your exam is being submitted.");
      handleSubmit(null, true);
    }
  }, [violationCount]);

  const enterFullscreen = () => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    }
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden" && !submitted) {
        setViolationCount(prev => prev + 1);
        setLastActivity("Tab switched");
        logActivity("TAB_SWITCH", "Candidate switched tabs");
        alert("Tab switching is not allowed during the exam.");
      }
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && !submitted) {
        setViolationCount(prev => prev + 1);
        setLastActivity("Fullscreen exited");
        logActivity("FULLSCREEN_EXIT", "Candidate exited fullscreen");
        alert("Exiting fullscreen is not allowed during the exam. Re-entering fullscreen...");
        enterFullscreen();
      }
    };

    const handleContextMenu = (e) => e.preventDefault();

    const handleKeyDown = (e) => {
      // Block F12 (123), Ctrl+Shift+I (73), J (74), C (67)
      if (
        e.keyCode === 123 || 
        (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) ||
        (e.ctrlKey && (e.keyCode === 67 || e.keyCode === 86 || e.keyCode === 88 || e.keyCode === 65)) ||
        (e.keyCode === 116) || // F5
        (e.ctrlKey && e.keyCode === 82) // Ctrl+R
      ) {
        e.preventDefault();
        setViolationCount(prev => prev + 1);
        const details = "Blocked key combo: " + e.key;
        setLastActivity(details);
        logActivity("FORBIDDEN_KEY", details);
        alert("This action is prohibited during the exam.");
      }
    };

    const handleBlur = () => {
      if (!submitted) {
        setViolationCount(prev => prev + 1);
        setLastActivity("Window focus lost");
        logActivity("WINDOW_BLUR", "Exam window lost focus");
      }
    };

    const handleBeforeUnload = (e) => {
      if (!submitted) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Disable text selection
    document.body.style.userSelect = "none";

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.body.style.userSelect = "auto";
    };
  }, [submitted]);

  const handleAutoSubmit = () => {
    if (!submitted) {
        handleSubmit(null, true); 
    }
  };

  const handleSelect = (qid, selected) => {
    if (submitted || isLocked) return;
    setAnswers(prev => ({ ...prev, [qid]: selected }));
  };

  const handleSubmit = async (e, isAutoSubmit = false) => {
    if (e?.preventDefault) e.preventDefault();
    if (isLocked) return;
    
    // Auto-submits should force through, manual submits should maybe verify.
    // For now, process identically. 

    try {
      const formattedAnswers = {};
      questions.forEach(q => {
        formattedAnswers[q.id.toString()] = answers[q.id] || "";
      });

      const res = await api.post(
        `/assessment/${subject}/submit/${levelNum}`,
        {
            answers: formattedAnswers,
            violations: violationCount,
            lastActivity,
            isAutoSubmit
        },
        { withCredentials: true }
      );

      if (res.data?.error) {
        alert(res.data.error);
        return;
      }

      const score = res.data.score ?? res.data.percentage ?? 0;
      const percentage = res.data.percentage ?? null;
      const passed = res.data.passed ?? (percentage !== null ? percentage >= 60 : score >= 60);

      setSubmitted(true);
      logActivity("EXAM_SUBMITTED", isAutoSubmit ? "Auto-submitted due to violations or timeout" : "Manually submitted");
      
      // Exit fullscreen if still in it
      if (document.fullscreenElement) {
        if (document.exitFullscreen) document.exitFullscreen();
      }

      // Navigate to results (or home if auto-submitted)
      if (isAutoSubmit) {
        navigate("/candidates/welcome");
      } else {
        navigate("/assessment/result", {
          state: {
            score: percentage !== null ? percentage : score,
            passed: !!passed,
            level: levelNum,
            subject,
            isLastLevel: levelNum === Object.keys(QUESTION_COUNT).length,
            autoSubmitted: isAutoSubmit
          }
        });
      }
    } catch (err) {
      console.error("Submit error:", err);
      const msg = err.response?.data?.error || err.response?.data?.message || "Error submitting answers. Please check your connection and try again.";
      alert(msg);
    }
  };

  const handleNextLevel = () => {
    const next = levelNum + 1;
    navigate(`/assessment/${subject}/${next}`);
  };

  const sectionLabels = {
    1: "Aptitude",
    2: "Vocabulary",
    3: "Technical"
  };

  if (loading) return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div className="spinner-border text-primary" role="status"></div>
    </div>
  );

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div style={{
      backgroundColor: "#f4f7fa",
      minHeight: "100vh",
      fontFamily: "'Inter', sans-serif",
      display: "flex",
      flexDirection: "column"
    }}>
      {/* Header */}
      <nav style={{
        backgroundColor: "#fff",
        padding: "1rem 2rem",
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 100
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <div>
            <h5 style={{ margin: 0, fontWeight: "800", color: "#1e293b" }}>{subject}</h5>
            <span style={{ fontSize: "0.85rem", color: "#64748b" }}>{sectionMetadata.name}</span>
          </div>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "6px 12px",
            borderRadius: "6px",
            backgroundColor: violationCount >= 2 ? "#fee2e2" : "#f1f5f9",
            color: violationCount >= 2 ? "#ef4444" : "#475569",
            fontWeight: "600",
            fontSize: "0.9rem"
          }}>
            <i className="fas fa-shield-alt"></i> Violations: {violationCount}/3
          </div>
        </div>
        {!isLocked && (
          <div style={{
            backgroundColor: timeLeft < 60 ? "#fee2e2" : "#f1f5f9",
            color: timeLeft < 60 ? "#ef4444" : "#475569",
            padding: "8px 16px",
            borderRadius: "8px",
            fontWeight: "700",
            fontSize: "1.1rem",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}>
            <i className="far fa-clock"></i> {formatTime(timeLeft)}
          </div>
        )}
        <button
          className="btn btn-primary btn-sm fw-bold"
          onClick={() => handleSubmit()}
          disabled={submitted || isLocked}
        >
          Submit Test
        </button>
      </nav>

      <div style={{ display: "flex", flex: 1, padding: "2rem", gap: "2rem", boxSizing: "border-box" }}>
        {/* Sidebar */}
        <div style={{
          width: "280px",
          flexShrink: 0,
          backgroundColor: "#fff",
          borderRadius: "16px",
          padding: "1.5rem",
          boxShadow: "0 4px 15px rgba(0,0,0,0.03)",
          alignSelf: "flex-start",
          position: "sticky",
          top: "100px",
          boxSizing: "border-box"
        }}>
          <h6 style={{ fontWeight: "700", marginBottom: "1rem" }}>Questions</h6>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(5, 1fr)", 
            gap: "8px",
            width: "100%"
          }}>
            {questions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentQuestionIndex(idx)}
                style={{
                  aspectRatio: "1",
                  borderRadius: "8px",
                  border: currentQuestionIndex === idx ? "2px solid #4f46e5" : "1px solid #e2e8f0",
                  backgroundColor: answers[q.id] ? "#4f46e5" : (currentQuestionIndex === idx ? "#eef2ff" : "#fff"),
                  color: answers[q.id] ? "#fff" : (currentQuestionIndex === idx ? "#4f46e5" : "#64748b"),
                  fontWeight: "600",
                  fontSize: "0.85rem",
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 0
                }}
              >
                {idx + 1}
              </button>
            ))}
          </div>
          <div style={{ marginTop: "1.5rem", borderTop: "1px solid #f1f5f9", paddingTop: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.8rem", color: "#64748b", marginBottom: "4px" }}>
              <div style={{ width: "12px", height: "12px", borderRadius: "3px", backgroundColor: "#4f46e5" }}></div> Answered
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.8rem", color: "#64748b" }}>
              <div style={{ width: "12px", height: "12px", borderRadius: "3px", backgroundColor: "#fff", border: "1px solid #e2e8f0" }}></div> Not Answered
            </div>
          </div>
        </div>

        {/* Question Area */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {error ? (
            <div className="alert alert-danger shadow-sm">{error}</div>
          ) : currentQuestion ? (
            <div style={{
              backgroundColor: "#fff",
              borderRadius: "16px",
              padding: "2.5rem",
              boxShadow: "0 4px 15px rgba(0,0,0,0.03)",
              minHeight: "400px",
              display: "flex",
              flexDirection: "column",
              boxSizing: "border-box"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.5rem" }}>
                <span style={{
                  color: "#4f46e5",
                  fontWeight: "700",
                  backgroundColor: "#eef2ff",
                  padding: "4px 12px",
                  borderRadius: "20px",
                  fontSize: "0.85rem"
                }}>
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
              </div>

              <h4 style={{ fontWeight: "700", color: "#1e293b", lineHeight: "1.5", marginBottom: "2rem" }}>
                {currentQuestion.text}
              </h4>

              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "12px", marginBottom: "2rem" }}>
                {(currentQuestion.options || []).map((opt, i) => (
                  <div
                    key={i}
                    onClick={() => handleSelect(currentQuestion.id, opt)}
                    style={{
                      padding: "1rem 1.5rem",
                      borderRadius: "12px",
                      border: answers[currentQuestion.id] === opt ? "2px solid #4f46e5" : "1px solid #e2e8f0",
                      backgroundColor: answers[currentQuestion.id] === opt ? "#f5f3ff" : "#fff",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      transition: "all 0.2s"
                    }}
                  >
                    <div style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      border: "2px solid",
                      borderColor: answers[currentQuestion.id] === opt ? "#4f46e5" : "#cbd5e1",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: answers[currentQuestion.id] === opt ? "#4f46e5" : "transparent"
                    }}>
                      {answers[currentQuestion.id] === opt && <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#fff" }} />}
                    </div>
                    <span style={{ fontWeight: "500", color: "#334155" }}>{opt}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between" }}>
                <button
                  className="btn btn-outline-secondary px-4 fw-bold"
                  disabled={currentQuestionIndex === 0}
                  onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                >
                  Previous
                </button>
                {currentQuestionIndex < questions.length - 1 ? (
                  <button
                    className="btn btn-primary px-4 fw-bold"
                    onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                  >
                    Next Question
                  </button>
                ) : (
                  <button
                    className="btn btn-success px-4 fw-bold"
                    onClick={() => handleSubmit()}
                    disabled={submitted}
                  >
                    Review & Submit
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-5">
              <div className="spinner-border text-primary"></div>
              <p className="mt-2 text-muted">Readying your evaluation...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssessmentLevel;
