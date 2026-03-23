import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from '../../services/api';
import {
  Users,
  UserCheck,
  Briefcase,
  CreditCard,
  Shield,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  RefreshCw,
  Search
} from "lucide-react";
import './AdminDashboard.css';

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // API Base URL - points to Virtue-Candidate backend
  const API_BASE = '/admin';

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const res = await api.get(`${API_BASE}/dashboard`);
      setData(res.data);
    } catch (e) {
      console.error("Dashboard Fetch Error:", e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="adm-loading-screen">
      <div className="adm-spinner"></div>
      <p>Initializing Admin Control Center...</p>
    </div>
  );

  return (
    <div className="adm-container">
      {/* Sidebar Navigation */}
      <aside className="adm-sidebar">
        <div className="adm-logo">
          <Shield className="adm-logo-icon" />
          <span>Virtue Admin</span>
        </div>
        <nav className="adm-side-nav">
          <Link to="/admin/dashboard" className="active">
            <TrendingUp size={20} /> Dashboard
          </Link>
          <Link to="/admin/hrs">
            <Briefcase size={20} /> HR Management
          </Link>
          <Link to="/admin/candidates">
            <Users size={20} /> Candidates
          </Link>
          <Link to="/admin/questions">
            <HelpCircle size={20} /> Question Bank
          </Link>
          <Link to="/admin/payments">
            <CreditCard size={20} /> Payments
          </Link>
        </nav>
        <div className="adm-sidebar-footer">
          <div className="adm-user-pill">
            <div className="adm-user-avatar">A</div>
            <div className="adm-user-info">
              <div className="adm-username">System Admin</div>
              <div className="adm-role">Superuser</div>
            </div>
          </div>
        </div>
      </aside>

      <main className="adm-main">
        <header className="adm-header">
          <div className="adm-header-title">
            <h1>System Overview</h1>
            <p>Monitor platform growth, revenue, and queue status</p>
          </div>
          <div className="adm-header-actions">
            <button onClick={fetchDashboard} className="adm-refresh-btn">
              <RefreshCw size={18} /> Refresh
            </button>
          </div>
        </header>

        {/* Global Statistics Grid */}
        <section className="adm-stats-grid">
          <div className="adm-stat-card blue">
            <div className="adm-stat-icon">
              <Users size={24} />
            </div>
            <div className="adm-stat-content">
              <div className="adm-stat-value">{data.totalCandidates}</div>
              <div className="adm-stat-label">Total Candidates</div>
            </div>
          </div>

          <div className="adm-stat-card green">
            <div className="adm-stat-icon">
              <CheckCircle size={24} />
            </div>
            <div className="adm-stat-content">
              <div className="adm-stat-value">{data.candidatesWithTest}</div>
              <div className="adm-stat-label">Assessments Taken</div>
            </div>
          </div>

          <div className="adm-stat-card yellow">
            <div className="adm-stat-icon">
              <Briefcase size={24} />
            </div>
            <div className="adm-stat-content">
              <div className="adm-stat-value">{data.totalHrs}</div>
              <div className="adm-stat-label">Active HR Partners</div>
            </div>
          </div>

          <div className="adm-stat-card purple">
            <div className="adm-stat-icon">
              <TrendingUp size={24} />
            </div>
            <div className="adm-stat-content">
              <div className="adm-stat-value">₹{data.totalRevenue?.toLocaleString() || '0'}</div>
              <div className="adm-stat-label">Gross Revenue</div>
            </div>
          </div>
        </section>

        <div className="adm-dashboard-grid">
          {/* Queues Section */}
          <div className="adm-column">
            <div className="adm-card queue-card">
              <div className="adm-card-header">
                <h3>Verification Queues</h3>
                <span className="adm-badge">{data.unverifiedHrs + data.pendingCandidates} Tasks</span>
              </div>
              <div className="adm-card-body">
                <div className="adm-queue-item">
                  <div className="adm-queue-icon yellow">
                    <Briefcase size={18} />
                  </div>
                  <div className="adm-queue-details">
                    <div className="adm-queue-text">Pending HR Approvals</div>
                    <div className="adm-queue-sub">{data.unverifiedHrs} accounts waiting</div>
                  </div>
                  <Link to="/admin/hrs?filter=unverified" className="adm-action-link">
                    Review <ChevronRight size={16} />
                  </Link>
                </div>

                <div className="adm-queue-item">
                  <div className="adm-queue-icon red">
                    <UserCheck size={18} />
                  </div>
                  <div className="adm-queue-details">
                    <div className="adm-queue-text">Candidate Verification</div>
                    <div className="adm-queue-sub">{data.pendingCandidates} candidates waiting</div>
                  </div>
                  <Link to="/admin/candidates/pending" className="adm-action-link">
                    Review <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            </div>

            <div className="adm-card payment-card mt-6">
              <div className="adm-card-header">
                <h3>Recent Revenue</h3>
                <Link to="/admin/payments" className="adm-view-all">View All</Link>
              </div>
              <div className="adm-card-body">
                {data.payments && data.payments.length > 0 ? (
                  data.payments.map((p, i) => (
                    <div key={i} className="adm-payment-item">
                      <div className="adm-pay-info">
                        <div className="adm-pay-hr">{p.hr?.fullName}</div>
                        <div className="adm-pay-meta">{p.planType}</div>
                      </div>
                      <div className="adm-pay-amount">₹{p.amount}</div>
                    </div>
                  ))
                ) : (
                  <div className="adm-empty-msg">No recent transactions.</div>
                )}
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="adm-column wide">
            <div className="adm-card table-card">
              <div className="adm-card-header">
                <h3>Recent Candidate Activity</h3>
                <div className="adm-card-search">
                  <Search size={16} />
                  <input type="text" placeholder="Quick find..." />
                </div>
              </div>
              <div className="adm-table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Candidate</th>
                      <th>Assessment</th>
                      <th>Level</th>
                      <th>Badge</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.candidates && data.candidates.slice(0, 8).map(c => (
                      <tr key={c.id}>
                        <td>
                          <div className="adm-t-name">{c.fullName}</div>
                          <div className="adm-t-email">{c.email}</div>
                        </td>
                        <td>
                          <div className="adm-t-score">{c.score ? `${c.score}%` : 'Pending'}</div>
                        </td>
                        <td>{c.experienceLevel || 'Fresher'}</td>
                        <td>
                          {c.badge ? (
                            <span className="adm-t-badge">{c.badge}</span>
                          ) : (
                            <span className="adm-t-none">-</span>
                          )}
                        </td>
                        <td>
                          <Link to={`/admin/candidates/${c.id}`} className="adm-t-btn">View</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
