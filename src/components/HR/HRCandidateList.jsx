import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Search, Filter, Mail, GraduationCap, Briefcase, Award, Eye, Trash2, ArrowLeft, Download, User } from 'lucide-react';
import './HRCandidateList.css';

export default function HRCandidateList() {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);
  const [hrInfo, setHrInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  // Filters
  const [filters, setFilters] = useState({
    skills: '',
    experienceLevel: 'All',
    minScore: ''
  });

  const API_BASE = 'http://localhost:8081/api/hrs';

  useEffect(() => {
    // Basic authentication check
    const storedUser = localStorage.getItem('user');
    const role = localStorage.getItem('role');

    if (!storedUser || role !== 'HR') {
      // For demo purposes/if no login, we might want to stay, but usually:
      // navigate('/hrs/login'); 
    } else {
      setHrInfo(JSON.parse(storedUser));
    }

    fetchCandidates();
  }, []);

  const fetchCandidates = async (searchParams = {}) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE}/candidates`, { params: searchParams });
      // The backend returns a map with 'candidates' and 'hr'
      setCandidates(response.data.candidates || []);
      if (response.data.hr) setHrInfo(response.data.hr);
    } catch (err) {
      console.error('Error fetching candidates:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchCandidates(filters);
  };

  const handleClear = () => {
    const defaultFilters = { skills: '', experienceLevel: 'All', minScore: '' };
    setFilters(defaultFilters);
    fetchCandidates(defaultFilters);
  };

  const viewDetails = (id) => {
    navigate(`/hr/candidate/${id}`);
  };

  return (
    <div className="hcl-container">
      {/* Mini Header for HR */}
      <nav className="hcl-navbar">
        <div className="hcl-nav-content">
          <div className="hcl-brand">
            <Briefcase className="hcl-logo-icon" />
            <span>HR Partner Portal</span>
          </div>
          <div className="hcl-hr-meta">
            {hrInfo && (
              <div className="hcl-plan-badge">
                {hrInfo.planType || 'Free Plan'}
              </div>
            )}
            <Link to="/hr/dashboard" className="hcl-nav-link">Dashboard</Link>
          </div>
        </div>
      </nav>

      <main className="hcl-main">
        <header className="hcl-header">
          <div className="hcl-title-section">
            <h1>Candidate Pipeline</h1>
            <p>Discover top talent verified by Virtue Hire assessments</p>
          </div>
          <div className="hcl-stats-mini">
            <div className="hcl-stat-item">
              <span className="hcl-stat-val">{candidates.length}</span>
              <span className="hcl-stat-label">Available</span>
            </div>
          </div>
        </header>

        {/* Search & Filter Bar */}
        <section className="hcl-search-section">
          <form className="hcl-filter-card" onSubmit={handleSearch}>
            <div className="hcl-search-input">
              <Search size={20} />
              <input
                type="text"
                placeholder="Search by skills (e.g. Java, React...)"
                value={filters.skills}
                onChange={(e) => setFilters({ ...filters, skills: e.target.value })}
              />
            </div>

            <div className="hcl-filter-group">
              <div className="hcl-select-wrapper">
                <Filter size={16} />
                <select
                  value={filters.experienceLevel}
                  onChange={(e) => setFilters({ ...filters, experienceLevel: e.target.value })}
                >
                  <option value="All">All Experience</option>
                  <option value="Fresher">Fresher (0-1 yr)</option>
                  <option value="Experienced">Experienced (2+ yrs)</option>
                </select>
              </div>

              <div className="hcl-score-filter">
                <span>Min Score:</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  placeholder="75%"
                  value={filters.minScore}
                  onChange={(e) => setFilters({ ...filters, minScore: e.target.value })}
                />
              </div>

              <div className="hcl-filter-actions">
                <button type="submit" className="hcl-btn-primary">Search</button>
                <button type="button" className="hcl-btn-secondary" onClick={handleClear}>Clear</button>
              </div>
            </div>
          </form>
        </section>

        {/* Candidate List */}
        <div className="hcl-list-container">
          {loading ? (
            <div className="hcl-loading">
              <div className="hcl-spinner"></div>
              <p>Scanning talent pool...</p>
            </div>
          ) : candidates.length > 0 ? (
            <div className="hcl-grid">
              {candidates.map(candidate => (
                <div key={candidate.id} className="hcl-card">
                  <div className="hcl-card-header">
                    <div className="hcl-candi-avatar">
                      {candidate.fullName.charAt(0)}
                    </div>
                    <div className="hcl-badge-tag">{candidate.badge || 'Candidate'}</div>
                  </div>

                  <div className="hcl-card-body">
                    <h3 className="hcl-candi-name">{candidate.fullName}</h3>
                    <div className="hcl-candi-email">
                      <Mail size={14} /> {candidate.email}
                    </div>

                    <div className="hcl-candi-stats">
                      <div className="hcl-candi-stat">
                        <Award size={16} />
                        <span>Score: <strong>{candidate.score}%</strong></span>
                      </div>
                      <div className="hcl-candi-stat">
                        <Briefcase size={16} />
                        <span>Exp: {candidate.experience} yrs</span>
                      </div>
                    </div>

                    <div className="hcl-skills-tags">
                      {candidate.skills ? candidate.skills.split(',').slice(0, 3).map((skill, i) => (
                        <span key={i} className="hcl-skill-tag">{skill.trim()}</span>
                      )) : <span className="hcl-skill-tag">General</span>}
                    </div>
                  </div>

                  <div className="hcl-card-footer">
                    <button className="hcl-btn-view" onClick={() => viewDetails(candidate.id)}>
                      <Eye size={18} />
                      View Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="hcl-empty">
              <User size={64} />
              <h3>No candidates matches</h3>
              <p>Try adjusting your filters or search terms.</p>
              <button onClick={handleClear} className="hcl-btn-secondary">Clear All Filters</button>
            </div>
          )}
        </div>

        <div className="hcl-footer">
          <Link to="/hr/dashboard" className="hcl-back-link">
            &larr; Back to Dashboard
          </Link>
        </div>
      </main>
    </div>
  );
}
