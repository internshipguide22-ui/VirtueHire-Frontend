import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const CoursesDashboard = () => {
  const navigate = useNavigate();
  const [assessmentNames, setAssessmentNames] = useState([]);
  const [statusData, setStatusData] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch all available assessment names (subjects)
  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const res = await api.get("/assessment/subjects", { withCredentials: true });
        // res.data is now a simple list of strings from the new endpoint
        setAssessmentNames(res.data || []);
      } catch (err) {
        console.error("Error fetching assessments:", err);
      }
    };
    fetchAssessments();
  }, []);

  useEffect(() => {
    const fetchStatus = async () => {
      if (assessmentNames.length === 0) return;
      try {
        const newStatus = {};
        for (let name of assessmentNames) {
          const res = await api.get(`/assessment/status/${name}`, { withCredentials: true });
          const results = res.data.results || [];
          const nextLevel = res.data.nextLevel || 1;
          const totalSections = res.data.totalSections || 3;
          const configs = res.data.configs || [];

          const levels = {};
          let failureOccurred = false;

          for (let lvl = 1; lvl <= totalSections; lvl++) {
            if (failureOccurred) {
              levels[lvl] = { status: "locked" };
              continue;
            }

            const attempted = results.some(r => r.level === lvl);
            const passed = results.filter(r => r.level === lvl).some(r => r.score >= 60);

            // Get section name from config
            const config = configs.find(c => c.sectionNumber === lvl);
            const sectionName = config ? config.sectionName : `Section ${lvl}`;

            if (attempted) {
              if (passed) {
                levels[lvl] = { status: "passed", name: sectionName };
              } else {
                levels[lvl] = { status: "failed", name: sectionName };
                failureOccurred = true;
              }
            } else {
              if (lvl === nextLevel && !failureOccurred) {
                levels[lvl] = { status: "available", name: sectionName };
              } else {
                levels[lvl] = { status: "locked", name: sectionName };
              }
            }
          }

          newStatus[name] = { levels, totalSections };
        }
        setStatusData(newStatus);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching status:", err);
        setLoading(false);
      }
    };

    fetchStatus();
  }, [assessmentNames]);

  const handleStart = (name) => {
    const data = statusData[name];
    const nextLevelNum = Object.keys(data.levels).find(lvl => data.levels[lvl].status === "available");
    if (nextLevelNum) navigate(`/assessment/instructions/${name}/${nextLevelNum}`);
  };

  const getBadgeStyle = (status) => {
    switch (status) {
      case "passed": return { backgroundColor: "#10b981", color: "#fff" };
      case "failed": return { backgroundColor: "#ef4444", color: "#fff" };
      case "available": return { backgroundColor: "#3b82f6", color: "#fff" };
      case "locked": return { backgroundColor: "#9ca3af", color: "#fff" };
      default: return { backgroundColor: "#ccc" };
    }
  };

  const courseIcons = {
    "C": "🔵",
    "C++": "⭐",
    "Java": "☕",
    "Python": "🐍",
    "SQL": "🗄️",
    "JavaScript": "⚡",
    "React": "⚛️",
    "Node.js": "🟢"
  };

  const sectionLabels = {
    1: "Aptitude",
    2: "Vocabulary",
    3: "Technical"
  };

  const renderAssessments = (names) => (
    <div style={{
      maxWidth: "1000px",
      margin: "0 auto",
      backgroundColor: "#fff",
      borderRadius: "16px",
      boxShadow: "0 20px 50px rgba(0,0,0,0.1)",
      overflow: "hidden"
    }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#1e293b", color: "#fff", textAlign: "left" }}>
            <th style={{ padding: "24px", fontWeight: "600", fontSize: "1rem" }}>Assessment Name</th>
            <th style={{ padding: "24px", fontWeight: "600", fontSize: "1rem", textAlign: "center" }}>Current Phase</th>
            <th style={{ padding: "24px", fontWeight: "600", fontSize: "1rem", textAlign: "center" }}>Progress</th>
            <th style={{ padding: "24px", fontWeight: "600", fontSize: "1rem", textAlign: "right" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {names.map((name, index) => {
            const data = statusData[name] || { levels: {}, totalSections: 3 };
            const levels = data.levels;
            const total = data.totalSections;
            const passedCount = Object.values(levels).filter(l => l.status === "passed").length;
            const isAvailable = Object.values(levels).some(l => l.status === "available");

            // Determine current section label
            const nextLvlKey = Object.keys(levels).find(lvl => levels[lvl].status === "available");
            const currentSection = nextLvlKey ? levels[nextLvlKey].name : (passedCount === total ? "Completed" : "Phase 1");

            return (
              <tr key={name} style={{
                borderBottom: index === names.length - 1 ? "none" : "1px solid #f1f5f9",
                transition: "background-color 0.2s"
              }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#f8fafc"}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
              >
                <td style={{ padding: "24px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <div style={{
                      width: "48px",
                      height: "48px",
                      backgroundColor: "#f1f5f9",
                      borderRadius: "12px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "1.5rem"
                    }}>
                      🏢
                    </div>
                    <div>
                      <span style={{ fontWeight: "700", color: "#0f172a", fontSize: "1.15rem", display: "block" }}>{name}</span>
                      <span style={{ fontSize: "0.85rem", color: "#64748b" }}>Recruitment Assessment</span>
                    </div>
                  </div>
                </td>
                <td style={{ padding: "24px", textAlign: "center" }}>
                  <span style={{
                    padding: "6px 12px",
                    borderRadius: "20px",
                    backgroundColor: isAvailable ? "#e0f2fe" : (passedCount === total ? "#dcfce7" : "#f1f5f9"),
                    color: isAvailable ? "#0369a1" : (passedCount === total ? "#166534" : "#64748b"),
                    fontSize: "0.875rem",
                    fontWeight: "600"
                  }}>
                    {currentSection}
                  </span>
                </td>
                <td style={{ padding: "24px", textAlign: "center" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                    <span style={{ fontSize: "0.875rem", color: "#64748b", fontWeight: "600" }}>{passedCount}/{total} Sections</span>
                    <div style={{ width: "120px", height: "8px", backgroundColor: "#e2e8f0", borderRadius: "4px", overflow: "hidden" }}>
                      <div style={{ width: `${(passedCount / total) * 100}%`, height: "100%", backgroundColor: "#10b981", borderRadius: "4px", transition: "width 0.5s ease" }} />
                    </div>
                  </div>
                </td>
                <td style={{ padding: "24px", textAlign: "right" }}>
                  <button
                    onClick={() => handleStart(name)}
                    disabled={!isAvailable}
                    style={{
                      padding: "12px 24px",
                      backgroundColor: isAvailable ? "#4f46e5" : "#94a3b8",
                      color: "#fff",
                      border: "none",
                      borderRadius: "10px",
                      cursor: isAvailable ? "pointer" : "not-allowed",
                      fontWeight: "700",
                      fontSize: "0.95rem",
                      transition: "all 0.3s ease",
                      boxShadow: isAvailable ? "0 4px 14px rgba(79, 70, 229, 0.4)" : "none",
                      transform: isAvailable ? "scale(1)" : "scale(1)",
                    }}
                  >
                    {isAvailable ? `Start Test` : (passedCount === total ? "Completed" : "Locked")}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  return (
    <div style={{
      padding: "100px 40px",
      backgroundColor: "#f8fafc",
      minHeight: "100vh",
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif"
    }}>
      {/* Header */}
      <div style={{ marginBottom: "80px", textAlign: "center" }}>
        <h1 style={{
          fontSize: "3.5rem",
          fontWeight: "900",
          color: "#0f172a",
          margin: "0 0 20px 0",
          letterSpacing: "-2px",
          lineHeight: "1"
        }}>
          Recruitment Assessments
        </h1>
        <p style={{
          fontSize: "1.25rem",
          color: "#475569",
          maxWidth: "700px",
          margin: "0 auto",
          lineHeight: "1.6",
          fontWeight: "500"
        }}>
          Complete company-specific assessments with multi-stage evaluations covering Aptitude, Vocabulary, and Technical skills.
        </p>
      </div>

      {/* Main Content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading assessments...</span>
            </div>
            <p style={{ marginTop: "10px", color: "#64748b" }}>Loading available assessments...</p>
          </div>
        ) : (
          renderAssessments(assessmentNames)
        )}
      </div>

      {/* Background decoration */}
      <div style={{
        position: "fixed",
        bottom: "-10%",
        right: "-5%",
        width: "500px",
        height: "500px",
        background: "radial-gradient(circle, rgba(79, 70, 229, 0.03) 0%, rgba(255, 255, 255, 0) 70%)",
        zIndex: 0,
        pointerEvents: "none"
      }} />
    </div>
  );
};

export default CoursesDashboard;
