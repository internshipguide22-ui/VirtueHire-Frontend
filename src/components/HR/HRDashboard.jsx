import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  LogOut,
  CheckCircle,
  AlertCircle,
  Clock,
  Award
} from 'lucide-react';
import TestManager from './TestManager';
import LiveAssessments from './LiveAssessments';
import LiveMonitoring from './LiveMonitoring';
import './HRDashboard.css';
import { Monitor } from 'lucide-react';

const HRDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [hr, setHr] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Stats
  const [stats, setStats] = useState({
    totalCandidates: 0,
    assessmentsTaken: 0,
    pendingApprovals: 0
  });

  // Data for tabs
  const [subjects, setSubjects] = useState([]);
  const [candidates, setCandidates] = useState([]);

  // Form states
  const [uploadFile, setUploadFile] = useState(null);
  const [testName, setTestName] = useState('');
  const [uploadLoading, setUploadLoading] = useState(false);

  // Config states
  const [configSubject, setConfigSubject] = useState('');
  const [configs, setConfigs] = useState([
    { sectionNumber: 1, sectionName: 'Basic', timeLimit: 10, questionCount: 10 },
    { sectionNumber: 2, sectionName: 'Intermediate', timeLimit: 15, questionCount: 10 },
    { sectionNumber: 3, sectionName: 'Expert', timeLimit: 20, questionCount: 10 }
  ]);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const dashboardRes = await api.get('/hrs/dashboard');
      setHr(dashboardRes.data.hr);

      const candidatesRes = await api.get('/hrs/candidates');
      const allCandidates = candidatesRes.data.candidates || [];
      setCandidates(allCandidates);

      const subjectsRes = await api.get('/hrs/subjects');
      setSubjects(subjectsRes.data.subjects || []);

      setStats({
        totalCandidates: allCandidates.length,
        assessmentsTaken: allCandidates.filter(c => c.assessmentTaken).length,
        pendingApprovals: allCandidates.filter(c => !c.approved).length
      });

    } catch (err) {
      console.error('Error fetching data:', err);
      // If unauthorized, redirect to login
      if (err.response?.status === 401) {
        navigate('/hrs/login');
      }
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await api.post('/hrs/logout');
      localStorage.clear();
      navigate('/hrs/login');
    } catch (err) {
      console.error('Logout failed:', err);
      // Even if API fails, clear local and redirect
      localStorage.clear();
      navigate('/hrs/login');
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!uploadFile || !testName) {
      setError('Please provide both test name and CSV file');
      return;
    }

    setUploadLoading(true);
    const formData = new FormData();
    formData.append('file', uploadFile);
    formData.append('testName', testName);

    try {
      await api.post('/hrs/questions/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setSuccess(`Question bank for ${testName} uploaded successfully!`);
      setUploadFile(null);
      setTestName('');
      setTimeout(() => setSuccess(null), 3000);
      fetchInitialData(); // Refresh subjects
    } catch (err) {
      setError(err.response?.data?.error || 'Upload failed');
    } finally {
      setUploadLoading(false);
    }
  };

  const handleSaveConfig = async (e) => {
    e.preventDefault();
    if (!configSubject) {
      setError('Please select a subject to configure');
      return;
    }

    const payload = configs.map(c => ({
      ...c,
      subject: configSubject
    }));

    try {
      await api.post('/hrs/assessment/config', payload);
      setSuccess(`Configuration for ${configSubject} saved!`);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to save configuration');
    }
  };

  if (loading) return (
    <div className="hcl-loading" style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="hcl-spinner"></div>
      <p>Synchronizing with Virtue Intelligence...</p>
    </div>
  );

  return (
    <div className="hr-dashboard-wrapper">
      {/* Sidebar */}
      <aside className="hr-sidebar">
        <div className="hr-sidebar-logo">
          Virtue<span>Hire</span>
        </div>

        <ul className="hr-nav-list">
          <li
            className={`hr-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <LayoutDashboard size={20} /> Dashboard
          </li>
          <li
            className={`hr-nav-item ${activeTab === 'candidates' ? 'active' : ''}`}
            onClick={() => {
              // We could navigate, but let's keep it SPA within the tab
              setActiveTab('candidates');
            }}
          >
            <Users size={20} /> Candidates
          </li>
          <li
            className={`hr-nav-item ${activeTab === 'manage' ? 'active' : ''}`}
            onClick={() => setActiveTab('manage')}
          >
            <Settings size={20} /> Manage Tests
          </li>
          <li
            className={`hr-nav-item ${activeTab === 'monitoring' ? 'active' : ''}`}
            onClick={() => setActiveTab('monitoring')}
          >
            <Monitor size={20} /> Live Monitoring
          </li>
        </ul>

        <div className="hr-sidebar-footer">
          <button className="hr-btn-logout" onClick={handleLogout}>
            <LogOut size={20} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="hr-content-main">
        <header className="hr-content-header">
          <div className="hr-welcome-text">
            <h1>{activeTab === 'overview' ? `Hello, ${hr?.fullName}` : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
            <p>{activeTab === 'overview' ? "Here's what's happening with your recruitment today." : `Manage your ${activeTab} and recruitment pipeline.`}</p>
          </div>
          <div className="hr-user-peek">
            <span className="hr-plan-badge">{hr?.planType || 'Free Account'}</span>
          </div>
        </header>

        {error && <div className="hrm-alert error"><AlertCircle size={18} /> {error}</div>}
        {success && <div className="hrm-alert success"><CheckCircle size={18} /> {success}</div>}

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="hr-overview-tab">
            <div className="hr-stats-grid">
              <div className="hr-stat-card">
                <div className="hr-stat-icon" style={{ background: '#eff6ff', color: '#1d4ed8' }}><Users size={24} /></div>
                <div className="hr-stat-info">
                  <h3>Total Talent Pool</h3>
                  <p>{stats.totalCandidates}</p>
                </div>
              </div>
              <div className="hr-stat-card">
                <div className="hr-stat-icon" style={{ background: '#f0fdf4', color: '#15803d' }}><CheckCircle size={24} /></div>
                <div className="hr-stat-info">
                  <h3>Tests Completed</h3>
                  <p>{stats.assessmentsTaken}</p>
                </div>
              </div>
              <div className="hr-stat-card">
                <div className="hr-stat-icon" style={{ background: '#fff7ed', color: '#c2410c' }}><Clock size={24} /></div>
                <div className="hr-stat-info">
                  <h3>Pending Review</h3>
                  <p>{stats.pendingApprovals}</p>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-7">
                <div className="hr-section-card">
                  <div className="hr-section-header">
                    <h2>Recent Candidate Activity</h2>
                  </div>
                  <div className="hr-table-container">
                    <table className="hr-data-table">
                      <thead>
                        <tr>
                          <th>Candidate</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {candidates.slice(0, 5).map(c => (
                          <tr key={c.id}>
                            <td>
                              <div className="hrm-user-info">
                                <div className="hrm-avatar">{c.fullName.charAt(0)}</div>
                                <div>
                                  <div className="hrm-name">{c.fullName}</div>
                                  <div className="hrm-email">{c.email}</div>
                                </div>
                              </div>
                            </td>
                            <td>
                              {c.assessmentTaken ?
                                <span className="hrm-badge verified">Tested</span> :
                                <span className="hrm-badge pending">Not Attempted</span>
                              }
                            </td>
                            <td>
                              <button className="hcl-btn-view" style={{ padding: '6px 12px' }} onClick={() => navigate(`/hr/candidate/${c.id}`)}>
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="col-md-5">
                <div className="hr-section-card">
                  <div className="hr-section-header">
                    <h2>Your Profile</h2>
                  </div>
                  <div className="hr-profile-details">
                    <p><strong>Company:</strong> {hr?.companyName}</p>
                    <p><strong>Job Title:</strong> {hr?.jobTitle}</p>
                    <p><strong>Industry:</strong> {hr?.industry}</p>
                    <p><strong>Location:</strong> {hr?.city}, {hr?.state}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'candidates' && (
          <div className="hr-section-card">
            <div className="hr-section-header">
              <h2>Talent Pool</h2>
            </div>
            <div className="hr-table-container">
              <table className="hr-data-table">
                <thead>
                  <tr>
                    <th>Candidate</th>
                    <th>Experience</th>
                    <th>Skills</th>
                    <th>Badge</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {candidates.map(c => (
                    <tr key={c.id}>
                      <td>
                        <div className="hrm-user-info">
                          <div className="hrm-name">{c.fullName}</div>
                        </div>
                      </td>
                      <td>{c.experience} Years</td>
                      <td>{c.skills || 'Not specified'}</td>
                      <td><span className="hr-plan-badge">{c.badge || 'Candidate'}</span></td>
                      <td>
                        <button className="hcl-btn-view" style={{ padding: '6px 12px' }} onClick={() => navigate(`/hr/candidate/${c.id}`)}>
                          View Profile
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}


        {activeTab === 'manage' && (
          <div className="hr-manage-wrapper">
            <TestManager hr={hr} onSuccess={setSuccess} onError={setError} />
            <div style={{ marginTop: '30px' }}>
              <LiveAssessments hr={hr} refreshTrigger={success} />
            </div>
          </div>
        )}

        {activeTab === 'monitoring' && (
          <LiveMonitoring />
        )}
      </main>
    </div>
  );
};

export default HRDashboard;
