// src/pages/admin/QuestionManagement.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const QuestionManagement = () => {
  const [questions, setQuestions] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [newQuestion, setNewQuestion] = useState({
    subject: "",
    level: "1",
    text: "",
    options: ["", "", "", ""],
    correctAnswer: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [csvFile, setCsvFile] = useState(null);
  const [testTitle, setTestTitle] = useState("");
  const [sections, setSections] = useState([
    { sectionNumber: 1, sectionName: "Aptitude", timeLimit: 10 },
    { sectionNumber: 2, sectionName: "Technical", timeLimit: 20 },
    { sectionNumber: 3, sectionName: "Vocabulary", timeLimit: 5 },
  ]);
  const [saveLoading, setSaveLoading] = useState(false);

  // Fetch questions & subjects
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8081/api/admin/questions", { withCredentials: true })
      .then((res) => {
        setQuestions(res.data.questions || []);
        setSubjects(res.data.subjects || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load questions.");
        setLoading(false);
      });
  }, []);

  // Filter questions by subject
  const filteredQuestions = selectedSubject
    ? questions.filter((q) => q.subject === selectedSubject)
    : questions;

  // Handle input changes for new question
  const handleNewQuestionChange = (e, index = null) => {
    const { name, value } = e.target;
    if (name === "options") {
      const updatedOptions = [...newQuestion.options];
      updatedOptions[index] = value;
      setNewQuestion({ ...newQuestion, options: updatedOptions });
    } else {
      setNewQuestion({ ...newQuestion, [name]: value });
    }
  };

  // Add new question
  const handleAddQuestion = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8081/api/admin/questions/add", newQuestion, { withCredentials: true })
      .then((res) => {
        setQuestions((prev) => [...prev, res.data]);
        setNewQuestion({
          subject: "",
          level: "1",
          text: "",
          options: ["", "", "", ""],
          correctAnswer: "",
        });
      })
      .catch((err) => console.error(err));
  };

  // Delete question
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this question?")) return;
    axios
      .post(`http://localhost:8081/api/admin/questions/delete/${id}`, {}, { withCredentials: true })
      .then(() => setQuestions((prev) => prev.filter((q) => q.id !== id)))
      .catch((err) => console.error(err));
  };

  // CSV Upload
  const handleCSVUpload = () => {
    if (!csvFile || !testTitle) {
      alert("Please select a file and enter a Test Name");
      return;
    }

    const formData = new FormData();
    formData.append("file", csvFile);
    formData.append("testName", testTitle);

    setSaveLoading(true);
    axios
      .post("http://localhost:8081/api/admin/questions/upload", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        alert(res.data.message);
        // Refresh questions
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
        alert("Upload failed: " + (err.response?.data?.error || err.message));
      })
      .finally(() => setSaveLoading(false));
  };

  // Save Config
  const handleSaveConfig = () => {
    if (!testTitle) {
      alert("Please enter a Test Name first");
      return;
    }

    const configData = sections.map(s => ({ ...s, subject: testTitle }));

    setSaveLoading(true);
    axios
      .post("http://localhost:8081/api/admin/assessment/config", configData, { withCredentials: true })
      .then((res) => {
        alert("Assessment configuration saved!");
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to save config");
      })
      .finally(() => setSaveLoading(false));
  };

  const addSectionRow = () => {
    setSections([...sections, { sectionNumber: sections.length + 1, sectionName: "", timeLimit: 10 }]);
  };

  const handleSectionChange = (index, field, value) => {
    const updated = [...sections];
    updated[index][field] = value;
    setSections(updated);
  };

  if (loading) return <p>Loading questions...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1><i className="fas fa-question-circle me-2"></i>Question Bank Management</h1>
      </div>

      {/* Filter */}
      <div className="card mb-4">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Filter Questions</h5>
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-8">
              <label className="form-label">Filter by Assessment Name</label>
              <select
                className="form-select"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                <option value="">All Assessments</option>
                {subjects.map((subject, idx) => (
                  <option key={idx} value={subject}>{subject} Assessment</option>
                ))}
              </select>
            </div>
            <div className="col-md-4 d-flex align-items-end">
              <button
                className="btn btn-primary me-2"
                onClick={() => { }}
              >
                Filter
              </button>
              <button
                className="btn btn-outline-secondary"
                onClick={() => setSelectedSubject("")}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Question / Create Assessment */}
      <div className="row">
        <div className="col-lg-7">
          <div className="card mb-4">
            <div className="card-header bg-success text-white">
              <h5 className="mb-0">Manual Question Entry</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleAddQuestion}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Assessment Name (Company) *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="subject"
                      value={newQuestion.subject}
                      onChange={handleNewQuestionChange}
                      placeholder="e.g., Wipro, Indigo, TCS"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Assessment Section *</label>
                    <select
                      className="form-select"
                      name="level"
                      value={newQuestion.level}
                      onChange={handleNewQuestionChange}
                      required
                    >
                      <option value="1">Aptitude (Phase 1)</option>
                      <option value="2">Vocabulary (Phase 2)</option>
                      <option value="3">Technical (Phase 3)</option>
                    </select>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Question Text *</label>
                  <textarea
                    className="form-control"
                    name="text"
                    value={newQuestion.text}
                    onChange={handleNewQuestionChange}
                    rows="3"
                    required
                    placeholder="Enter the question text..."
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Options (4 required) *</label>
                  {newQuestion.options.map((opt, idx) => (
                    <input
                      key={idx}
                      type="text"
                      className="form-control mb-2"
                      name="options"
                      value={opt}
                      onChange={(e) => handleNewQuestionChange(e, idx)}
                      placeholder={`Option ${idx + 1}`}
                      required
                    />
                  ))}
                </div>

                <div className="mb-3">
                  <label className="form-label">Correct Answer *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="correctAnswer"
                    value={newQuestion.correctAnswer}
                    onChange={handleNewQuestionChange}
                    placeholder="Must match one of the options exactly"
                    required
                  />
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-success">Add To Bank</button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-lg-5">
          {/* CSV Upload */}
          <div className="card mb-4 border-primary">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">CSV Bulk Upload</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label fw-bold">1. Enter Test Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g., Java Developer Assessment"
                  value={testTitle}
                  onChange={(e) => setTestTitle(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">2. Upload CSV File</label>
                <input
                  type="file"
                  className="form-control"
                  accept=".csv"
                  onChange={(e) => setCsvFile(e.target.files[0])}
                />
                <div className="form-text small">
                  Columns: question_number, section_number, section_name, question, option_a, option_b, option_c, option_d, correct_answer
                </div>
              </div>
              <button
                className="btn btn-primary w-100"
                onClick={handleCSVUpload}
                disabled={saveLoading}
              >
                {saveLoading ? "Uploading..." : "Upload Assessment Questions"}
              </button>
            </div>
          </div>

          {/* Section Configuration */}
          <div className="card mb-4 border-info">
            <div className="card-header bg-info text-white">
              <h5 className="mb-0">Assessment Sections & Timers</h5>
            </div>
            <div className="card-body">
              <p className="small text-muted mb-3">Define time limits for each section in "{testTitle || '...'}"</p>
              {sections.map((sec, idx) => (
                <div key={idx} className="row g-2 mb-2 align-items-center">
                  <div className="col-2"><span className="badge bg-secondary">#{sec.sectionNumber}</span></div>
                  <div className="col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="Section Name"
                      value={sec.sectionName}
                      onChange={(e) => handleSectionChange(idx, "sectionName", e.target.value)}
                    />
                  </div>
                  <div className="col-4">
                    <div className="input-group input-group-sm">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Mins"
                        value={sec.timeLimit}
                        onChange={(e) => handleSectionChange(idx, "timeLimit", e.target.value)}
                      />
                      <span className="input-group-text">min</span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="d-flex justify-content-between mt-3">
                <button className="btn btn-outline-info btn-sm" onClick={addSectionRow}>
                  <i className="fas fa-plus me-1"></i> Add Section
                </button>
                <button className="btn btn-info btn-sm text-white" onClick={handleSaveConfig} disabled={saveLoading}>
                  <i className="fas fa-save me-1"></i> Save Config
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="card">
        <div className="card-header bg-dark text-white">
          <h5 className="mb-0">
            Questions List <span className="badge bg-light text-dark">{filteredQuestions.length}</span>
          </h5>
        </div>
        <div className="card-body table-responsive">
          {filteredQuestions.length === 0 ? (
            <div className="text-center text-muted py-4">
              <i className="fas fa-inbox fa-2x mb-2"></i>
              <p>No questions found</p>
            </div>
          ) : (
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Assessment Name</th>
                  <th>Section</th>
                  <th>Question</th>
                  <th>Options</th>
                  <th>Correct Answer</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredQuestions.map((question) => (
                  <tr key={question.id}>
                    <td>{question.id}</td>
                    <td><span className="badge bg-info">{question.subject} Assessment</span></td>
                    <td>
                      {question.level === 1 && <span className="badge bg-primary">Aptitude</span>}
                      {question.level === 2 && <span className="badge bg-secondary">Vocabulary</span>}
                      {question.level === 3 && <span className="badge bg-dark">Technical</span>}
                    </td>
                    <td><small>{question.text}</small></td>
                    <td>
                      <ol className="small mb-0">
                        {question.options.map((opt, idx) => (
                          <li key={idx}>{opt}</li>
                        ))}
                      </ol>
                    </td>
                    <td><span className="badge bg-success">{question.correctAnswer}</span></td>
                    <td>
                      <div className="btn-group btn-group-sm">
                        {/* You can add an edit route */}
                        <button className="btn btn-outline-danger" onClick={() => handleDelete(question.id)}>
                          <i className="fas fa-trash"></i> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionManagement;
