import React, { useState, useEffect, useCallback, useRef } from 'react';
import Papa from 'papaparse';
import api from '../../services/api';
import './TestManager.css';

/* ── Toast Notification ─────────────────────────────────── */
const Toast = ({ toasts, remove }) => (
  <div className="tm-toast-stack">
    {toasts.map(t => (
      <div key={t.id} className={`tm-toast tm-toast-${t.type}`}>
        <i className={t.type === 'success' ? 'fas fa-check-circle' : t.type === 'error' ? 'fas fa-times-circle' : 'fas fa-info-circle'} />
        <span>{t.message}</span>
        <button className="tm-toast-close" onClick={() => remove(t.id)}>&times;</button>
      </div>
    ))}
  </div>
);

/* ── Upload Progress Bar ─────────────────────────────────── */
const ProgressBar = ({ progress, visible }) => {
  if (!visible) return null;
  return (
    <div className="tm-progress-wrap">
      <div className="tm-progress-bar" style={{ width: `${progress}%` }} />
      <span className="tm-progress-text">{progress}%</span>
    </div>
  );
};

/* ── Section Row in Assessment Config ────────────────────── */
const SectionRow = ({ section, index, allSubjectsInfo, onChange, onRemove }) => {
  const selectedSubjectInfo = allSubjectsInfo.find(s => s.subject === section.subject);
  const maxAvailable = selectedSubjectInfo ? selectedSubjectInfo.count : 0;

  return (
    <div className="tm-section-row">
      <div className="tm-section-ctrl">
        <label className="tm-ctrl-label">Question Bank (Subject)</label>
        <select
          className="tm-input"
          value={section.subject}
          onChange={e => onChange(index, 'subject', e.target.value)}
        >
          <option value="">-- Select Subject --</option>
          {allSubjectsInfo.map(s => (
            <option key={s.subject} value={s.subject}>
              {s.subject} ({s.count} available)
            </option>
          ))}
        </select>
      </div>

      <div className="tm-section-ctrl">
        <label className="tm-ctrl-label">Questions (max {maxAvailable})</label>
        <input
          type="number" min="1" max={maxAvailable}
          value={section.questionCount}
          className="tm-input"
          onChange={e => onChange(index, 'questionCount', Math.min(parseInt(e.target.value) || 1, maxAvailable))}
          disabled={!section.subject}
        />
      </div>

      <div className="tm-section-ctrl">
        <label className="tm-ctrl-label">Minutes</label>
        <input
          type="number" min="1"
          value={section.timeLimit}
          className="tm-input"
          onChange={e => onChange(index, 'timeLimit', parseInt(e.target.value) || 1)}
        />
      </div>

      <div className="tm-section-ctrl">
        <label className="tm-ctrl-label">Pass %</label>
        <input
          type="number" min="1" max="100"
          value={section.passPercentage}
          className="tm-input"
          onChange={e => onChange(index, 'passPercentage', Math.min(parseInt(e.target.value) || 1, 100))}
        />
      </div>

      <button className="tm-btn-remove" title="Remove section" onClick={() => onRemove(index)}>
        <i className="fas fa-times" />
      </button>
    </div>
  );
};

/* ============================================================
   MAIN COMPONENT
   ============================================================ */
const TestManager = ({ hr, onSuccess }) => {
  const toastId = useRef(0);
  const [toasts, setToasts] = useState([]);

  /* ---------- helpers ---------- */
  const addToast = (message, type = 'success') => {
    const id = ++toastId.current;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 5000);
  };
  const removeToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));

  /* ---------- shared state ---------- */
  const [allSubjectsInfo, setAllSubjectsInfo] = useState([]);

  const fetchSubjectsInfo = useCallback(async () => {
    try {
      const res = await api.get('/hrs/subjects-info', { withCredentials: true });
      setAllSubjectsInfo(res.data.subjects || []); // Expecting [{subject: "Aptitude", count: 50}, ...]
    } catch { /* silent */ }
  }, []);

  useEffect(() => { fetchSubjectsInfo(); }, [fetchSubjectsInfo]);

  /* =====================================================
     SECTION 1 — QUESTION BANK UPLOAD
     ===================================================== */
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadTestName, setUploadTestName] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleDrag = useCallback(e => {
    e.preventDefault(); e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setIsDragging(true);
    else setIsDragging(false);
  }, []);

  const handleDrop = useCallback(e => {
    e.preventDefault(); e.stopPropagation();
    setIsDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (f) validateAndSetFile(f);
  }, []);

  const validateAndSetFile = (f) => {
    if (!f.name.endsWith('.csv') && f.type !== 'text/csv') {
      addToast('Please upload a valid .csv file.', 'error'); return;
    }
    setFile(f);
    setUploadStatus(null);
  };

  const validateCSV = (content) => {
    return new Promise((resolve, reject) => {
      Papa.parse(content, {
        header: true, skipEmptyLines: true,
        complete: (results) => {
          const required = ['subject', 'text', 'option1', 'option2', 'option3', 'option4', 'correctAnswer'];
          const headers = Object.keys(results.data[0] || {}).map(h => h.trim().toLowerCase());
          const missing = required.filter(r => !headers.includes(r.toLowerCase()));
          if (missing.length > 0) {
            reject(`Missing required columns: ${missing.join(', ')}`);
            return;
          }
          const badRows = results.data.filter(row =>
            !row.subject?.trim() || !row.text?.trim() ||
            !row.option1?.trim() || !row.option2?.trim() ||
            !row.option3?.trim() || !row.option4?.trim() ||
            !row.correctAnswer?.trim()
          );
          if (badRows.length > 0) {
            reject(`${badRows.length} row(s) have empty or missing values.`);
            return;
          }
          const sections = [...new Set(results.data.map(r => r.subject?.trim()).filter(Boolean))];
          resolve({ count: results.data.length, sections });
        },
        error: (err) => reject(err.message)
      });
    });
  };

  const handleUploadCSV = async () => {
    if (!file) { addToast('Please select a CSV file first.', 'error'); return; }

    setUploading(true);
    setUploadProgress(10);
    setUploadStatus(null);

    try {
      const text = await file.text();
      let meta;
      try {
        meta = await validateCSV(text);
      } catch (valErr) {
        addToast(`Invalid CSV Format — ${valErr}`, 'error');
        setUploadStatus({ ok: false, message: `Invalid CSV: ${valErr}` });
        setUploading(false);
        setUploadProgress(0);
        return;
      }

      setUploadProgress(40);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('testName', uploadTestName || meta.sections[0] || 'General');

      await api.post('/hrs/questions/upload-csv', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
        onUploadProgress: (e) => {
          if (e.total) setUploadProgress(40 + Math.round((e.loaded / e.total) * 50));
        }
      });

      setUploadProgress(100);
      setUploadStatus({ ok: true, count: meta.count, sections: meta.sections });
      addToast(`Upload Successful! ${meta.count} questions uploaded. Sections: ${meta.sections.join(', ')}`, 'success');
      fetchSubjectsInfo();
      setFile(null);
      setUploadTestName('');
    } catch (err) {
      const msg = err.response?.data?.error || 'Upload failed. Please try again.';
      addToast(msg, 'error');
      setUploadStatus({ ok: false, message: msg });
    } finally {
      setUploading(false);
      setTimeout(() => setUploadProgress(0), 1500);
    }
  };

  /* =====================================================
     SECTION 2 — ASSESSMENT CREATION
     ===================================================== */
  const [assessmentName, setAssessmentName] = useState('');
  const [description, setDescription] = useState('');
  const [chosenSections, setChosenSections] = useState([{ subject: '', questionCount: 10, timeLimit: 10, passPercentage: 60 }]);
  const [savingAssessment, setSavingAssessment] = useState(false);

  const addSection = () => {
    setChosenSections(prev => [...prev, { subject: '', questionCount: 10, timeLimit: 10, passPercentage: 60 }]);
  };

  const updateSection = (i, field, value) => {
    setChosenSections(prev => {
      const copy = [...prev];
      copy[i] = { ...copy[i], [field]: value };
      
      // If subject changed, validate max questions immediately
      if (field === 'subject') {
         const info = allSubjectsInfo.find(s => s.subject === value);
         const max = info ? info.count : 0;
         if (copy[i].questionCount > max) {
            copy[i].questionCount = max;
         }
      }
      
      return copy;
    });
  };

  const removeSection = (i) => {
    setChosenSections(prev => prev.filter((_, idx) => idx !== i));
  };

  const handleSaveAssessment = async () => {
    if (!assessmentName.trim()) { addToast('Please enter an assessment name.', 'error'); return; }
    if (chosenSections.length === 0) { addToast('Please add at least one section.', 'error'); return; }
    
    // Validate sections
    for (let i = 0; i < chosenSections.length; i++) {
        const sec = chosenSections[i];
        if (!sec.subject) {
            addToast(`Please select a subject for Section ${i+1}.`, 'error'); return;
        }
        if (sec.questionCount < 1) {
            addToast(`Section ${i+1} must have at least 1 question.`, 'error'); return;
        }
    }

    setSavingAssessment(true);
    try {
      const payload = {
          assessmentName,
          description,
          sections: chosenSections
      };
      await api.post('/hrs/assessments/create', payload, { withCredentials: true });
      addToast(`Assessment "${assessmentName}" created successfully!`, 'success');
      if (onSuccess) onSuccess();
      setAssessmentName('');
      setDescription('');
      setChosenSections([{ subject: '', questionCount: 10, timeLimit: 10, passPercentage: 60 }]);
    } catch (err) {
      addToast(err.response?.data?.error || 'Failed to save assessment.', 'error');
    } finally {
      setSavingAssessment(false);
    }
  };

  /* ─────────────────────────────────────────────────────────
     RENDER
     ───────────────────────────────────────────────────────── */
  return (
    <div className="tm-page">
      <Toast toasts={toasts} remove={removeToast} />

      {/* ── PAGE TITLE ── */}
      <div className="tm-page-header">
        <h2 className="tm-page-title">
          <i className="fas fa-tasks" /> Manage Tests
        </h2>
        <p className="tm-page-sub">Upload questions to the Question Bank and create assessments for candidates.</p>
      </div>

      {/* ════════════════════════════════════════════════════
          SECTION 1 — QUESTION BANK UPLOAD
          ════════════════════════════════════════════════════ */}
      <div className="tm-card tm-card-upload">
        <div className="tm-card-head">
          <div className="tm-card-icon tm-icon-blue">
            <i className="fas fa-cloud-upload-alt" />
          </div>
          <div>
            <h3 className="tm-card-title">Question Bank Upload</h3>
            <p className="tm-card-desc">Upload a CSV file containing questions for multiple subjects in one go.</p>
          </div>
        </div>

        {/* CSV Format Box */}
        <div className="tm-format-box">
          <div className="tm-format-header">
            <i className="fas fa-file-csv" /> CSV Format Required
          </div>
          <div className="tm-format-code">
            subject,text,option1,option2,option3,option4,correctAnswer
          </div>
          <div className="tm-format-examples">
            <div className="tm-format-row"><span className="tm-tag tm-tag-aptitude">Aptitude</span>What is 5+5?, 8, 9, 10, 11, <strong>10</strong></div>
            <div className="tm-format-row"><span className="tm-tag tm-tag-vocab">Vocabulary</span>Meaning of Abundant?, Scarce, Plenty, Rare, None, <strong>Plenty</strong></div>
            <div className="tm-format-row"><span className="tm-tag tm-tag-tech">Technical</span>What is JVM?, Java Virtual Machine, Java Vendor..., <strong>Java Virtual Machine</strong></div>
          </div>
          <p className="tm-format-note"><i className="fas fa-lightbulb" /> One file can contain <strong>thousands of rows</strong> with multiple subjects (Aptitude, Vocabulary, Technical, etc.).</p>
        </div>

        {/* Optional Subject Name */}
        <div className="tm-field-group">
          <label className="tm-label">Target Subject Name <span className="tm-optional">(optional fallback)</span></label>
          <input
            type="text"
            className="tm-input"
            placeholder="e.g., Java Backend Pool, Python Test"
            value={uploadTestName}
            onChange={e => setUploadTestName(e.target.value)}
          />
        </div>

        {/* Drag & Drop Zone */}
        <div
          className={`tm-dropzone ${isDragging ? 'tm-dropzone-drag' : ''} ${file ? 'tm-dropzone-filled' : ''}`}
          onDragEnter={handleDrag} onDragLeave={handleDrag}
          onDragOver={handleDrag} onDrop={handleDrop}
          onClick={() => document.getElementById('tm-file-input').click()}
        >
          <input id="tm-file-input" type="file" accept=".csv" hidden
            onChange={e => { if (e.target.files[0]) validateAndSetFile(e.target.files[0]); e.target.value = ''; }}
          />
          {file ? (
            <div className="tm-drop-filled">
              <i className="fas fa-file-csv tm-file-icon" />
              <div>
                <p className="tm-file-name">{file.name}</p>
                <p className="tm-file-size">{(file.size / 1024).toFixed(1)} KB</p>
              </div>
              <button className="tm-remove-file" onClick={e => { e.stopPropagation(); setFile(null); setUploadStatus(null); }}>
                <i className="fas fa-times" />
              </button>
            </div>
          ) : (
            <div className="tm-drop-empty">
              <i className="fas fa-cloud-upload-alt tm-drop-icon" />
              <p className="tm-drop-main">Drag and drop your CSV file here</p>
              <p className="tm-drop-sub">or <span className="tm-drop-link">click to browse</span></p>
              <div className="tm-drop-badge">Supported Format: CSV</div>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <ProgressBar progress={uploadProgress} visible={uploading} />

        {/* Upload Status */}
        {uploadStatus && (
          <div className={`tm-status-box ${uploadStatus.ok ? 'tm-status-ok' : 'tm-status-err'}`}>
            {uploadStatus.ok ? (
              <>
                <i className="fas fa-check-circle" />
                <div>
                  <strong>Upload Successful</strong>
                  <p>Total Questions Uploaded: <strong>{uploadStatus.count}</strong></p>
                  <p>Subjects Detected: <strong>{uploadStatus.sections.join(', ')}</strong></p>
                </div>
              </>
            ) : (
              <>
                <i className="fas fa-exclamation-triangle" />
                <div>
                  <strong>Invalid CSV Format</strong>
                  <p>{uploadStatus.message}</p>
                  <p>Please check the CSV structure and try again.</p>
                </div>
              </>
            )}
          </div>
        )}

        <button
          className="tm-btn tm-btn-primary"
          onClick={handleUploadCSV}
          disabled={!file || uploading}
        >
          {uploading
            ? <><i className="fas fa-spinner fa-spin" /> Uploading...</>
            : <><i className="fas fa-upload" /> Upload CSV</>}
        </button>
      </div>

      {/* ════════════════════════════════════════════════════
          SECTION 2 — ASSESSMENT CREATION
          ════════════════════════════════════════════════════ */}
      <div className="tm-card tm-card-assessment">
        <div className="tm-card-head">
          <div className="tm-card-icon tm-icon-indigo">
            <i className="fas fa-clipboard-list" />
          </div>
          <div>
            <h3 className="tm-card-title">Assessment Creation</h3>
            <p className="tm-card-desc">Create dynamically generated assessments by pulling randomized questions from the available subjects.</p>
          </div>
        </div>

        {/* Assessment Name */}
        <div className="tm-field-group">
          <label className="tm-label">Assessment Name <span className="tm-required">*</span></label>
          <input
            type="text"
            className="tm-input tm-input-lg"
            placeholder="e.g., Senior Frontend Engineer Assessment"
            value={assessmentName}
            onChange={e => setAssessmentName(e.target.value)}
          />
        </div>
        
        {/* Description */}
        <div className="tm-field-group">
          <label className="tm-label">Description <span className="tm-optional">(optional)</span></label>
          <textarea
            className="tm-input"
            rows="2"
            placeholder="e.g., Covers React, CSS, and basic algorithms."
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>

        {/* Section Configuration Table */}
        <div className="tm-sections-container">
            <h4 className="tm-sections-title">Assessment Sections</h4>
            <p className="tm-field-hint"><i className="fas fa-info-circle" /> Configure each section independently. Questions will be randomly pulled per candidate.</p>
            
            {chosenSections.length > 0 && (
              <div className="tm-config-table-wrap">
                {chosenSections.map((sec, i) => (
                  <div key={i} className="tm-section-wrapper">
                    <div className="tm-section-header">Section {i + 1}</div>
                    <SectionRow
                      section={sec}
                      index={i}
                      allSubjectsInfo={allSubjectsInfo}
                      onChange={updateSection}
                      onRemove={removeSection}
                    />
                  </div>
                ))}
              </div>
            )}
            
            {allSubjectsInfo.length === 0 && (
               <div className="tm-empty-state">
                  <i className="fas fa-database" />
                  <p>No subjects found in the Question Bank. Please upload a CSV first.</p>
               </div>
            )}

            {/* Add Section Button */}
            {allSubjectsInfo.length > 0 && (
              <div className="tm-add-section-row">
                <button className="tm-btn tm-btn-outline" onClick={addSection}>
                  <i className="fas fa-plus" /> Add Another Section
                </button>
              </div>
            )}
        </div>

        {/* Save Button */}
        <div className="tm-save-row">
          <button
            className="tm-btn tm-btn-success"
            onClick={handleSaveAssessment}
            disabled={savingAssessment || chosenSections.length === 0}
          >
            {savingAssessment
              ? <><i className="fas fa-spinner fa-spin" /> Publishing...</>
              : <><i className="fas fa-save" /> Publish Assessment</>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestManager;
