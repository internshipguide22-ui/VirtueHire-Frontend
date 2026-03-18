// import React, { useState } from "react";
// import "../NewComponents/candi/login.css";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     setError("");

//     try {
//       const response = await fetch("http://localhost:8081/api/candidates/forgot-password", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email }),
//       });

//       if (response.ok) {
//         setMessage("✅ Reset link sent to your email!");
//       } else {
//         setError("❌ Email not found!");
//       }
//     } catch (err) {
//       setError("⚠️ Error sending email. Try again.");
//     }
//   };

//   return (
//     <div className="login-body">
//       <form className="login-form" onSubmit={handleSubmit}>
//         <h2>Forgot Password</h2>

//         {message && <div className="success-msg">{message}</div>}
//         {error && <div className="error-msg">{error}</div>}

//         <label>Enter your registered email</label>
//         <input
//           type="email"
//           placeholder="example@gmail.com"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />

//         <button type="submit">Send Reset Link</button>

//         <p>
//           <a href="/candidate-login">🔙 Back to Login</a>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default ForgotPassword;


//main workingggggggggg
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../NewComponents/candi/login.css";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     setError("");

//     try {
//       const response = await fetch("http://localhost:8081/api/candidates/forgot-password", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email }),
//       });

//       if (response.ok) {
//         setMessage("✅ Reset link sent to your email!");
//         // Redirect to reset password page with email as query parameter
//         setTimeout(() => {
//           navigate(`/reset-password?email=${encodeURIComponent(email)}`);
//         }, 1500); // 1.5s delay to show success message
//       } else {
//         setError("❌ Email not found!");
//       }
//     } catch (err) {
//       setError("⚠️ Error sending email. Try again.");
//     }
//   };

//   return (
//     <div className="login-body">
//       <form className="login-form" onSubmit={handleSubmit}>
//         <h2>Forgot Password</h2>

//         {message && <div className="success-msg">{message}</div>}
//         {error && <div className="error-msg">{error}</div>}

//         <label>Enter your registered email</label>
//         <input
//           type="email"
//           placeholder="example@gmail.com"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           style={{ padding: '10px', borderRadius: '5px', border: '1px solid #d1d5db' }}
//         />

//         <button type="submit">Send Reset Link</button>

//         <p>
//           <a href="/candidate-login">🔙 Back to Login</a>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default ForgotPassword;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await fetch("http://localhost:8081/api/candidates/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage("✅ Reset link sent to your email!");
        setTimeout(() => {
          navigate(`/reset-password?email=${encodeURIComponent(email)}`);
        }, 1500);
      } else {
        setError("❌ Email not found!");
      }
    } catch (err) {
      setError("⚠️ Error sending email. Try again.");
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
          <h1 className="auth-title">Forgot Password</h1>
          <p className="auth-subtitle">Enter your email to receive a reset link</p>

          {message && <div className="auth-success-msg">{message}</div>}
          {error && <div className="auth-error-msg">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-form-group">
              <label className="auth-label">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="auth-input"
              />
            </div>

            <button type="submit" className="auth-submit-button">
              Send Reset Link
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

export default ForgotPassword;
