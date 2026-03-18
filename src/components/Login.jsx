import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User, Lock, Mail, Shield, Users, UserCheck, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import './Login.css';

const Login = () => {
    const [activeTab, setActiveTab] = useState('candidate'); // candidate, hr, admin
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const role = activeTab.toUpperCase();
            const res = await axios.post("http://localhost:8081/api/auth/login", {
                email: email,
                password: password,
                role: role
            }, { withCredentials: true });

            if (res.data.user || res.data.role) {
                setSuccess(`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Login successful!`);
                
                // Consistency in localStorage keys for existing dashboards
                localStorage.setItem('user_role', activeTab);
                
                if (activeTab === 'candidate') {
                    localStorage.setItem('candidate', JSON.stringify(res.data.user));
                    localStorage.setItem('currentUser', JSON.stringify(res.data.user));
                    setTimeout(() => navigate("/candidates/welcome"), 1000);
                } else if (activeTab === 'hr') {
                    localStorage.setItem('current_hr_user', JSON.stringify(res.data.user));
                    setTimeout(() => navigate("/hr/dashboard"), 1000);
                } else if (activeTab === 'admin') {
                    localStorage.setItem('admin_user', JSON.stringify(res.data.user));
                    setTimeout(() => navigate("/admin/dashboard"), 1000);
                }
            } else {
                setError("Login failed. Please check your credentials.");
            }
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.error || "Invalid credentials or server error.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="vh-login-wrapper">
            <div className="vh-login-background">
                <div className="vh-bg-shape vh-shape-1"></div>
                <div className="vh-bg-shape vh-shape-2"></div>
                <div className="vh-bg-shape vh-shape-3"></div>
            </div>

            <div className="vh-login-container">
                <div className="vh-login-content">
                    <div className="vh-login-left">
                        <div className="vh-brand-section">
                            <h1 className="vh-brand-title">VirtueHire</h1>
                            <p className="vh-brand-subtitle">Empowering Talent, Enabling Success</p>
                            <div className="vh-brand-features">
                                <div className="vh-feature-item">
                                    <div className="vh-feature-icon">✓</div>
                                    <p>AI-Powered Matching</p>
                                </div>
                                <div className="vh-feature-item">
                                    <div className="vh-feature-icon">✓</div>
                                    <p>Seamless Hiring Process</p>
                                </div>
                                <div className="vh-feature-item">
                                    <div className="vh-feature-icon">✓</div>
                                    <p>Career Growth Analytics</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="vh-login-right">
                        <div className="vh-form-container">
                            <div className="vh-form-header">
                                <button type="button" className="vh-back-button" onClick={() => navigate('/landing')}>
                                    <ArrowLeft size={18} />
                                    Back
                                </button>
                                <h2 className="vh-form-title">Welcome Back</h2>
                            </div>
                            <p className="vh-form-subtitle">Sign in to your account</p>

                            <div className="vh-role-tabs">
                                <button
                                    onClick={() => setActiveTab('candidate')}
                                    className={`vh-role-tab ${activeTab === 'candidate' ? 'active' : ''}`}
                                >
                                    <UserCheck size={18} />
                                    <span>Candidate</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('hr')}
                                    className={`vh-role-tab ${activeTab === 'hr' ? 'active' : ''}`}
                                >
                                    <Users size={18} />
                                    <span>HR</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('admin')}
                                    className={`vh-role-tab ${activeTab === 'admin' ? 'active' : ''}`}
                                >
                                    <Shield size={18} />
                                    <span>Admin</span>
                                </button>
                            </div>

                            {error && <div className="vh-alert vh-alert-error">{error}</div>}
                            {success && <div className="vh-alert vh-alert-success">{success}</div>}

                            <form className="vh-form" onSubmit={handleLogin}>
                                <div className="vh-form-group">
                                    <label className="vh-label">Email Address</label>
                                    <div className="vh-input-wrapper">
                                        <Mail className="vh-input-icon" size={18} />
                                        <input
                                            type="email"
                                            className="vh-input"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="vh-form-group">
                                    <label className="vh-label">Password</label>
                                    <div className="vh-input-wrapper">
                                        <Lock className="vh-input-icon" size={18} />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            className="vh-input"
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="vh-password-toggle"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                <button type="submit" className="vh-submit-btn" disabled={loading}>
                                    {loading ? 'Signing In...' : 'Sign In'}
                                </button>

                                {activeTab === 'candidate' && (
                                    <div className="vh-register-link">
                                        Don't have an account? <span onClick={() => navigate('/candidate-registration')}>Register Now</span>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
