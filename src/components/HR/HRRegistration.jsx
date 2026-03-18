// HRRegistration.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Building2, 
  Globe, 
  MapPin, 
  Briefcase, 
  Upload, 
  CheckCircle, 
  AlertCircle,
  Shield,
  ArrowRight,
  FileText
} from 'lucide-react';
import './HRRegistration.css';

const HRRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    jobTitle: "",
    companyWebsite: "",
    industry: "",
    city: "",
    state: "",
    idProof: null,
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      setError("File size exceeds 5MB limit.");
      return;
    }
    setFormData(prev => ({ ...prev, idProof: file }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    const data = new FormData();
    for (let key in formData) {
      if (formData[key] !== null) data.append(key, formData[key]);
    }

    try {
      const res = await axios.post("http://localhost:8081/api/hrs/register", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(res.data.message || "Registration successful! Status: Pending Verification.");
      setError("");

      setTimeout(() => {
        navigate(`/verify-email?email=${formData.email}&role=hr`);
      }, 3000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Registration failed. Please try again.");
      setMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hr-reg-container">
      {/* Left Info Side */}
      <div className="hr-reg-info-side">
        <div className="hr-reg-logo">
          <Shield size={32} />
          <span>VirtueHire Partner</span>
        </div>
        
        <div className="hr-reg-welcome">
          <h1>Find Top Talent with Precision</h1>
          <p>Join the elite network of HR professionals using VirtueHire's AI-powered assessment platform to streamline recruitment.</p>
        </div>

        <div className="hr-reg-features">
          <div className="hr-reg-feature-item">
            <div className="hr-reg-feature-icon"><CheckCircle size={24} /></div>
            <div className="hr-reg-feature-text">
              <h3>Verified Candidates</h3>
              <p>Access pre-vetted candidates with validated skill assessments and badges.</p>
            </div>
          </div>
          
          <div className="hr-reg-feature-item">
            <div className="hr-reg-feature-icon"><Briefcase size={24} /></div>
            <div className="hr-reg-feature-text">
              <h3>Smart Dashboards</h3>
              <p>Advanced tracking for your recruitment pipeline and candidate progress.</p>
            </div>
          </div>
          
          <div className="hr-reg-feature-item">
            <div className="hr-reg-feature-icon"><FileText size={24} /></div>
            <div className="hr-reg-feature-text">
              <h3>In-depth Analytics</h3>
              <p>Detailed performance reports and skill analytics for every candidate.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Form Side */}
      <div className="hr-reg-form-side">
        <div className="hr-reg-card">
          <header className="hr-reg-header">
            <h2>Partner Registration</h2>
            <p>Create your professional HR account to get started</p>
          </header>

          {message && (
            <div className="hr-reg-alert success">
              <CheckCircle size={20} />
              <span>{message}</span>
            </div>
          )}

          {error && (
            <div className="hr-reg-alert error">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="hr-reg-grid">
              {/* Personal Info */}
              <div className="hr-reg-field full">
                <label>Full Name</label>
                <div style={{position: 'relative'}}>
                  <User size={18} style={{position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8'}} />
                  <input
                    type="text"
                    name="fullName"
                    className="hr-reg-input"
                    style={{paddingLeft: '40px'}}
                    placeholder="e.g. John Doe"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="hr-reg-field">
                <label>Email Address</label>
                <div style={{position: 'relative'}}>
                  <Mail size={18} style={{position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8'}} />
                  <input
                    type="email"
                    name="email"
                    className="hr-reg-input"
                    style={{paddingLeft: '40px'}}
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="hr-reg-field">
                <label>Phone Number</label>
                <div style={{position: 'relative'}}>
                  <Phone size={18} style={{position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8'}} />
                  <input
                    type="text"
                    name="phoneNumber"
                    className="hr-reg-input"
                    style={{paddingLeft: '40px'}}
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="hr-reg-field">
                <label>Password</label>
                <div style={{position: 'relative'}}>
                  <Lock size={18} style={{position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8'}} />
                  <input
                    type="password"
                    name="password"
                    className="hr-reg-input"
                    style={{paddingLeft: '40px'}}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="hr-reg-field">
                <label>Confirm Password</label>
                <div style={{position: 'relative'}}>
                  <Lock size={18} style={{position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8'}} />
                  <input
                    type="password"
                    name="confirmPassword"
                    className="hr-reg-input"
                    style={{paddingLeft: '40px'}}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Company Info */}
              <div className="hr-reg-field">
                <label>Company Name</label>
                <div style={{position: 'relative'}}>
                  <Building2 size={18} style={{position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8'}} />
                  <input
                    type="text"
                    name="companyName"
                    className="hr-reg-input"
                    style={{paddingLeft: '40px'}}
                    placeholder="VirtueHire Inc."
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="hr-reg-field">
                <label>Job Title</label>
                <div style={{position: 'relative'}}>
                  <Briefcase size={18} style={{position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8'}} />
                  <input
                    type="text"
                    name="jobTitle"
                    className="hr-reg-input"
                    style={{paddingLeft: '40px'}}
                    placeholder="Talent Acquisition"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="hr-reg-field">
                <label>Company Website</label>
                <div style={{position: 'relative'}}>
                  <Globe size={18} style={{position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8'}} />
                  <input
                    type="text"
                    name="companyWebsite"
                    className="hr-reg-input"
                    style={{paddingLeft: '40px'}}
                    placeholder="https://..."
                    value={formData.companyWebsite}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="hr-reg-field">
                <label>Industry</label>
                <input
                  type="text"
                  name="industry"
                  className="hr-reg-input"
                  placeholder="e.g. Technology"
                  value={formData.industry}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Location */}
              <div className="hr-reg-field">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  className="hr-reg-input"
                  placeholder="Mumbai"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="hr-reg-field">
                <label>State</label>
                <input
                  type="text"
                  name="state"
                  className="hr-reg-input"
                  placeholder="Maharashtra"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* ID Proof */}
              <div className="hr-reg-field full">
                <label>ID Proof (Identity Verification)</label>
                <label className="hr-reg-file-upload">
                  <input
                    type="file"
                    name="idProof"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={handleFileChange}
                    required
                  />
                  <div className="hr-reg-file-content">
                    <Upload className="hr-reg-file-icon" size={32} />
                    {formData.idProof ? (
                      <span style={{color: '#3b82f6', fontWeight: '600'}}>{formData.idProof.name}</span>
                    ) : (
                      <span>Drop your ID proof here or click to browse</span>
                    )}
                    <span style={{fontSize: '12px'}}>Accepted: JPG, PNG, PDF (Max: 5MB)</span>
                  </div>
                </label>
              </div>
            </div>

            <button type="submit" className="hr-reg-submit-btn" disabled={loading}>
              {loading ? (
                <>Processing...</>
              ) : (
                <>
                  Register as Partner <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <footer className="hr-reg-footer">
            Already a partner? <Link to="/login">Sign In here</Link>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default HRRegistration;
