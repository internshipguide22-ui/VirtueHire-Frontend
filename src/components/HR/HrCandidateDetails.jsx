import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { ArrowLeft, Mail, Award, Briefcase, Code, Calendar, CheckCircle, XCircle, BookOpen, ChevronUp } from 'lucide-react';
import './HrCandidateDetails.css';

function groupBy(arr, key) {
  return arr.reduce((acc, item) => {
    const group = item[key] || 'General';
    if (!acc[group]) acc[group] = [];
    acc[group].push(item);
    return acc;
  }, {});
}

function HrCandidateDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [candidate, setCandidate] = useState(null);
  const [detailedResults, setDetailedResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const loadCandidate = async () => {
      try {
        const res = await api.get(`/hrs/candidates/${id}`);
        setCandidate(res.data.candidate);
        setDetailedResults(res.data.detailedResults || []);
      } catch (err) {
        if (err.response?.status === 403) {
          setError("You have reached the limit of candidate profile views for your current plan. Please upgrade your plan to view more details.");
        } else if (err.response?.status === 401) {
          navigate("/hrs/login");
        } else {
          setError("Failed to load candidate details");
        }
      } finally {
        setLoading(false);
      }
    };
    loadCandidate();

    // Scroll-to-top listener
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [id, navigate]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  if (loading) return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '16px', background: '#f8fafc' }}>
      <div className="hcl-spinner"></div>
      <p style={{ color: '#64748b', fontSize: '15px' }}>Loading candidate profile...</p>
    </div>
  );

  if (error) {
    return (
      <div className="hcd-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <div className="hcd-card" style={{ maxWidth: '560px', textAlign: 'center', padding: '48px' }}>
          <XCircle size={56} color="#ef4444" style={{ marginBottom: '20px' }} />
          <h3 style={{ color: '#ef4444', marginBottom: '12px', fontSize: '20px' }}>Access Restricted</h3>
          <p style={{ color: '#64748b', marginBottom: '28px', lineHeight: '1.6' }}>{error}</p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button className="hcd-back-btn" onClick={() => navigate("/hr/dashboard")}>Go to Dashboard</button>
            <button
              style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '9px 20px', borderRadius: '10px', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}
              onClick={() => navigate("/payments/plans", { state: { fromCandidateId: id } })}
            >
              Upgrade Plan
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!candidate) return <div className="hcd-container"><h3>No candidate data found</h3></div>;

  const subjectGroups = groupBy(detailedResults, 'subject');
  const subjects = Object.keys(subjectGroups);

  return (
    <div className="hcd-container">

      {/* Header */}
      <div className="hcd-header">
        <h2>Candidate Profile</h2>
        <button className="hcd-back-btn" onClick={() => navigate("/hr/dashboard")}>
          <ArrowLeft size={16} /> Back to Dashboard
        </button>
      </div>

      {/* Info Card */}
      <div className="hcd-card">
        <div className="hcd-section-title" style={{ marginBottom: '20px' }}>
          <span>Personal &amp; Professional Info</span>
          <div className="hcd-badge">
            <Award size={14} style={{ marginRight: '6px' }} />
            {candidate.badge || 'No Badge'}
          </div>
        </div>
        <div className="hcd-info-grid">
          <div className="hcd-info-item">
            <span className="hcd-info-label"><Mail size={11} style={{ marginRight: '4px' }} />Full Name</span>
            <span className="hcd-info-value">{candidate.fullName}</span>
          </div>
          <div className="hcd-info-item">
            <span className="hcd-info-label">Email Address</span>
            <span className="hcd-info-value">{candidate.email}</span>
          </div>
          <div className="hcd-info-item">
            <span className="hcd-info-label"><Briefcase size={11} style={{ marginRight: '4px' }} />Experience</span>
            <span className="hcd-info-value">{candidate.experience} Years</span>
          </div>
          <div className="hcd-info-item">
            <span className="hcd-info-label"><Code size={11} style={{ marginRight: '4px' }} />Skills</span>
            <span className="hcd-info-value">{candidate.skills || 'Not specified'}</span>
          </div>
          <div className="hcd-info-item">
            <span className="hcd-info-label">Overall Best Score</span>
            <span className="hcd-info-value" style={{ color: '#2563eb', fontWeight: '700', fontSize: '22px' }}>
              {candidate.score != null ? `${candidate.score}%` : 'N/A'}
            </span>
          </div>
        </div>
      </div>

      {/* Section header */}
      <div className="hcd-section-title">
        <span>Assessment History by Subject</span>
        <span style={{ fontSize: '13px', fontWeight: '500', color: '#94a3b8' }}>
          {detailedResults.length} total attempt{detailedResults.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Subject Cards */}
      {detailedResults.length === 0 ? (
        <div className="hcd-card" style={{ textAlign: 'center', padding: '64px 32px', color: '#94a3b8' }}>
          <BookOpen size={48} style={{ marginBottom: '16px', opacity: 0.35 }} />
          <p style={{ fontSize: '15px' }}>No assessment attempts recorded for this candidate yet.</p>
        </div>
      ) : (
        subjects.map((subject) => {
          const levels = subjectGroups[subject].sort((a, b) => a.level - b.level);
          const avgScore = Math.round(levels.reduce((s, l) => s + l.score, 0) / levels.length);
          const allPassed = levels.every(l => l.score >= 60);

          return (
            <div key={subject} className="hcd-subject-card">
              {/* Subject Header */}
              <div className="hcd-subject-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div className="hcd-subject-icon">
                    <BookOpen size={18} />
                  </div>
                  <div>
                    <h3 className="hcd-subject-name">{subject}</h3>
                    <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                      {levels.length} section{levels.length > 1 ? 's' : ''} attempted
                    </span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2px' }}>Avg. Score</div>
                    <div style={{ fontSize: '20px', fontWeight: '700', color: avgScore >= 60 ? '#16a34a' : '#dc2626' }}>
                      {avgScore}%
                    </div>
                  </div>
                  <span className={`hcd-status-badge ${allPassed ? 'hcd-status-passed' : 'hcd-status-failed'}`}>
                    {allPassed ? <CheckCircle size={13} /> : <XCircle size={13} />}
                    {allPassed ? 'All Passed' : 'Incomplete'}
                  </span>
                </div>
              </div>

              {/* Level rows */}
              <div className="hcd-levels-list">
                {levels.map((lvl, idx) => {
                  const passed = lvl.score >= 60;
                  const sectionName = lvl.sectionName || `Section ${lvl.level}`;
                  return (
                    <div key={idx} className="hcd-level-row">
                      {/* Column 1: Level label */}
                      <div className="hcd-level-label">
                        <span className="hcd-level-badge">L{lvl.level}</span>
                        <span style={{ fontSize: '13px', color: '#374151', fontWeight: '600', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {sectionName}
                        </span>
                      </div>

                      {/* Column 2: Progress bar + score */}
                      <div className="hcd-level-bar-area">
                        <div className="hcd-progress-bar-bg">
                          <div
                            className="hcd-progress-bar-fill"
                            style={{ width: `${lvl.score}%`, backgroundColor: passed ? '#22c55e' : '#ef4444' }}
                          />
                        </div>
                        <span style={{ fontSize: '13px', fontWeight: '700', color: passed ? '#15803d' : '#b91c1c', minWidth: '38px', textAlign: 'right' }}>
                          {lvl.score}%
                        </span>
                      </div>

                      {/* Column 3: Date + pass/fail */}
                      <div className="hcd-level-meta">
                        <span style={{ fontSize: '12px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Calendar size={12} />
                          {new Date(lvl.attemptedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                        <span className={`hcd-status-badge ${passed ? 'hcd-status-passed' : 'hcd-status-failed'}`} style={{ fontSize: '11px', padding: '4px 10px' }}>
                          {passed ? <CheckCircle size={11} /> : <XCircle size={11} />}
                          {passed ? 'Pass' : 'Fail'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })
      )}

      {/* Scroll-to-top button */}
      <button
        className={`hcd-scroll-top ${showScrollTop ? 'hcd-scroll-top--visible' : ''}`}
        onClick={scrollToTop}
        title="Back to top"
      >
        <ChevronUp size={20} />
      </button>
    </div>
  );
}

export default HrCandidateDetails;
