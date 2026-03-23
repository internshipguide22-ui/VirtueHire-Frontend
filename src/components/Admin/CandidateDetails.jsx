// src/pages/admin/CandidateDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../services/api";

const CandidateDetails = () => {
  const { id } = useParams();
  const [candidate, setCandidate] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch candidate details
    api
      .get(`/admin/candidates/${id}`)
      .then((res) => {
        setCandidate(res.data.candidate || null);
        setResults(Array.isArray(res.data.results) ? res.data.results : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load candidate details.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading candidate details...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  if (!candidate) {
    return (
      <div className="alert alert-warning">
        Candidate not found.
      </div>
    );
  }

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Candidate Details</h1>
        <Link to="/admin/dashboard" className="btn btn-secondary">
          <i className="fas fa-arrow-left me-2"></i>Back to Dashboard
        </Link>
      </div>

      {/* Header Card */}
      <div className="card mb-4">
        <div className="card-header bg-primary text-white">
          <h3>{candidate.fullName}</h3>
        </div>
        <div className="card-body row">
          <div className="col-md-6">
            <p><strong>Email:</strong> {candidate.email}</p>
            <p><strong>Phone:</strong> {candidate.phoneNumber}</p>
            <p><strong>Alternate Phone:</strong> {candidate.alternatePhoneNumber}</p>
            <p><strong>Gender:</strong> {candidate.gender}</p>
          </div>
          <div className="col-md-6">
            <p>
              <strong>Assessment Score:</strong>{" "}
              {candidate.score != null ? (
                <span className="badge bg-info">{candidate.score}%</span>
              ) : (
                <span className="text-muted">Not taken</span>
              )}
            </p>
            <p>
              <strong>Badge:</strong>{" "}
              {candidate.badge ? (
                <span className="badge bg-success">{candidate.badge}</span>
              ) : (
                <span className="text-muted">No badge</span>
              )}
            </p>
            <p>
              <strong>Assessment Taken:</strong>{" "}
              {candidate.assessmentTaken ? (
                <span className="badge bg-success">Yes</span>
              ) : (
                <span className="badge bg-secondary">No</span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="row">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-header bg-success text-white">
              <h5>Personal Information</h5>
            </div>
            <div className="card-body">
              <p><strong>Location:</strong> {candidate.city}, {candidate.state}</p>
              <p><strong>Experience Level:</strong> {candidate.experienceLevel}</p>
              <p><strong>Language Preference:</strong> {candidate.languagePreference}</p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-header bg-warning text-dark">
              <h5>Education</h5>
            </div>
            <div className="card-body">
              {candidate.highestEducation && (
                <p>
                  <strong>Highest Education:</strong> {candidate.highestEducation}
                </p>
              )}
              {candidate.collegeUniversity && (
                <p>
                  <strong>College/University:</strong> {candidate.collegeUniversity}
                </p>
              )}
              {candidate.yearOfGraduation && (
                <p>
                  <strong>Graduation Year:</strong> {candidate.yearOfGraduation}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Professional Information */}
      <div className="card mb-4">
        <div className="card-header bg-info text-white">
          <h5>Professional Information</h5>
        </div>
        <div className="card-body row">
          <div className="col-md-6">
            <p><strong>Skills:</strong></p>
            <p>{candidate.skills}</p>
          </div>
          <div className="col-md-6">
            <p><strong>Experience:</strong> {candidate.experience} years</p>
            <p><strong>Level Attempted:</strong> {candidate.levelAttempted}</p>
          </div>
        </div>
      </div>

      {/* Assessment Results */}
      {results.length > 0 && (
        <div className="card mb-4">
          <div className="card-header bg-dark text-white">
            <h5>Assessment Results</h5>
          </div>
          <div className="card-body table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Level</th>
                  <th>Score</th>
                  <th>Date & Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result, index) => (
                  <tr key={index}>
                    <td>
                      {result.level === 1 ? (
                        <span className="badge bg-success">Level 1 (Easy)</span>
                      ) : result.level === 2 ? (
                        <span className="badge bg-warning">Level 2 (Medium)</span>
                      ) : (
                        <span className="badge bg-danger">Level 3 (Hard)</span>
                      )}
                    </td>
                    <td className={result.score >= 75 ? "text-success fw-bold" : "text-danger"}>
                      {result.score}%
                    </td>
                    <td>{new Date(result.attemptedAt).toLocaleString()}</td>
                    <td>
                      {result.score >= 75 ? (
                        <span className="badge bg-success">Passed</span>
                      ) : (
                        <span className="badge bg-danger">Failed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Resume Section */}
      <div className="card mb-4">
        <div className="card-header bg-secondary text-white">
          <h5>Resume</h5>
        </div>
        <div className="card-body">
          {candidate.resumePath ? (
            <>
              <p><strong>Resume File:</strong> {candidate.resumePath}</p>
              <a
                href={`https://backend.virtuehire.in/api/candidates/file/${candidate.resumePath}`}
                className="btn btn-sm btn-outline-primary"
              >
                <i className="fas fa-download"></i> Download Resume
              </a>
            </>
          ) : (
            <p className="text-muted">No resume uploaded</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidateDetails;
