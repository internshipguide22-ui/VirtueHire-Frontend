import React from "react";
import { useNavigate } from "react-router-dom";
import { User, Users, Shield } from "lucide-react";

function LandingPage() {
  const navigate = useNavigate();

  const handleClick = (role) => {
    if (role === "Candidate") {
      navigate("/candidate/login");
    }

    if (role === "HR") {
      navigate("/hrs/login");
    }

    if (role === "Admin") {
      navigate("/admin/login");
    }
  };

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    margin: '0 !important',
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    overflow: 'auto'
  };

  const leftSideStyle = {
    display: 'flex',
    flexDirection: 'column',
    color: 'white',
    maxWidth: '450px',
    marginRight: '80px'
  };

  const titleStyle = {
    fontSize: '3.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: 'white !important'
  };

  const subtitleStyle = {
    fontSize: '1.25rem',
    marginBottom: '2rem',
    color: 'rgba(255, 255, 255, 0.9)'
  };

  const featureItemStyle = {
    display: 'flex',
    alignItems: 'start',
    gap: '15px',
    marginBottom: '20px'
  };

  const checkmarkStyle = {
    fontSize: '1.5rem',
    color: 'white'
  };

  const featureTitleStyle = {
    fontWeight: '600',
    fontSize: '1.125rem',
    color: 'white'
  };

  const cardStyle = {
    background: 'white',
    borderRadius: '16px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    padding: '40px',
    width: '100%',
    maxWidth: '450px'
  };

  const cardTitleStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '0.5rem'
  };

  const cardSubtitleStyle = {
    color: '#6b7280',
    marginBottom: '2rem'
  };

  const buttonContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  };

  const primaryButtonStyle = {
    width: '100%',
    background: '#4f46e5',
    color: 'white',
    fontWeight: '600',
    padding: '16px 24px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    fontSize: '1.125rem',
    boxShadow: '0 4px 6px rgba(79, 70, 229, 0.3)',
    transition: 'all 0.2s'
  };

  const secondaryButtonStyle = {
    width: '100%',
    background: 'white',
    color: '#1f2937',
    fontWeight: '600',
    padding: '16px 24px',
    borderRadius: '8px',
    border: '2px solid #d1d5db',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    fontSize: '1.125rem',
    transition: 'all 0.2s'
  };

  return (
    <div style={containerStyle}>
      {/* Left Side - Branding */}
      <div style={leftSideStyle}>
        <h1 style={titleStyle}>VirtueHire</h1>
        <p style={subtitleStyle}>
          Empowering Talent, Enabling Success
        </p>

        <div>
          <div style={featureItemStyle}>
            <div style={checkmarkStyle}>✓</div>
            <div>
              <h3 style={featureTitleStyle}>Smart Recruitment Solutions</h3>
            </div>
          </div>

          <div style={featureItemStyle}>
            <div style={checkmarkStyle}>✓</div>
            <div>
              <h3 style={featureTitleStyle}>AI-Powered Matching</h3>
            </div>
          </div>

          <div style={featureItemStyle}>
            <div style={checkmarkStyle}>✓</div>
            <div>
              <h3 style={featureTitleStyle}>Seamless Hiring Process</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Role Selection Card */}
      <div style={cardStyle}>
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={cardTitleStyle}>Welcome Back</h2>
          <p style={cardSubtitleStyle}>Sign in to continue to VirtueHire</p>
        </div>

        <div style={buttonContainerStyle}>
          <button
            onClick={() => handleClick("Candidate")}
            style={primaryButtonStyle}
            onMouseOver={(e) => e.currentTarget.style.background = '#4338ca'}
            onMouseOut={(e) => e.currentTarget.style.background = '#4f46e5'}
          >
            <User size={24} />
            <span>Candidate</span>
          </button>

          <button
            onClick={() => handleClick("HR")}
            style={secondaryButtonStyle}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#f9fafb';
              e.currentTarget.style.borderColor = '#9ca3af';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.borderColor = '#d1d5db';
            }}
          >
            <Users size={24} />
            <span>HR</span>
          </button>

          <button
            onClick={() => handleClick("Admin")}
            style={secondaryButtonStyle}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#f9fafb';
              e.currentTarget.style.borderColor = '#9ca3af';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.borderColor = '#d1d5db';
            }}
          >
            <Shield size={24} />
            <span>Admin</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
