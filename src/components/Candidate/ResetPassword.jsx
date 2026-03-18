// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import "./CandidateLogin.css";

// const ResetPassword = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const queryParams = new URLSearchParams(location.search);
//   const emailFromLink = queryParams.get("email");

//   const [email, setEmail] = useState(emailFromLink || "");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (!emailFromLink) {
//       setError("Invalid or missing email in reset link.");
//     }
//   }, [emailFromLink]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     setError("");

//     if (password !== confirmPassword) {
//       setError("Passwords do not match!");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:8081/api/candidates/reset-password", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, newPassword: password }),
//       });

//       if (response.ok) {
//         setMessage("✅ Password successfully updated!");
//         setTimeout(() => navigate("/candidate-login"), 2000);
//       } else {
//         setError("❌ Failed to reset password.");
//       }
//     } catch (err) {
//       setError("⚠️ Something went wrong.");
//     }
//   };

//   return (
//     <div className="login-body">
//       <form className="login-form" onSubmit={handleSubmit}>
//         <h2>Reset Password</h2>

//         {message && <div className="success-msg">{message}</div>}
//         {error && <div className="error-msg">{error}</div>}

//         <label>Email</label>
//         <input type="email" value={email} readOnly className="readonly-email" />

//         <label>New Password</label>
//         <input
//           type="password"
//           placeholder="Enter new password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         <label>Confirm Password</label>
//         <input
//           type="password"
//           placeholder="Confirm password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           required
//         />

//         <button type="submit">Update Password</button>

//         <p>
//           <a href="/candidate-login">🔙 Back to Login</a>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default ResetPassword;



// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import "../NewComponents/candi/login.css";

// const ResetPassword = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const queryParams = new URLSearchParams(location.search);
//   const emailFromLink = queryParams.get("email");

//   const [email, setEmail] = useState(emailFromLink || "");
//   const [code, setCode] = useState(""); // 🔹 new state for reset code
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (!emailFromLink) {
//       setError("Invalid or missing email in reset link.");
//     }
//   }, [emailFromLink]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     setError("");

//     if (password !== confirmPassword) {
//       setError("Passwords do not match!");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:8081/api/candidates/reset-password", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, code, newPassword: password }), // 🔹 include code
//       });

//       if (response.ok) {
//         setMessage("✅ Password successfully updated!");
//         setTimeout(() => navigate("/candidate-login"), 2000);
//       } else {
//         const data = await response.json();
//         setError(data.message || "❌ Failed to reset password.");
//       }
//     } catch (err) {
//       setError("⚠️ Something went wrong.");
//     }
//   };

//   return (
//     <div className="login-body">
//       <form className="login-form" onSubmit={handleSubmit}>
//         <h2>Reset Password</h2>

//         {message && <div className="success-msg">{message}</div>}
//         {error && <div className="error-msg">{error}</div>}

//         <label>Email</label>
//         <input type="email" value={email} readOnly className="readonly-email" />

//         {/* 🔹 New field for the reset code */}
//         <label>Enter Reset Code</label>
//         <input
//           type="text"
//           placeholder="Enter the code you received via email"
//           value={code}
//           onChange={(e) => setCode(e.target.value)}
//           required
//         />

//         <label>New Password</label>
//         <input
//           type="password"
//           placeholder="Enter new password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         <label>Confirm Password</label>
//         <input
//           type="password"
//           placeholder="Confirm password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           required
//         />

//         <button type="submit">Update Password</button>

//         <p>
//           <a href="/candidate-login">🔙 Back to Login</a>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default ResetPassword;


// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import "../NewComponents/candi/login.css";

// const ResetPassword = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const queryParams = new URLSearchParams(location.search);
//   const emailFromLink = queryParams.get("email");

//   const [email, setEmail] = useState(emailFromLink || "");
//   const [code, setCode] = useState(""); 
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (!emailFromLink) {
//       setError("Invalid or missing email in reset link.");
//     }
//   }, [emailFromLink]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     setError("");

//     if (password !== confirmPassword) {
//       setError("Passwords do not match!");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:8081/api/candidates/reset-password", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, code, newPassword: password }),
//       });

//       if (response.ok) {
//         setMessage("✅ Password successfully updated!");
//         setTimeout(() => navigate("/candidate-login"), 2000);
//       } else {
//         const data = await response.json();
//         setError(data.message || "❌ Failed to reset password.");
//       }
//     } catch (err) {
//       setError("⚠️ Something went wrong.");
//     }
//   };

//   // Inline style for better visibility of read-only email
//   const emailInputStyle = {
//     width: "100%",
//     padding: "12px",
//     borderRadius: "8px",
//     border: "1px solid #d1d5db",
//     backgroundColor: "#f9fafb",
//     color: "#1f2937",
//     marginBottom: "16px",
//     boxSizing: "border-box"
//   };

//   const inputStyle = {
//     width: "100%",
//     padding: "12px",
//     borderRadius: "8px",
//     border: "1px solid #d1d5db",
//     marginBottom: "16px",
//     boxSizing: "border-box"
//   };

//   const buttonStyle = {
//     width: "100%",
//     padding: "14px",
//     backgroundColor: "#4f46e5",
//     color: "white",
//     fontWeight: "600",
//     border: "none",
//     borderRadius: "8px",
//     cursor: "pointer",
//     marginTop: "10px"
//   };

//   return (
//     <div className="login-body">
//       <form className="login-form" onSubmit={handleSubmit}>
//         <h2>Reset Password</h2>

//         {message && <div className="success-msg">{message}</div>}
//         {error && <div className="error-msg">{error}</div>}

//         <label>Email</label>
//         <input
//           type="email"
//           value={email}
//           readOnly
//           style={emailInputStyle}
//         />

//         <label>Enter Reset Code</label>
//         <input
//           type="text"
//           placeholder="Enter the code you received via email"
//           value={code}
//           onChange={(e) => setCode(e.target.value)}
//           required
//           style={inputStyle}
//         />

//         <label>New Password</label>
//         <input
//           type="password"
//           placeholder="Enter new password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           style={inputStyle}
//         />

//         <label>Confirm Password</label>
//         <input
//           type="password"
//           placeholder="Confirm password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           required
//           style={inputStyle}
//         />

//         <button type="submit" style={buttonStyle}>Update Password</button>

//         <p style={{ marginTop: "16px", textAlign: "center" }}>
//           <a href="/candidate-login">🔙 Back to Login</a>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default ResetPassword;

//mainnn workingggggggg
// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import "../NewComponents/candi/login.css";

// const ResetPassword = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const queryParams = new URLSearchParams(location.search);
//   const emailFromLink = queryParams.get("email");

//   const [email, setEmail] = useState(emailFromLink || "");
//   const [code, setCode] = useState(""); 
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (!emailFromLink) {
//       setError("Invalid or missing email in reset link.");
//     }
//   }, [emailFromLink]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     setError("");

//     if (password !== confirmPassword) {
//       setError("Passwords do not match!");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:8081/api/candidates/reset-password", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, code, newPassword: password }),
//       });

//       if (response.ok) {
//         setMessage("✅ Password successfully updated!");
//         setTimeout(() => navigate("/candidate-login"), 2000);
//       } else {
//         const data = await response.json();
//         setError(data.message || "❌ Failed to reset password.");
//       }
//     } catch (err) {
//       setError("⚠️ Something went wrong.");
//     }
//   };

//   // Common style for all inputs
//   const inputStyle = {
//     width: "100%",
//     padding: "12px",
//     borderRadius: "8px",
//     border: "1px solid #d1d5db",
//     backgroundColor: "#ffffff",
//     color: "#1f2937",
//     marginBottom: "16px",
//     boxSizing: "border-box"
//   };

//   return (
//     <div className="login-body">
//       <form className="login-form" onSubmit={handleSubmit}>
//         <h2>Reset Password</h2>

//         {message && <div className="success-msg">{message}</div>}
//         {error && <div className="error-msg">{error}</div>}

//         <label>Email</label>
//         <input 
//           type="email" 
//           value={email} 
//           readOnly 
//           style={{ ...inputStyle, cursor: "not-allowed" }} 
//         />

//         <label>Enter Reset Code</label>
//         <input
//           type="text"
//           placeholder="Enter the code you received via email"
//           value={code}
//           onChange={(e) => setCode(e.target.value)}
//           required
//           style={inputStyle}
//         />

//         <label>New Password</label>
//         <input
//           type="password"
//           placeholder="Enter new password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           style={inputStyle}
//         />

//         <label>Confirm Password</label>
//         <input
//           type="password"
//           placeholder="Confirm password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           required
//           style={inputStyle}
//         />

//         <button 
//           type="submit"
//           style={{
//             width: "100%",
//             padding: "14px",
//             backgroundColor: "#4f46e5",
//             color: "#ffffff",
//             border: "none",
//             borderRadius: "8px",
//             cursor: "pointer",
//             fontWeight: "600",
//             fontSize: "1rem",
//             marginBottom: "16px",
//             transition: "all 0.2s"
//           }}
//           onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#4338ca"}
//           onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#4f46e5"}
//         >
//           Update Password
//         </button>

//         <p style={{ textAlign: "center" }}>
//           <a href="/candidate-login" style={{ color: "#4f46e5", textDecoration: "none", fontWeight: "600" }}>
//             🔙 Back to Login
//           </a>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default ResetPassword;


import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const styles = `
  .auth-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f3f4f6;
    padding: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    position: relative;
  }

  .auth-form-wrapper {
    width: 100%;
    max-width: 420px;
    background-color: #ffffff;
    padding: 40px 32px;
    border-radius: 12px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  }

  .auth-back-button {
    position: absolute;
    top: 30px;
    left: 30px;
    padding: 8px 16px;
    background-color: transparent;
    color: #ef4444;
    border: 1.5px solid #ef4444;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }

  .auth-back-button:hover {
    background-color: #fef2f2;
  }

  .auth-title {
    font-size: 28px;
    font-weight: 700;
    color: #1f2937;
    margin: 0 0 8px 0;
  }

  .auth-subtitle {
    font-size: 14px;
    color: #6b7280;
    margin: 8px 0 32px 0;
  }

  .auth-form {
    display: flex;
    flex-direction: column;
  }

  .auth-form-group {
    margin-bottom: 20px;
  }

  .auth-label {
    display: block;
    font-size: 14px;
    font-weight: 600;
    color: #374151;
    margin-bottom: 8px;
  }

  .auth-input {
    width: 100%;
    padding: 12px 14px;
    font-size: 14px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    background-color: #ffffff;
    color: #1f2937;
    box-sizing: border-box;
    transition: border-color 0.2s;
    outline: none;
  }

  .auth-input:focus {
    border-color: #4f46e5;
  }

  .auth-input-readonly {
    background-color: #f3f4f6;
    cursor: not-allowed;
  }

  .auth-submit-button {
    width: 100%;
    padding: 12px 16px;
    margin-top: 8px;
    margin-bottom: 16px;
    background-color: #4f46e5;
    color: #ffffff;
    border: none;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .auth-submit-button:hover {
    background-color: #4338ca;
  }

  .auth-submit-button:active {
    background-color: #3730a3;
  }

  .auth-success-msg {
    padding: 12px 16px;
    margin-bottom: 16px;
    background-color: #dcfce7;
    color: #166534;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
  }

  .auth-error-msg {
    padding: 12px 16px;
    margin-bottom: 16px;
    background-color: #fee2e2;
    color: #991b1b;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
  }

  .auth-bottom-text {
    text-align: center;
    font-size: 14px;
    color: #6b7280;
    margin: 0;
  }

  .auth-link {
    color: #4f46e5;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.2s;
  }

  .auth-link:hover {
    color: #4338ca;
  }

  @media (max-width: 480px) {
    .auth-form-wrapper {
      padding: 32px 20px;
    }

    .auth-title {
      font-size: 24px;
    }

    .auth-back-button {
      top: 20px;
      left: 20px;
    }
  }
`;

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const emailFromLink = queryParams.get("email");

  const [email, setEmail] = useState(emailFromLink || "");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!emailFromLink) {
      setError("Invalid or missing email in reset link.");
    }
  }, [emailFromLink]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8081/api/candidates/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code, newPassword: password }),
      });

      if (response.ok) {
        setMessage("✅ Password successfully updated!");
        setTimeout(() => navigate("/candidate-login"), 2000);
      } else {
        const data = await response.json();
        setError(data.message || "❌ Failed to reset password.");
      }
    } catch (err) {
      setError("⚠️ Something went wrong.");
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="auth-container">
        <button 
          onClick={() => window.history.back()}
          className="auth-back-button"
        >
          ← Back
        </button>

        <div className="auth-form-wrapper">
          <h1 className="auth-title">Reset Password</h1>
          <p className="auth-subtitle">Create your new password</p>

          {message && <div className="auth-success-msg">{message}</div>}
          {error && <div className="auth-error-msg">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-form-group">
              <label className="auth-label">Email</label>
              <input
                type="email"
                value={email}
                readOnly
                className="auth-input auth-input-readonly"
              />
            </div>

            <div className="auth-form-group">
              <label className="auth-label">Reset Code</label>
              <input
                type="text"
                placeholder="Enter the code you received via email"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                className="auth-input"
              />
            </div>

            <div className="auth-form-group">
              <label className="auth-label">New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="auth-input"
              />
            </div>

            <div className="auth-form-group">
              <label className="auth-label">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="auth-input"
              />
            </div>

            <button type="submit" className="auth-submit-button">
              Update Password
            </button>
          </form>

          <p className="auth-bottom-text">
            <a href="/candidate-login" className="auth-link">Back to Login</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
