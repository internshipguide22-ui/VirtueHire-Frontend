// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../services/api";

// export default function CandidateWelcome() {
//   const navigate = useNavigate();
//   const [candidate, setCandidate] = useState({});
//   const [attemptedLevels, setAttemptedLevels] = useState([]);
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(true); 
//   const [profileSrc, setProfileSrc] = useState("/images/default-profile.png"); // ✅ State-controlled image

//   useEffect(() => {
//     const storedCandidate = localStorage.getItem("candidate");
//     if (!storedCandidate) {
//       navigate("/candidates/login");
//       return;
//     }

//     let parsedCandidate;
//     try {
//       parsedCandidate = JSON.parse(storedCandidate);
//     } catch (err) {
//       console.error("Invalid JSON in localStorage:", err);
//       localStorage.removeItem("candidate");
//       navigate("/candidates/login");
//       return;
//     }

//     setCandidate(parsedCandidate);
//     if (parsedCandidate.profilePic) {
//       setProfileSrc(`/uploads/${parsedCandidate.profilePic}`);
//     }

//     fetchAssessmentData(parsedCandidate.id);
//   }, [navigate]);

//   const fetchAssessmentData = async (candidateId) => {
//     try {
//       const res = await api.get(`/api/assessment/results/${candidateId}`);
//       setResults(res.data.results || []);
//       setAttemptedLevels(res.data.attemptedLevels || []);
//     } catch (error) {
//       console.error("Error loading results:", error);
//       setResults([]);
//       setAttemptedLevels([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/candidates/login");
//   };

//   const handleAssessmentClick = (level) => {
//     if (attemptedLevels.includes(level)) return;
//     navigate(`/assessment/level/${level}`);
//   };

//   if (loading) {
//     return (
//       <div
//         style={{
//           textAlign: "center",
//           marginTop: "120px",
//           fontFamily: "Arial, sans-serif",
//         }}
//       >
//         <h2>Loading your assessment details...</h2>
//       </div>
//     );
//   }

//   return (
//     <div style={styles.body}>
//       <div style={styles.container}>
//         {/* Profile Section */}
//         <div style={styles.profileSection}>
//           <img
//             src={profileSrc} // ✅ Use state-controlled src
//             alt="Profile"
//             style={styles.profilePic}
//             onError={() => setProfileSrc("/images/default-profile.png")}
//           />

//           {candidate.badge === "Java Expert" ? (
//             <div style={{ marginTop: "10px", textAlign: "center" }}>
//               <img
//                 src="/images/java-expert-badge.jpg"
//                 alt="Java Expert Badge"
//                 style={{
//                   width: "80px",
//                   height: "auto",
//                   borderRadius: "8px",
//                   boxShadow: "0 0 8px rgba(255, 215, 0, 0.8)",
//                 }}
//               />
//             </div>
//           ) : candidate.badge ? (
//             <p style={styles.badgeText}>{candidate.badge}</p>
//           ) : null}
//         </div>

//         <div style={{ textAlign: "center", marginBottom: "20px" }}>
//           <h2>Welcome, {candidate.fullName || candidate.email}</h2>
//           <p>Email: {candidate.email}</p>
//         </div>

//         <div style={{ textAlign: "center", marginBottom: "20px" }}>
//           {[1, 2, 3].map((level) => (
//             <button
//               key={level}
//               onClick={() => handleAssessmentClick(level)}
//               style={
//                 attemptedLevels.includes(level)
//                   ? { ...styles.btn, ...styles.btnCompleted }
//                   : { ...styles.btn, ...styles.btnAssessment }
//               }
//             >
//               {attemptedLevels.includes(level)
//                 ? `Level ${level} Completed`
//                 : `Level ${level} Assessment`}
//             </button>
//           ))}
//         </div>

//         <h3>Assessment Results</h3>
//         <table style={styles.table}>
//           <thead>
//             <tr>
//               <th>Level</th>
//               <th>Score</th>
//               <th>Date & Time</th>
//             </tr>
//           </thead>
//           <tbody>
//             {results.length > 0 ? (
//               results.map((res, index) => (
//                 <tr key={index}>
//                   <td>{res.level}</td>
//                   <td>{res.score}%</td>
//                   <td>{new Date(res.attemptedAt).toLocaleString()}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="3">No results found</td>
//               </tr>
//             )}
//           </tbody>
//         </table>

//         <div style={{ textAlign: "center" }}>
//           <button
//             onClick={handleLogout}
//             style={{ ...styles.btn, ...styles.btnLogout }}
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   body: {
//     fontFamily: "Arial, sans-serif",
//     backgroundColor: "#f4f7f8",
//     margin: 0,
//     padding: "20px",
//   },
//   container: {
//     backgroundColor: "#fff",
//     padding: "30px 40px",
//     borderRadius: "12px",
//     boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
//     maxWidth: "800px",
//     margin: "auto",
//   },
//   profileSection: {
//     textAlign: "center",
//     marginBottom: "20px",
//   },
//   profilePic: {
//     width: "100px",
//     height: "100px",
//     borderRadius: "50%",
//     objectFit: "cover",
//     border: "2px solid #4CAF50",
//   },
//   badgeText: {
//     marginTop: "10px",
//     display: "inline-block",
//     backgroundColor: "#FFD700",
//     color: "#333",
//     padding: "4px 10px",
//     borderRadius: "12px",
//     fontWeight: "bold",
//     fontSize: "0.9em",
//   },
//   btn: {
//     display: "inline-block",
//     margin: "5px",
//     padding: "10px 20px",
//     borderRadius: "6px",
//     fontWeight: "bold",
//     transition: "0.3s",
//     border: "none",
//     cursor: "pointer",
//   },
//   btnLogout: {
//     backgroundColor: "#4CAF50",
//     color: "white",
//     marginTop: "20px",
//   },
//   btnAssessment: {
//     backgroundColor: "#2196F3",
//     color: "white",
//   },
//   btnCompleted: {
//     backgroundColor: "#aaa",
//     color: "#fff",
//     cursor: "not-allowed",
//   },
//   table: {
//     width: "100%",
//     borderCollapse: "collapse",
//     marginTop: "20px",
//   },
// };



// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../services/api";

// export default function CandidateWelcome() {
//   const navigate = useNavigate();
//   const [candidate, setCandidate] = useState({});
//   const [attemptedLevels, setAttemptedLevels] = useState([]);
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [profileSrc, setProfileSrc] = useState("/images/default-profile.png");

//   useEffect(() => {
//     const storedCandidate = localStorage.getItem("candidate");
//     if (!storedCandidate) {
//       navigate("/candidates/login");
//       return;
//     }

//     let parsedCandidate;
//     try {
//       parsedCandidate = JSON.parse(storedCandidate);
//     } catch (err) {
//       console.error("Invalid JSON in localStorage:", err);
//       localStorage.removeItem("candidate");
//       navigate("/candidates/login");
//       return;
//     }

//     setCandidate(parsedCandidate);

//     // Set profile image
//     if (parsedCandidate.profilePic) {
//       setProfileSrc(`/uploads/${parsedCandidate.profilePic}`);
//     }

//     // Fetch assessment results
//     fetchAssessmentData(parsedCandidate.id);
//   }, [navigate]);

//   const fetchAssessmentData = async (candidateId) => {
//     try {
//       const res = await api.get(`/api/assessment/results/${candidateId}`);
//       setResults(res.data.results || []);
//       setAttemptedLevels(
//         (res.data.results || []).map((r) => r.level)
//       );
//     } catch (error) {
//       console.error("Error loading results:", error);
//       setResults([]);
//       setAttemptedLevels([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/candidates/login");
//   };

//   const handleAssessmentClick = (level) => {
//     if (attemptedLevels.includes(level)) return;
//     navigate(`/assessment/level/${level}`);
//   };

//   if (loading) {
//     return (
//       <div
//         style={{
//           textAlign: "center",
//           marginTop: "120px",
//           fontFamily: "Arial, sans-serif",
//         }}
//       >
//         <h2>Loading your assessment details...</h2>
//       </div>
//     );
//   }

//   return (
//     <div style={styles.body}>
//       <div style={styles.container}>
//         {/* Profile Section */}
//         <div style={styles.profileSection}>
//           <img
//             src={profileSrc}
//             alt="Profile"
//             style={styles.profilePic}
//             onError={() => setProfileSrc("/images/default-profile.png")}
//           />

//           {candidate.badge === "Java Expert" ? (
//             <div style={{ marginTop: "10px", textAlign: "center" }}>
//               <img
//                 src="/images/java-expert-badge.jpg"
//                 alt="Java Expert Badge"
//                 style={{
//                   width: "80px",
//                   height: "auto",
//                   borderRadius: "8px",
//                   boxShadow: "0 0 8px rgba(255, 215, 0, 0.8)",
//                 }}
//               />
//             </div>
//           ) : candidate.badge ? (
//             <p style={styles.badgeText}>{candidate.badge}</p>
//           ) : null}
//         </div>

//         <div style={{ textAlign: "center", marginBottom: "20px" }}>
//           <h2>Welcome, {candidate.fullName || candidate.email}</h2>
//           <p>Email: {candidate.email}</p>
//         </div>

//         <div style={{ textAlign: "center", marginBottom: "20px" }}>
//           {[1, 2, 3].map((level) => (
//             <button
//               key={level}
//               onClick={() => handleAssessmentClick(level)}
//               style={
//                 attemptedLevels.includes(level)
//                   ? { ...styles.btn, ...styles.btnCompleted }
//                   : { ...styles.btn, ...styles.btnAssessment }
//               }
//             >
//               {attemptedLevels.includes(level)
//                 ? `Level ${level} Completed`
//                 : `Level ${level} Assessment`}
//             </button>
//           ))}
//         </div>

//         <h3>Assessment Results</h3>
//         <table style={styles.table}>
//           <thead>
//             <tr>
//               <th>Level</th>
//               <th>Score</th>
//               <th>Date & Time</th>
//             </tr>
//           </thead>
//           <tbody>
//             {results.length > 0 ? (
//               results.map((res, index) => (
//                 <tr key={index}>
//                   <td>{res.level}</td>
//                   <td>{res.score}%</td>
//                   <td>{new Date(res.attemptedAt).toLocaleString()}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="3">No results found</td>
//               </tr>
//             )}
//           </tbody>
//         </table>

//         <div style={{ textAlign: "center" }}>
//           <button
//             onClick={handleLogout}
//             style={{ ...styles.btn, ...styles.btnLogout }}
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   body: { fontFamily: "Arial, sans-serif", backgroundColor: "#f4f7f8", margin: 0, padding: "20px" },
//   container: {
//     backgroundColor: "#fff",
//     padding: "30px 40px",
//     borderRadius: "12px",
//     boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
//     maxWidth: "800px",
//     margin: "auto",
//   },
//   profileSection: { textAlign: "center", marginBottom: "20px" },
//   profilePic: { width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover", border: "2px solid #4CAF50" },
//   badgeText: { marginTop: "10px", display: "inline-block", backgroundColor: "#FFD700", color: "#333", padding: "4px 10px", borderRadius: "12px", fontWeight: "bold", fontSize: "0.9em" },
//   btn: { display: "inline-block", margin: "5px", padding: "10px 20px", borderRadius: "6px", fontWeight: "bold", transition: "0.3s", border: "none", cursor: "pointer" },
//   btnLogout: { backgroundColor: "#4CAF50", color: "white", marginTop: "20px" },
//   btnAssessment: { backgroundColor: "#2196F3", color: "white" },
//   btnCompleted: { backgroundColor: "#aaa", color: "#fff", cursor: "not-allowed" },
//   table: { width: "100%", borderCollapse: "collapse", marginTop: "20px" },
// };




// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../services/api";

// export default function CandidateWelcome() {
//   const navigate = useNavigate();
//   const [candidate, setCandidate] = useState({});
//   const [attemptedLevels, setAttemptedLevels] = useState([]);
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [profileSrc, setProfileSrc] = useState("/images/default-profile.png");

//   useEffect(() => {
//     const storedCandidate = localStorage.getItem("candidate");
//     if (!storedCandidate) {
//       navigate("/candidates/login");
//       return;
//     }

//     let parsedCandidate;
//     try {
//       parsedCandidate = JSON.parse(storedCandidate);
//     } catch (err) {
//       console.error("Invalid JSON in localStorage:", err);
//       localStorage.removeItem("candidate");
//       navigate("/candidates/login");
//       return;
//     }

//     setCandidate(parsedCandidate);

//     // Set profile image
//     if (parsedCandidate.profilePic) {
//       setProfileSrc(`/uploads/${parsedCandidate.profilePic}`);
//     }

//     // Fetch assessment results
//     fetchAssessmentData(parsedCandidate.id);
//   }, [navigate]);

//   const fetchAssessmentData = async (candidateId) => {
//     try {
//       const res = await api.get(`/api/assessment/results/${candidateId}`);
//       setResults(res.data.results || []);
//       setAttemptedLevels(
//         (res.data.results || []).map((r) => r.level)
//       );
//     } catch (error) {
//       console.error("Error loading results:", error);
//       setResults([]);
//       setAttemptedLevels([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/candidates/login");
//   };

//   const handleAssessmentClick = (level) => {
//     if (attemptedLevels.includes(level)) return;
//     navigate(`/assessment/level/${level}`);
//   };

//   if (loading) {
//     return (
//       <div
//         style={{
//           textAlign: "center",
//           marginTop: "120px",
//           fontFamily: "Arial, sans-serif",
//         }}
//       >
//         <h2>Loading your assessment details...</h2>
//       </div>
//     );
//   }

//   return (
//     <div style={styles.body}>
//       <div style={styles.container}>
//         {/* Profile Section */}
//         <div style={styles.profileSection}>
//           <img
//             src={profileSrc}
//             alt="Profile"
//             style={styles.profilePic}
//             onError={() => setProfileSrc("/images/default-profile.png")}
//           />

//           {candidate.badge === "Java Expert" ? (
//             <div style={{ marginTop: "10px", textAlign: "center" }}>
//               <img
//                 src="/images/java-expert-badge.jpg"
//                 alt="Java Expert Badge"
//                 style={{
//                   width: "80px",
//                   height: "auto",
//                   borderRadius: "8px",
//                   boxShadow: "0 0 8px rgba(255, 215, 0, 0.8)",
//                 }}
//               />
//             </div>
//           ) : candidate.badge ? (
//             <p style={styles.badgeText}>{candidate.badge}</p>
//           ) : null}
//         </div>

//         <div style={{ textAlign: "center", marginBottom: "20px" }}>
//           <h2>Welcome, {candidate.fullName || candidate.email}</h2>
//           <p>Email: {candidate.email}</p>
//         </div>

//         <div style={{ textAlign: "center", marginBottom: "20px" }}>
//           {[1, 2, 3].map((level) => (
//             <button
//               key={level}
//               onClick={() => handleAssessmentClick(level)}
//               style={
//                 attemptedLevels.includes(level)
//                   ? { ...styles.btn, ...styles.btnCompleted }
//                   : { ...styles.btn, ...styles.btnAssessment }
//               }
//             >
//               {attemptedLevels.includes(level)
//                 ? `Level ${level} Completed`
//                 : `Level ${level} Assessment`}
//             </button>
//           ))}
//         </div>

//         <h3>Assessment Results</h3>
//         <table style={styles.table}>
//           <thead>
//             <tr>
//               <th>Level</th>
//               <th>Score</th>
//             </tr>
//           </thead>
//           <tbody>
//             {results.length > 0 ? (
//               results.map((res, index) => (
//                 <tr key={index}>
//                   <td>{res.level}</td>
//                   <td>{res.score}%</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="2">No results found</td>
//               </tr>
//             )}
//           </tbody>
//         </table>

//         <div style={{ textAlign: "center" }}>
//           <button
//             onClick={handleLogout}
//             style={{ ...styles.btn, ...styles.btnLogout }}
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   body: { fontFamily: "Arial, sans-serif", backgroundColor: "#f4f7f8", margin: 0, padding: "20px" },
//   container: {
//     backgroundColor: "#fff",
//     padding: "30px 40px",
//     borderRadius: "12px",
//     boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
//     maxWidth: "800px",
//     margin: "auto",
//   },
//   profileSection: { textAlign: "center", marginBottom: "20px" },
//   profilePic: { width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover", border: "2px solid #4CAF50" },
//   badgeText: { marginTop: "10px", display: "inline-block", backgroundColor: "#FFD700", color: "#333", padding: "4px 10px", borderRadius: "12px", fontWeight: "bold", fontSize: "0.9em" },
//   btn: { display: "inline-block", margin: "5px", padding: "10px 20px", borderRadius: "6px", fontWeight: "bold", transition: "0.3s", border: "none", cursor: "pointer" },
//   btnLogout: { backgroundColor: "#4CAF50", color: "white", marginTop: "20px" },
//   btnAssessment: { backgroundColor: "#2196F3", color: "white" },
//   btnCompleted: { backgroundColor: "#aaa", color: "#fff", cursor: "not-allowed" },
//   table: { width: "100%", borderCollapse: "collapse", marginTop: "20px" },
// };








// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../services/api";

// export default function CandidateWelcome() {
//   const navigate = useNavigate();
//   const [candidate, setCandidate] = useState({});
//   const [attemptedLevels, setAttemptedLevels] = useState([]);
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [profileSrc, setProfileSrc] = useState("/images/default-profile.png");

//   useEffect(() => {
//     const storedCandidate = localStorage.getItem("candidate");
//     if (!storedCandidate) {
//       navigate("/candidates/login");
//       return;
//     }

//     let parsedCandidate;
//     try {
//       parsedCandidate = JSON.parse(storedCandidate);
//     } catch (err) {
//       console.error("Invalid JSON in localStorage:", err);
//       localStorage.removeItem("candidate");
//       navigate("/candidates/login");
//       return;
//     }

//     setCandidate(parsedCandidate);

//     // Set profile image
//    if (parsedCandidate.profilePic) {
//     setProfileSrc(`https://backend.virtuehire.in/uploads/${parsedCandidate.profilePic}`);
// }

//     // Fetch assessment results including badge
//     fetchAssessmentData(parsedCandidate.id);
//   }, [navigate]);

//   const fetchAssessmentData = async (candidateId) => {
//     try {
//       const res = await api.get(`/api/assessment/results/${candidateId}`);
//       const resultsData = res.data.results || [];
//       setResults(resultsData);
//       setAttemptedLevels(resultsData.map((r) => r.level));

//       // Update badge if returned from backend
//       if (res.data.badge) {
//         setCandidate((prev) => ({ ...prev, badge: res.data.badge }));
//       }
//     } catch (error) {
//       console.error("Error loading results:", error);
//       setResults([]);
//       setAttemptedLevels([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/candidates/login");
//   };

//   const handleAssessmentClick = (level) => {
//     if (attemptedLevels.includes(level)) return;
//     navigate(`/assessment/level/${level}`);
//   };

//   if (loading) {
//     return (
//       <div style={{ textAlign: "center", marginTop: "120px", fontFamily: "Arial, sans-serif" }}>
//         <h2>Loading your assessment details...</h2>
//       </div>
//     );
//   }

//   return (
//     <div style={styles.body}>
//       <div style={styles.container}>
//         {/* Profile Section */}
//         <div style={styles.profileSection}>
//           <img
//             src={profileSrc}
//             alt="Profile"
//             style={styles.profilePic}
//             onError={() => setProfileSrc("/images/default-profile.png")}
//           />

//           {candidate.badge === "Java Expert" ? (
//             <div style={{ marginTop: "10px", textAlign: "center" }}>
//               <img
//                 src="/images/java-expert-badge.jpg"
//                 alt="Java Expert Badge"
//                 style={{
//                   width: "80px",
//                   height: "auto",
//                   borderRadius: "8px",
//                   boxShadow: "0 0 8px rgba(255, 215, 0, 0.8)",
//                 }}
//               />
//             </div>
//           ) : candidate.badge ? (
//             <p style={styles.badgeText}>{candidate.badge}</p>
//           ) : null}
//         </div>

//         <div style={{ textAlign: "center", marginBottom: "20px" }}>
//           <h2>Welcome, {candidate.fullName || candidate.email}</h2>
//           <p>Email: {candidate.email}</p>
//         </div>

//         <div style={{ textAlign: "center", marginBottom: "20px" }}>
//           {[1, 2, 3].map((level) => (
//             <button
//               key={level}
//               onClick={() => handleAssessmentClick(level)}
//               style={
//                 attemptedLevels.includes(level)
//                   ? { ...styles.btn, ...styles.btnCompleted }
//                   : { ...styles.btn, ...styles.btnAssessment }
//               }
//             >
//               {attemptedLevels.includes(level)
//                 ? `Level ${level} Completed`
//                 : `Level ${level} Assessment`}
//             </button>
//           ))}
//         </div>
// {/* 
//         <h3>Assessment Results</h3>
//         <table style={styles.table}>
//           <thead>
//             <tr>
//               <th>Level</th>
//               <th>Score</th>
//             </tr>
//           </thead>
//           <tbody>
//             {results.length > 0 ? (
//               results.map((res, index) => (
//                 <tr key={index}>
//                   <td>{res.level}</td>
//                   <td>{res.score}%</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="2">No results found</td>
//               </tr>
//             )}
//           </tbody>
//         </table> */}

//         <div style={{ textAlign: "center" }}>
//           <button
//             onClick={handleLogout}
//             style={{ ...styles.btn, ...styles.btnLogout }}
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   body: { fontFamily: "Arial, sans-serif", backgroundColor: "#f4f7f8", margin: 0, padding: "20px" },
//   container: {
//     backgroundColor: "#fff",
//     padding: "30px 40px",
//     borderRadius: "12px",
//     boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
//     maxWidth: "800px",
//     margin: "auto",
//   },
//   profileSection: { textAlign: "center", marginBottom: "20px" },
//   profilePic: { width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover", border: "2px solid #4CAF50" },
//   badgeText: { marginTop: "10px", display: "inline-block", backgroundColor: "#FFD700", color: "#333", padding: "4px 10px", borderRadius: "12px", fontWeight: "bold", fontSize: "0.9em" },
//   btn: { display: "inline-block", margin: "5px", padding: "10px 20px", borderRadius: "6px", fontWeight: "bold", transition: "0.3s", border: "none", cursor: "pointer" },
//   btnLogout: { backgroundColor: "#4CAF50", color: "white", marginTop: "20px" },
//   btnAssessment: { backgroundColor: "#2196F3", color: "white" },
//   btnCompleted: { backgroundColor: "#aaa", color: "#fff", cursor: "not-allowed" },
//   table: { width: "100%", borderCollapse: "collapse", marginTop: "20px" },
// };




// import React, { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom"; // ✅ Added useLocation
// import api from "../../services/api";

// export default function CandidateWelcome() {
//   const navigate = useNavigate();
//   const location = useLocation(); // ✅ Get navigation state
//   const [candidate, setCandidate] = useState({});
//   const [attemptedLevels, setAttemptedLevels] = useState([]);
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [profileSrc, setProfileSrc] = useState("/images/default-profile.png");

//   useEffect(() => {
//     const storedCandidate = localStorage.getItem("candidate");
//     if (!storedCandidate) {
//       navigate("/candidates/login");
//       return;
//     }

//     let parsedCandidate;
//     try {
//       parsedCandidate = JSON.parse(storedCandidate);
//     } catch (err) {
//       console.error("Invalid JSON in localStorage:", err);
//       localStorage.removeItem("candidate");
//       navigate("/candidates/login");
//       return;
//     }

//     setCandidate(parsedCandidate);

//     // Set profile image
//     if (parsedCandidate.profilePic) {
//       setProfileSrc(`https://backend.virtuehire.in/uploads/${parsedCandidate.profilePic}`);
//     }

//     // ✅ Always fetch latest assessment data to refresh badge
//     fetchAssessmentData(parsedCandidate.id);

//   }, [navigate, location.state]); // ✅ Added location.state to dependency

//   const fetchAssessmentData = async (candidateId) => {
//     try {
//       const res = await api.get(`/api/assessment/results/${candidateId}`);
//       const resultsData = res.data.results || [];
//       setResults(resultsData);
//       setAttemptedLevels(resultsData.map((r) => r.level));

//       // Update badge if returned from backend
//       if (res.data.badge) {
//         setCandidate((prev) => ({ ...prev, badge: res.data.badge }));
//       }
//     } catch (error) {
//       console.error("Error loading results:", error);
//       setResults([]);
//       setAttemptedLevels([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/candidates/login");
//   };

//   const handleAssessmentClick = (level) => {
//     if (attemptedLevels.includes(level)) return;
//     navigate(`/assessment/level/${level}`);
//   };

//   if (loading) {
//     return (
//       <div style={{ textAlign: "center", marginTop: "120px", fontFamily: "Arial, sans-serif" }}>
//         <h2>Loading your assessment details...</h2>
//       </div>
//     );
//   }

//   return (
//     <div style={styles.body}>
//       <div style={styles.container}>
//         {/* Profile Section */}
//         <div style={styles.profileSection}>
//           <img
//             src={profileSrc}
//             alt="Profile"
//             style={styles.profilePic}
//             onError={() => setProfileSrc("/images/default-profile.png")}
//           />

//           {candidate.badge === "Java Expert" ? (
//             <div style={{ marginTop: "10px", textAlign: "center" }}>
//               <img
//                 src="/images/java-expert-badge.jpg"
//                 alt="Java Expert Badge"
//                 style={{
//                   width: "80px",
//                   height: "auto",
//                   borderRadius: "8px",
//                   boxShadow: "0 0 8px rgba(255, 215, 0, 0.8)",
//                 }}
//               />
//             </div>
//           ) : candidate.badge ? (
//             <p style={styles.badgeText}>{candidate.badge}</p>
//           ) : null}
//         </div>

//         <div style={{ textAlign: "center", marginBottom: "20px" }}>
//           <h2>Welcome, {candidate.fullName || candidate.email}</h2>
//           <p>Email: {candidate.email}</p>
//         </div>

//         <div style={{ textAlign: "center", marginBottom: "20px" }}>
//           {[1, 2, 3].map((level) => (
//             <button
//               key={level}
//               onClick={() => handleAssessmentClick(level)}
//               style={
//                 attemptedLevels.includes(level)
//                   ? { ...styles.btn, ...styles.btnCompleted }
//                   : { ...styles.btn, ...styles.btnAssessment }
//               }
//             >
//               {attemptedLevels.includes(level)
//                 ? `Level ${level} Completed`
//                 : `Level ${level} Assessment`}
//             </button>
//           ))}
//         </div>

//         <div style={{ textAlign: "center" }}>
//           <button
//             onClick={handleLogout}
//             style={{ ...styles.btn, ...styles.btnLogout }}
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   body: { fontFamily: "Arial, sans-serif", backgroundColor: "#f4f7f8", margin: 0, padding: "20px" },
//   container: {
//     backgroundColor: "#fff",
//     padding: "30px 40px",
//     borderRadius: "12px",
//     boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
//     maxWidth: "800px",
//     margin: "auto",
//   },
//   profileSection: { textAlign: "center", marginBottom: "20px" },
//   profilePic: { width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover", border: "2px solid #4CAF50" },
//   badgeText: { marginTop: "10px", display: "inline-block", backgroundColor: "#FFD700", color: "#333", padding: "4px 10px", borderRadius: "12px", fontWeight: "bold", fontSize: "0.9em" },
//   btn: { display: "inline-block", margin: "5px", padding: "10px 20px", borderRadius: "6px", fontWeight: "bold", transition: "0.3s", border: "none", cursor: "pointer" },
//   btnLogout: { backgroundColor: "#4CAF50", color: "white", marginTop: "20px" },
//   btnAssessment: { backgroundColor: "#2196F3", color: "white" },
//   btnCompleted: { backgroundColor: "#aaa", color: "#fff", cursor: "not-allowed" },
//   table: { width: "100%", borderCollapse: "collapse", marginTop: "20px" },
// };



//MAINNNNNNNNNNNNNNNNNNNNNNNN
// import React, { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom"; // ✅ Added useLocation
// import api from "../../services/api";

// export default function CandidateWelcome() {
//   const navigate = useNavigate();
//   const location = useLocation(); // ✅ Get navigation state
//   const [candidate, setCandidate] = useState({});
//   const [attemptedLevels, setAttemptedLevels] = useState([]);
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [profileSrc, setProfileSrc] = useState("/images/default-profile.png");

//   useEffect(() => {
//     const storedCandidate = localStorage.getItem("candidate");
//     if (!storedCandidate) {
//       navigate("/candidates/login");
//       return;
//     }

//     let parsedCandidate;
//     try {
//       parsedCandidate = JSON.parse(storedCandidate);
//     } catch (err) {
//       console.error("Invalid JSON in localStorage:", err);
//       localStorage.removeItem("candidate");
//       navigate("/candidates/login");
//       return;
//     }

//     setCandidate(parsedCandidate);

//     // Set profile image
//     if (parsedCandidate.profilePic) {
//       setProfileSrc(`https://backend.virtuehire.in/uploads/${parsedCandidate.profilePic}`);
//     }

//     // ✅ Always fetch latest assessment data to refresh badge
//     fetchAssessmentData(parsedCandidate.id);

//   }, [navigate, location.state]); // ✅ Added location.state to dependency

//   const fetchAssessmentData = async (candidateId) => {
//     try {
//       const res = await api.get(`/api/assessment/results/${candidateId}`);
//       const resultsData = res.data.results || [];
//       setResults(resultsData);
//       setAttemptedLevels(resultsData.map((r) => r.level));

//       // Update badge if returned from backend
//       if (res.data.badge) {
//         setCandidate((prev) => ({ ...prev, badge: res.data.badge }));
//       }
//     } catch (error) {
//       console.error("Error loading results:", error);
//       setResults([]);
//       setAttemptedLevels([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/candidates/login");
//   };

//   const handleAssessmentClick = (level) => {
//     if (attemptedLevels.includes(level)) return;
//     navigate(`/assessment/level/${level}`);
//   };

//   if (loading) {
//     return (
//       <div style={{ textAlign: "center", marginTop: "120px", fontFamily: "Arial, sans-serif" }}>
//         <h2>Loading your assessment details...</h2>
//       </div>
//     );
//   }

//   return (
//     <div style={styles.body}>
//       <div style={styles.container}>
//         {/* Profile Section with badge overlay */}
//         <div style={styles.profileSection}>
//           <div style={{ position: "relative", display: "inline-block" }}>
//             <img
//               src={profileSrc}
//               alt="Profile"
//               style={styles.profilePic}
//               onError={() => setProfileSrc("/images/default-profile.png")}
//             />

//             {/* ✅ Badge overlay at top-right corner */}
//             {candidate.badge && (
//               <img
//                 src="/images/java-expert-badge.jpg" // You can make this dynamic based on badge type
//                 alt={candidate.badge}
//                 style={{
//                   position: "absolute",
//                   top: "-5px",
//                   right: "-5px",
//                   width: "35px",
//                   height: "35px",
//                   borderRadius: "50%",
//                   border: "2px solid white",
//                   boxShadow: "0 0 6px rgba(0,0,0,0.3)",
//                 }}
//               />
//             )}
//           </div>
//         </div>

//         <div style={{ textAlign: "center", marginBottom: "20px" }}>
//           <h2>Welcome, {candidate.fullName || candidate.email}</h2>
//           <p>Email: {candidate.email}</p>
//         </div>

//         <div style={{ textAlign: "center", marginBottom: "20px" }}>
//           {[1, 2, 3].map((level) => (
//             <button
//               key={level}
//               onClick={() => handleAssessmentClick(level)}
//               style={
//                 attemptedLevels.includes(level)
//                   ? { ...styles.btn, ...styles.btnCompleted }
//                   : { ...styles.btn, ...styles.btnAssessment }
//               }
//             >
//               {attemptedLevels.includes(level)
//                 ? `Level ${level} Completed`
//                 : `Level ${level} Assessment`}
//             </button>
//           ))}
//         </div>

//         <div style={{ textAlign: "center" }}>
//           <button
//             onClick={handleLogout}
//             style={{ ...styles.btn, ...styles.btnLogout }}
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   body: { fontFamily: "Arial, sans-serif", backgroundColor: "#f4f7f8", margin: 0, padding: "20px" },
//   container: {
//     backgroundColor: "#fff",
//     padding: "30px 40px",
//     borderRadius: "12px",
//     boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
//     maxWidth: "800px",
//     margin: "auto",
//   },
//   profileSection: { textAlign: "center", marginBottom: "20px" },
//   profilePic: { width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover", border: "2px solid #4CAF50" },
//   btn: { display: "inline-block", margin: "5px", padding: "10px 20px", borderRadius: "6px", fontWeight: "bold", transition: "0.3s", border: "none", cursor: "pointer" },
//   btnLogout: { backgroundColor: "#4CAF50", color: "white", marginTop: "20px" },
//   btnAssessment: { backgroundColor: "#2196F3", color: "white" },
//   btnCompleted: { backgroundColor: "#aaa", color: "#fff", cursor: "not-allowed" },
// };




// import React, { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import api from "../../services/api";
// import "../NewComponents/candi/CandidateProfile.css";
// // Using your blue UI CSS

// export default function CandidateWelcome() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [candidate, setCandidate] = useState({});
//   const [formData, setFormData] = useState({});
//   const [isEditing, setIsEditing] = useState(false);
//   const [attemptedLevels, setAttemptedLevels] = useState([]);
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [profileSrc, setProfileSrc] = useState("/images/default-profile.png");

//   useEffect(() => {
//     const storedCandidate = localStorage.getItem("candidate");
//     if (!storedCandidate) {
//       navigate("/candidates/login");
//       return;
//     }

//     let parsedCandidate;
//     try {
//       parsedCandidate = JSON.parse(storedCandidate);
//     } catch (err) {
//       console.error("Invalid JSON in localStorage:", err);
//       localStorage.removeItem("candidate");
//       navigate("/candidates/login");
//       return;
//     }

//     setCandidate(parsedCandidate);
//     setFormData(parsedCandidate);

//     if (parsedCandidate.profilePic) {
//       setProfileSrc(`https://backend.virtuehire.in/uploads/${parsedCandidate.profilePic}`);
//     }

//     fetchAssessmentData(parsedCandidate.id);
//   }, [navigate, location.state]);

//   const fetchAssessmentData = async (candidateId) => {
//     try {
//       const res = await api.get(`/api/assessment/results/${candidateId}`);
//       const resultsData = res.data.results || [];
//       setResults(resultsData);
//       setAttemptedLevels(resultsData.map((r) => r.level));

//       if (res.data.badge) {
//         setCandidate((prev) => ({ ...prev, badge: res.data.badge }));
//       }
//     } catch (error) {
//       console.error("Error loading results:", error);
//       setResults([]);
//       setAttemptedLevels([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSave = () => {
//     setCandidate(formData);
//     localStorage.setItem("candidate", JSON.stringify(formData));
//     setIsEditing(false);
//   };

//   const formatSkills = (skills) => {
//     if (Array.isArray(skills)) return skills.join(", ");
//     if (typeof skills === "string") return skills;
//     return "";
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/candidates/login");
//   };

//   const handleAssessmentClick = (level) => {
//     if (attemptedLevels.includes(level)) return;
//     navigate(`/assessment/level/${level}`);
//   };

//   if (loading) {
//     return (
//       <div style={{ textAlign: "center", marginTop: "120px", fontFamily: "Arial, sans-serif" }}>
//         <h2>Loading your assessment details...</h2>
//       </div>
//     );
//   }

//   return (
//     <div className="profile-container">
//       <div className="profile-card">
//         {/* Profile Header */}
//         <div className="profile-header">
//           <h1>
//             👋 Welcome, <span>{candidate.firstName} {candidate.lastName}</span>
//           </h1>
//           <button
//             onClick={() => setIsEditing(!isEditing)}
//             className="edit-btn"
//           >
//             {isEditing ? "Cancel" : "Edit Profile"}
//           </button>
//         </div>

//         {/* Profile Image & Badge */}
//         <div style={{ textAlign: "center", marginBottom: "20px" }}>
//           <div style={{ position: "relative", display: "inline-block" }}>
//             <img
//               src={profileSrc}
//               alt="Profile"
//               style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover", border: "2px solid #4CAF50" }}
//               onError={() => setProfileSrc("/images/default-profile.png")}
//             />
//             {candidate.badge && (
//               <img
//                 src="/images/java-expert-badge.jpg"
//                 alt={candidate.badge}
//                 style={{
//                   position: "absolute",
//                   top: "-5px",
//                   right: "-5px",
//                   width: "35px",
//                   height: "35px",
//                   borderRadius: "50%",
//                   border: "2px solid white",
//                   boxShadow: "0 0 6px rgba(0,0,0,0.3)",
//                 }}
//               />
//             )}
//           </div>
//         </div>

//         {/* Profile Details */}
//         <div className="profile-details">
//           {["email", "mobile", "college", "passoutYear", "experience", "skills"].map((field) => (
//             <div className="detail-item" key={field}>
//               <strong>{field === "passoutYear" ? "Passout Year" : field.charAt(0).toUpperCase() + field.slice(1)}:</strong>
//               {isEditing ? (
//                 <input
//                   type="text"
//                   name={field}
//                   value={field === "skills" ? formatSkills(formData.skills) : formData[field] || ""}
//                   onChange={(e) => {
//                     if (field === "skills") {
//                       setFormData({ ...formData, skills: e.target.value.split(",").map(s => s.trim()) });
//                     } else {
//                       handleChange(e);
//                     }
//                   }}
//                 />
//               ) : (
//                 <span>{field === "skills" ? formatSkills(candidate.skills) : candidate[field]}</span>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Save Button */}
//         {isEditing && (
//           <button className="save-btn" onClick={handleSave}>
//             💾 Save Changes
//           </button>
//         )}

//         {/* Assessment Buttons */}
//         <div style={{ textAlign: "center", marginTop: "20px" }}>
//           {[1, 2, 3].map((level) => (
//             <button
//               key={level}
//               onClick={() => handleAssessmentClick(level)}
//               style={{
//                 display: "inline-block",
//                 margin: "5px",
//                 padding: "10px 20px",
//                 borderRadius: "6px",
//                 fontWeight: "bold",
//                 transition: "0.3s",
//                 border: "none",
//                 cursor: attemptedLevels.includes(level) ? "not-allowed" : "pointer",
//                 backgroundColor: attemptedLevels.includes(level) ? "#aaa" : "#2196F3",
//                 color: "#fff",
//               }}
//             >
//               {attemptedLevels.includes(level) ? `Level ${level} Completed` : `Level ${level} Assessment`}
//             </button>
//           ))}
//         </div>

//         {/* Logout Button */}
//         <div style={{ textAlign: "center", marginTop: "20px" }}>
//           <button
//             onClick={handleLogout}
//             style={{
//               display: "inline-block",
//               margin: "5px",
//               padding: "10px 20px",
//               borderRadius: "6px",
//               fontWeight: "bold",
//               transition: "0.3s",
//               border: "none",
//               cursor: "pointer",
//               backgroundColor: "#4CAF50",
//               color: "#fff",
//             }}
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }




//MAINNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNnn



// import React, { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import api from "../../services/api";
// import "../NewComponents/candi/CandidateProfile.css";
// // Using your blue UI CSS

// export default function CandidateWelcome() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [candidate, setCandidate] = useState({});
//   const [formData, setFormData] = useState({});
//   const [isEditing, setIsEditing] = useState(false);
//   const [attemptedLevels, setAttemptedLevels] = useState([]);
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [profileSrc, setProfileSrc] = useState("/images/default-profile.png");

//   useEffect(() => {
//     const storedCandidate = localStorage.getItem("candidate");
//     if (!storedCandidate) {
//       navigate("/candidates/login");
//       return;
//     }

//     let parsedCandidate;
//     try {
//       parsedCandidate = JSON.parse(storedCandidate);
//     } catch (err) {
//       console.error("Invalid JSON in localStorage:", err);
//       localStorage.removeItem("candidate");
//       navigate("/candidates/login");
//       return;
//     }

//     setCandidate(parsedCandidate);
//     setFormData(parsedCandidate);

//     if (parsedCandidate.profilePic) {
//       setProfileSrc(`https://backend.virtuehire.in/uploads/${parsedCandidate.profilePic}`);
//     }

//     fetchAssessmentData(parsedCandidate.id);
//   }, [navigate, location.state]);

// const fetchAssessmentData = async (candidateId) => {
//   try {
//     // ✅ Call the correct endpoint — no candidateId in URL
//     const res = await api.get(`/api/assessment/results`, { withCredentials: true });

//     // ✅ Since backend returns list directly, no `res.data.results`
//     const resultsData = res.data || [];

//     // ✅ Store results and attempted levels
//     setResults(resultsData);
//     setAttemptedLevels(resultsData.map((r) => r.level));

//     // ✅ (Optional) If you later add badge info to backend, handle it gracefully
//     if (res.data.badge) {
//       setCandidate((prev) => ({ ...prev, badge: res.data.badge }));
//     }
//   } catch (error) {
//     console.error("Error loading results:", error);
//     setResults([]);
//     setAttemptedLevels([]);
//   } finally {
//     setLoading(false);
//   }
// };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSave = () => {
//     setCandidate(formData);
//     localStorage.setItem("candidate", JSON.stringify(formData));
//     setIsEditing(false);
//   };

//   const formatSkills = (skills) => {
//     if (Array.isArray(skills)) return skills.join(", ");
//     if (typeof skills === "string") return skills;
//     return "";
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/candidates/login");
//   };

//   const handleAssessmentClick = (level) => {
//     if (attemptedLevels.includes(level)) return;
//     navigate(`/assessment/level/${level}`);
//   };

//   if (loading) {
//     return (
//       <div style={{ textAlign: "center", marginTop: "120px", fontFamily: "Arial, sans-serif" }}>
//         <h2>Loading your assessment details...</h2>
//       </div>
//     );
//   }

//   // Mapping frontend field names to backend
//   const fieldMap = {
//     email: "email",
//     mobile: "phoneNumber",
//     // alternateMobile: "alternatePhoneNumber",
//     college: "collegeUniversity",
//     passoutYear: "yearOfGraduation",
//     experience: "experience",
//     skills: "skills"
//   };

//   return (
//     <div className="profile-container">
//       <div className="profile-card">
//         {/* Profile Header */}
//         <div className="profile-header">
//           <h1>
//             👋 Welcome, <span>{candidate.fullName}</span>
//           </h1>
//           <button
//             onClick={() => setIsEditing(!isEditing)}
//             className="edit-btn"
//           >
//             {isEditing ? "Cancel" : "Edit Profile"}
//           </button>
//         </div>

//         {/* Profile Image & Badge */}
//         <div style={{ textAlign: "center", marginBottom: "20px" }}>
//           <div style={{ position: "relative", display: "inline-block" }}>
//             <img
//               src={profileSrc}
//               alt="Profile"
//               style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover", border: "2px solid #4CAF50" }}
//               onError={() => setProfileSrc("/images/default-profile.png")}
//             />
//             {candidate.badge && (
//               <img
//                 src="/images/java-expert-badge.jpg"
//                 alt={candidate.badge}
//                 style={{
//                   position: "absolute",
//                   top: "-5px",
//                   right: "-5px",
//                   width: "35px",
//                   height: "35px",
//                   borderRadius: "50%",
//                   border: "2px solid white",
//                   boxShadow: "0 0 6px rgba(0,0,0,0.3)",
//                 }}
//               />
//             )}
//           </div>
//         </div>

//         {/* Profile Details */}
//         <div className="profile-details">
//           {Object.keys(fieldMap).map((field) => (
//             <div className="detail-item" key={field}>
//               <strong>{field === "passoutYear" ? "Passout Year" : field.charAt(0).toUpperCase() + field.slice(1)}:</strong>
//               {isEditing ? (
//                 <input
//                   type="text"
//                   name={fieldMap[field]}
//                   value={field === "skills" ? formatSkills(formData.skills) : formData[fieldMap[field]] || ""}
//                   onChange={(e) => {
//                     if (field === "skills") {
//                       setFormData({ ...formData, skills: e.target.value.split(",").map(s => s.trim()) });
//                     } else {
//                       handleChange(e);
//                     }
//                   }}
//                 />
//               ) : (
//                 <span>{field === "skills" ? formatSkills(candidate.skills) : candidate[fieldMap[field]]}</span>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Save Button */}
//         {isEditing && (
//           <button className="save-btn" onClick={handleSave}>
//             💾 Save Changes
//           </button>
//         )}

//         {/* Assessment Buttons */}
//         <div style={{ textAlign: "center", marginTop: "20px" }}>
//           {[1, 2, 3].map((level) => (
//             <button
//               key={level}
//               onClick={() => handleAssessmentClick(level)}
//               style={{
//                 display: "inline-block",
//                 margin: "5px",
//                 padding: "10px 20px",
//                 borderRadius: "6px",
//                 fontWeight: "bold",
//                 transition: "0.3s",
//                 border: "none",
//                 cursor: attemptedLevels.includes(level) ? "not-allowed" : "pointer",
//                 backgroundColor: attemptedLevels.includes(level) ? "#aaa" : "#2196F3",
//                 color: "#fff",
//               }}
//             >
//               {attemptedLevels.includes(level) ? `Level ${level} Completed` : `Level ${level} Assessment`}
//             </button>
//           ))}
//         </div>


// {/* 🔹 Previous Assessment Results Section */}
// {results.length > 0 && (
//   <div
//     style={{
//       marginTop: "30px",
//       backgroundColor: "rgba(255,255,255,0.05)",
//       padding: "15px",
//       borderRadius: "10px",
//       textAlign: "center",
//     }}
//   >
//     <h3 style={{ color: "#fff", marginBottom: "10px" }}>📊 Previous Assessment Results</h3>

//     <table
//       style={{
//         width: "100%",
//         borderCollapse: "collapse",
//         color: "#fff",
//         fontSize: "14px",
//       }}
//     >
//       <thead>
//         <tr style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
//           <th style={{ padding: "8px", border: "1px solid rgba(255,255,255,0.2)" }}>Level</th>
//           <th style={{ padding: "8px", border: "1px solid rgba(255,255,255,0.2)" }}>Score</th>
//           <th style={{ padding: "8px", border: "1px solid rgba(255,255,255,0.2)" }}>Status</th>
//           <th style={{ padding: "8px", border: "1px solid rgba(255,255,255,0.2)" }}>Date</th>
//         </tr>
//       </thead>
//       <tbody>
//         {results.map((r, i) => (
//           <tr key={i}>
//             <td style={{ padding: "8px", border: "1px solid rgba(255,255,255,0.2)" }}>{r.level}</td>
//             <td style={{ padding: "8px", border: "1px solid rgba(255,255,255,0.2)" }}>{r.score}</td>
//             <td
//               style={{
//                 padding: "8px",
//                 border: "1px solid rgba(255,255,255,0.2)",
//                 color: r.score >= 50 ? "limegreen" : "tomato",
//                 fontWeight: "bold",
//               }}
//             >
//               {r.score >= 50 ? "Passed" : "Failed"}
//             </td>
//             <td style={{ padding: "8px", border: "1px solid rgba(255,255,255,0.2)" }}>
//               {new Date(r.attemptedAt).toLocaleDateString()}
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// )}

//         {/* Logout Button */}
//         <div style={{ textAlign: "center", marginTop: "20px" }}>
//           <button
//             onClick={handleLogout}
//             style={{
//               display: "inline-block",
//               margin: "5px",
//               padding: "10px 20px",
//               borderRadius: "6px",
//               fontWeight: "bold",
//               transition: "0.3s",
//               border: "none",
//               cursor: "pointer",
//               backgroundColor: "#4CAF50",
//               color: "#fff",
//             }}
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



// import React, { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import api from "../../services/api";
// import "../NewComponents/candi/CandidateProfile.css";

// export default function CandidateWelcome() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [candidate, setCandidate] = useState({});
//   const [formData, setFormData] = useState({});
//   const [isEditing, setIsEditing] = useState(false);
//   const [attemptedLevels, setAttemptedLevels] = useState([]);
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [profileSrc, setProfileSrc] = useState("/images/default-profile.png");

//   useEffect(() => {
//     const storedCandidate = localStorage.getItem("candidate");
//     if (!storedCandidate) {
//       navigate("/candidates/login");
//       return;
//     }

//     let parsedCandidate;
//     try {
//       parsedCandidate = JSON.parse(storedCandidate);
//     } catch (err) {
//       console.error("Invalid JSON in localStorage:", err);
//       localStorage.removeItem("candidate");
//       navigate("/candidates/login");
//       return;
//     }

//     setCandidate(parsedCandidate);
//     setFormData(parsedCandidate);

//     if (parsedCandidate.profilePic) {
//       setProfileSrc(`https://backend.virtuehire.in/uploads/${parsedCandidate.profilePic}`);
//     }

//     fetchAssessmentData(parsedCandidate.id);
//   }, [navigate, location.state]);

//   const fetchAssessmentData = async (candidateId) => {
//     try {
//       const res = await api.get(`/api/assessment/results`, { withCredentials: true });
//       const resultsData = res.data || [];
//       setResults(resultsData);
//       setAttemptedLevels(resultsData.map((r) => r.level));

//       if (res.data.badge) {
//         setCandidate((prev) => ({ ...prev, badge: res.data.badge }));
//       }
//     } catch (error) {
//       console.error("Error loading results:", error);
//       setResults([]);
//       setAttemptedLevels([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSave = () => {
//     setCandidate(formData);
//     localStorage.setItem("candidate", JSON.stringify(formData));
//     setIsEditing(false);
//   };

//   const formatSkills = (skills) => {
//     if (Array.isArray(skills)) return skills.join(", ");
//     if (typeof skills === "string") return skills;
//     return "";
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/candidates/login");
//   };

//   const handleAssessmentClick = (level) => {
//     if (attemptedLevels.includes(level)) return;
//     navigate(`/assessment/level/${level}`);
//   };

//   const handleViewCourses = () => {
//     navigate("/courses"); // Navigate to Courses Dashboard
//   };

//   if (loading) {
//     return (
//       <div style={{ textAlign: "center", marginTop: "120px", fontFamily: "Arial, sans-serif" }}>
//         <h2>Loading your assessment details...</h2>
//       </div>
//     );
//   }

//   const fieldMap = {
//     email: "email",
//     mobile: "phoneNumber",
//     college: "collegeUniversity",
//     passoutYear: "yearOfGraduation",
//     experience: "experience",
//     skills: "skills"
//   };

//   return (
//     <div className="profile-container">
//       <div className="profile-card">
//         {/* Profile Header */}
//         <div className="profile-header">
//           <h1>
//             👋 Welcome, <span>{candidate.fullName}</span>
//           </h1>
//           <button onClick={() => setIsEditing(!isEditing)} className="edit-btn">
//             {isEditing ? "Cancel" : "Edit Profile"}
//           </button>
//         </div>

//         {/* Profile Image & Badge */}
//         <div style={{ textAlign: "center", marginBottom: "20px" }}>
//           <div style={{ position: "relative", display: "inline-block" }}>
//             <img
//               src={profileSrc}
//               alt="Profile"
//               style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover", border: "2px solid #4CAF50" }}
//               onError={() => setProfileSrc("/images/default-profile.png")}
//             />
//             {candidate.badge && (
//               <img
//                 src="/images/java-expert-badge.jpg"
//                 alt={candidate.badge}
//                 style={{
//                   position: "absolute",
//                   top: "-5px",
//                   right: "-5px",
//                   width: "35px",
//                   height: "35px",
//                   borderRadius: "50%",
//                   border: "2px solid white",
//                   boxShadow: "0 0 6px rgba(0,0,0,0.3)",
//                 }}
//               />
//             )}
//           </div>
//         </div>

//         {/* Profile Details */}
//         <div className="profile-details">
//           {Object.keys(fieldMap).map((field) => (
//             <div className="detail-item" key={field}>
//               <strong>{field === "passoutYear" ? "Passout Year" : field.charAt(0).toUpperCase() + field.slice(1)}:</strong>
//               {isEditing ? (
//                 <input
//                   type="text"
//                   name={fieldMap[field]}
//                   value={field === "skills" ? formatSkills(formData.skills) : formData[fieldMap[field]] || ""}
//                   onChange={(e) => {
//                     if (field === "skills") {
//                       setFormData({ ...formData, skills: e.target.value.split(",").map(s => s.trim()) });
//                     } else {
//                       handleChange(e);
//                     }
//                   }}
//                 />
//               ) : (
//                 <span>{field === "skills" ? formatSkills(candidate.skills) : candidate[fieldMap[field]]}</span>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Save Button */}
//         {isEditing && (
//           <button className="save-btn" onClick={handleSave}>
//             💾 Save Changes
//           </button>
//         )}

//         {/* Assessment Buttons */}
//         <div style={{ textAlign: "center", marginTop: "20px" }}>
//           {[1, 2, 3].map((level) => (
//             <button
//               key={level}
//               onClick={() => handleAssessmentClick(level)}
//               style={{
//                 display: "inline-block",
//                 margin: "5px",
//                 padding: "10px 20px",
//                 borderRadius: "6px",
//                 fontWeight: "bold",
//                 transition: "0.3s",
//                 border: "none",
//                 cursor: attemptedLevels.includes(level) ? "not-allowed" : "pointer",
//                 backgroundColor: attemptedLevels.includes(level) ? "#aaa" : "#2196F3",
//                 color: "#fff",
//               }}
//             >
//               {attemptedLevels.includes(level) ? `Level ${level} Completed` : `Level ${level} Assessment`}
//             </button>
//           ))}
//         </div>

//         {/* View All Courses Button */}
//         <div style={{ textAlign: "center", marginTop: "30px" }}>
//           <button
//             onClick={handleViewCourses}
//             style={{
//               display: "inline-block",
//               padding: "12px 25px",
//               borderRadius: "8px",
//               fontWeight: "bold",
//               backgroundColor: "#ff9800",
//               color: "#fff",
//               border: "none",
//               cursor: "pointer",
//               marginTop: "10px",
//               fontSize: "16px",
//             }}
//           >
//             📚 View All Courses
//           </button>
//         </div>

//         {/* Previous Assessment Results Section */}
//         {results.length > 0 && (
//           <div style={{ marginTop: "30px", backgroundColor: "rgba(255,255,255,0.05)", padding: "15px", borderRadius: "10px", textAlign: "center" }}>
//             <h3 style={{ color: "#fff", marginBottom: "10px" }}>📊 Previous Assessment Results</h3>
//             <table style={{ width: "100%", borderCollapse: "collapse", color: "#fff", fontSize: "14px" }}>
//               <thead>
//                 <tr style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
//                   <th style={{ padding: "8px", border: "1px solid rgba(255,255,255,0.2)" }}>Level</th>
//                   <th style={{ padding: "8px", border: "1px solid rgba(255,255,255,0.2)" }}>Score</th>
//                   <th style={{ padding: "8px", border: "1px solid rgba(255,255,255,0.2)" }}>Status</th>
//                   <th style={{ padding: "8px", border: "1px solid rgba(255,255,255,0.2)" }}>Date</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {results.map((r, i) => (
//                   <tr key={i}>
//                     <td style={{ padding: "8px", border: "1px solid rgba(255,255,255,0.2)" }}>{r.level}</td>
//                     <td style={{ padding: "8px", border: "1px solid rgba(255,255,255,0.2)" }}>{r.score}</td>
//                     <td style={{ padding: "8px", border: "1px solid rgba(255,255,255,0.2)", color: r.score >= 50 ? "limegreen" : "tomato", fontWeight: "bold" }}>
//                       {r.score >= 50 ? "Passed" : "Failed"}
//                     </td>
//                     <td style={{ padding: "8px", border: "1px solid rgba(255,255,255,0.2)" }}>{new Date(r.attemptedAt).toLocaleDateString()}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* Logout Button */}
//         <div style={{ textAlign: "center", marginTop: "20px" }}>
//           <button
//             onClick={handleLogout}
//             style={{
//               display: "inline-block",
//               margin: "5px",
//               padding: "10px 20px",
//               borderRadius: "6px",
//               fontWeight: "bold",
//               transition: "0.3s",
//               border: "none",
//               cursor: "pointer",
//               backgroundColor: "#4CAF50",
//               color: "#fff",
//             }}
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



// import React, { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import api from "../../services/api";
// import "../NewComponents/candi/CandidateProfile.css";

// export default function CandidateWelcome() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [candidate, setCandidate] = useState({});
//   const [formData, setFormData] = useState({});
//   const [isEditing, setIsEditing] = useState(false);
//   const [attemptedLevels, setAttemptedLevels] = useState([]);
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [profileSrc, setProfileSrc] = useState("/images/default-profile.png");
//   const [courses, setCourses] = useState([]); // New: available courses

//   useEffect(() => {
//     const storedCandidate = localStorage.getItem("candidate");
//     if (!storedCandidate) {
//       navigate("/candidates/login");
//       return;
//     }

//     let parsedCandidate;
//     try {
//       parsedCandidate = JSON.parse(storedCandidate);
//     } catch (err) {
//       console.error("Invalid JSON in localStorage:", err);
//       localStorage.removeItem("candidate");
//       navigate("/candidates/login");
//       return;
//     }

//     setCandidate(parsedCandidate);
//     setFormData(parsedCandidate);

//     if (parsedCandidate.profilePic) {
//       setProfileSrc(`https://backend.virtuehire.in/uploads/${parsedCandidate.profilePic}`);
//     }

//     fetchAssessmentData(parsedCandidate.id);
//     fetchCourses(); // Fetch available courses
//   }, [navigate, location.state]);

//   // Fetch assessment results
//   const fetchAssessmentData = async (candidateId) => {
//     try {
//       const res = await api.get(`/api/assessment/results`, { withCredentials: true });
//       const resultsData = res.data || [];
//       setResults(resultsData);
//       setAttemptedLevels(resultsData.map((r) => r.level));

//       if (res.data.badge) {
//         setCandidate((prev) => ({ ...prev, badge: res.data.badge }));
//       }
//     } catch (error) {
//       console.error("Error loading results:", error);
//       setResults([]);
//       setAttemptedLevels([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch available courses from backend
//   const fetchCourses = async () => {
//     try {
//       const res = await api.get("/api/courses", { withCredentials: true });
//       setCourses(res.data || []);
//     } catch (err) {
//       console.error("Failed to fetch courses:", err);
//       setCourses([]);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSave = () => {
//     setCandidate(formData);
//     localStorage.setItem("candidate", JSON.stringify(formData));
//     setIsEditing(false);
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/candidates/login");
//   };

//   // Navigate to assessment page with selected course
//   const handleCourseClick = (courseId) => {
//     navigate(`/assessment/${courseId}/1`); // Start at Level 1
//   };

//   const formatSkills = (skills) => {
//     if (Array.isArray(skills)) return skills.join(", ");
//     if (typeof skills === "string") return skills;
//     return "";
//   };

//   if (loading) {
//     return (
//       <div style={{ textAlign: "center", marginTop: "120px", fontFamily: "Arial, sans-serif" }}>
//         <h2>Loading your assessment details...</h2>
//       </div>
//     );
//   }

//   const fieldMap = {
//     email: "email",
//     mobile: "phoneNumber",
//     college: "collegeUniversity",
//     passoutYear: "yearOfGraduation",
//     experience: "experience",
//     skills: "skills"
//   };

//   return (
//     <div className="profile-container">
//       <div className="profile-card">
//         {/* Profile Header */}
//         <div className="profile-header">
//           <h1>
//             👋 Welcome, <span>{candidate.fullName}</span>
//           </h1>
//           <button onClick={() => setIsEditing(!isEditing)} className="edit-btn">
//             {isEditing ? "Cancel" : "Edit Profile"}
//           </button>
//         </div>

//         {/* Profile Image & Badge */}
//         <div style={{ textAlign: "center", marginBottom: "20px" }}>
//           <div style={{ position: "relative", display: "inline-block" }}>
//             <img
//               src={profileSrc}
//               alt="Profile"
//               style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover", border: "2px solid #4CAF50" }}
//               onError={() => setProfileSrc("/images/default-profile.png")}
//             />
//             {candidate.badge && (
//               <img
//                 src="/images/java-expert-badge.jpg"
//                 alt={candidate.badge}
//                 style={{
//                   position: "absolute",
//                   top: "-5px",
//                   right: "-5px",
//                   width: "35px",
//                   height: "35px",
//                   borderRadius: "50%",
//                   border: "2px solid white",
//                   boxShadow: "0 0 6px rgba(0,0,0,0.3)",
//                 }}
//               />
//             )}
//           </div>
//         </div>

//         {/* Profile Details */}
//         <div className="profile-details">
//           {Object.keys(fieldMap).map((field) => (
//             <div className="detail-item" key={field}>
//               <strong>{field === "passoutYear" ? "Passout Year" : field.charAt(0).toUpperCase() + field.slice(1)}:</strong>
//               {isEditing ? (
//                 <input
//                   type="text"
//                   name={fieldMap[field]}
//                   value={field === "skills" ? formatSkills(formData.skills) : formData[fieldMap[field]] || ""}
//                   onChange={(e) => {
//                     if (field === "skills") {
//                       setFormData({ ...formData, skills: e.target.value.split(",").map(s => s.trim()) });
//                     } else {
//                       handleChange(e);
//                     }
//                   }}
//                 />
//               ) : (
//                 <span>{field === "skills" ? formatSkills(candidate.skills) : candidate[fieldMap[field]]}</span>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Save Button */}
//         {isEditing && (
//           <button className="save-btn" onClick={handleSave}>
//             💾 Save Changes
//           </button>
//         )}

//         {/* Courses Section */}
//         <div style={{ textAlign: "center", marginTop: "25px" }}>
//           <h3 style={{ marginBottom: "15px" }}>📚 Select a Course to Start Assessment</h3>
//           {courses.length === 0 ? (
//             <p>No courses available at the moment.</p>
//           ) : (
//             courses.map((course) => (
//               <button
//                 key={course.id}
//                 onClick={() => handleCourseClick(course.id)}
//                 style={{
//                   display: "inline-block",
//                   margin: "5px",
//                   padding: "10px 20px",
//                   borderRadius: "6px",
//                   fontWeight: "bold",
//                   backgroundColor: "#2196F3",
//                   color: "#fff",
//                   border: "none",
//                   cursor: "pointer",
//                 }}
//               >
//                 {course.name}
//               </button>
//             ))
//           )}
//         </div>

//         {/* Previous Assessment Results */}
//         {results.length > 0 && (
//           <div style={{ marginTop: "30px", backgroundColor: "rgba(255,255,255,0.05)", padding: "15px", borderRadius: "10px", textAlign: "center" }}>
//             <h3 style={{ color: "#fff", marginBottom: "10px" }}>📊 Previous Assessment Results</h3>
//             <table style={{ width: "100%", borderCollapse: "collapse", color: "#fff", fontSize: "14px" }}>
//               <thead>
//                 <tr style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
//                   <th style={{ padding: "8px", border: "1px solid rgba(255,255,255,0.2)" }}>Level</th>
//                   <th style={{ padding: "8px", border: "1px solid rgba(255,255,255,0.2)" }}>Score</th>
//                   <th style={{ padding: "8px", border: "1px solid rgba(255,255,255,0.2)" }}>Status</th>
//                   <th style={{ padding: "8px", border: "1px solid rgba(255,255,255,0.2)" }}>Date</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {results.map((r, i) => (
//                   <tr key={i}>
//                     <td style={{ padding: "8px", border: "1px solid rgba(255,255,255,0.2)" }}>{r.level}</td>
//                     <td style={{ padding: "8px", border: "1px solid rgba(255,255,255,0.2)" }}>{r.score}</td>
//                     <td style={{ padding: "8px", border: "1px solid rgba(255,255,255,0.2)", color: r.score >= 50 ? "limegreen" : "tomato", fontWeight: "bold" }}>
//                       {r.score >= 50 ? "Passed" : "Failed"}
//                     </td>
//                     <td style={{ padding: "8px", border: "1px solid rgba(255,255,255,0.2)" }}>{new Date(r.attemptedAt).toLocaleDateString()}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* Logout Button */}
//         <div style={{ textAlign: "center", marginTop: "20px" }}>
//           <button
//             onClick={handleLogout}
//             style={{
//               display: "inline-block",
//               margin: "5px",
//               padding: "10px 20px",
//               borderRadius: "6px",
//               fontWeight: "bold",
//               transition: "0.3s",
//               border: "none",
//               cursor: "pointer",
//               backgroundColor: "#4CAF50",
//               color: "#fff",
//             }}
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



//new mainnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn
//   import React, { useEffect, useState } from "react";
//   import { useNavigate, useLocation } from "react-router-dom";
//   import api from "../../services/api";
//   import "../NewComponents/candi/CandidateProfile.css";

//   export default function CandidateWelcome() {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const [candidate, setCandidate] = useState({});
//     const [formData, setFormData] = useState({});
//     const [isEditing, setIsEditing] = useState(false);
//     const [attemptedLevels, setAttemptedLevels] = useState([]);
//     const [results, setResults] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [profileSrc, setProfileSrc] = useState("/images/default-profile.png");

//     useEffect(() => {
//       const storedCandidate = localStorage.getItem("candidate");
//       if (!storedCandidate) {
//         navigate("/candidates/login");
//         return;
//       }

//       let parsedCandidate;
//       try {
//         parsedCandidate = JSON.parse(storedCandidate);
//       } catch (err) {
//         console.error("Invalid JSON in localStorage:", err);
//         localStorage.removeItem("candidate");
//         navigate("/candidates/login");
//         return;
//       }

//       setCandidate(parsedCandidate);
//       setFormData(parsedCandidate);

//       if (parsedCandidate.profilePic) {
//         setProfileSrc(`https://backend.virtuehire.in/uploads/${parsedCandidate.profilePic}`);
//       }

//       fetchAssessmentData(parsedCandidate.id);
//     }, [navigate, location.state]);

//     const fetchAssessmentData = async (candidateId) => {
//       try {
//         const res = await api.get(`/assessment/results`, { withCredentials: true });
//         const resultsData = res.data || [];
//         setResults(resultsData);
//         setAttemptedLevels(resultsData.map((r) => r.level));

//         if (res.data.badge) {
//           setCandidate((prev) => ({ ...prev, badge: res.data.badge }));
//         }
//       } catch (error) {
//         console.error("Error loading results:", error);
//         setResults([]);
//         setAttemptedLevels([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     const handleChange = (e) => {
//       setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSave = () => {
//       setCandidate(formData);
//       localStorage.setItem("candidate", JSON.stringify(formData));
//       setIsEditing(false);
//     };

//     const formatSkills = (skills) => {
//       if (Array.isArray(skills)) return skills.join(", ");
//       if (typeof skills === "string") return skills;
//       return "";
//     };

//     const handleLogout = () => {
//       localStorage.clear();
//       navigate("/candidates/login");
//     };

//     const handleAssessmentClick = (level) => {
//       if (attemptedLevels.includes(level)) return;
//       navigate(`/assessment/level/${level}`);
//     };

//     if (loading) {
//       return (
//         <div style={{ textAlign: "center", marginTop: "120px", fontFamily: "Arial, sans-serif" }}>
//           <h2>Loading your assessment details...</h2>
//         </div>
//       );
//     }

//     const fieldMap = {
//       email: "email",
//       mobile: "phoneNumber",
//       college: "collegeUniversity",
//       passoutYear: "yearOfGraduation",
//       experience: "experience",
//       skills: "skills"
//     };

//     return (
//       <div className="profile-container">
//         <div className="profile-card">
//           {/* Profile Header */}
//           <div className="profile-header">
//             <h1>
//               👋 Welcome, <span>{candidate.fullName}</span>
//             </h1>
//             <button onClick={() => setIsEditing(!isEditing)} className="edit-btn">
//               {isEditing ? "Cancel" : "Edit Profile"}
//             </button>
//           </div>

//           {/* Profile Image & Badge */}
//           <div style={{ textAlign: "center", marginBottom: "20px" }}>
//             <div style={{ position: "relative", display: "inline-block" }}>
//               <img
//                 src={profileSrc}
//                 alt="Profile"
//                 style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover", border: "2px solid #4CAF50" }}
//                 onError={() => setProfileSrc("/images/default-profile.png")}
//               />
//               {candidate.badge && (
//                 <img
//                   src="/images/java-expert-badge.jpg"
//                   alt={candidate.badge}
//                   style={{
//                     position: "absolute",
//                     top: "-5px",
//                     right: "-5px",
//                     width: "35px",
//                     height: "35px",
//                     borderRadius: "50%",
//                     border: "2px solid white",
//                     boxShadow: "0 0 6px rgba(0,0,0,0.3)",
//                   }}
//                 />
//               )}
//             </div>
//           </div>

//           {/* Profile Details */}
//           <div className="profile-details">
//             {Object.keys(fieldMap).map((field) => (
//               <div className="detail-item" key={field}>
//                 <strong>{field === "passoutYear" ? "Passout Year" : field.charAt(0).toUpperCase() + field.slice(1)}:</strong>
//                 {isEditing ? (
//                   <input
//                     type="text"
//                     name={fieldMap[field]}
//                     value={field === "skills" ? formatSkills(formData.skills) : formData[fieldMap[field]] || ""}
//                     onChange={(e) => {
//                       if (field === "skills") {
//                         setFormData({ ...formData, skills: e.target.value.split(",").map(s => s.trim()) });
//                       } else {
//                         handleChange(e);
//                       }
//                     }}
//                   />
//                 ) : (
//                   <span>{field === "skills" ? formatSkills(candidate.skills) : candidate[fieldMap[field]]}</span>
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* Save Button */}
//           {isEditing && (
//             <button className="save-btn" onClick={handleSave}>
//               💾 Save Changes
//             </button>
//           )}



//           {/* Take Assessment Button */}
//           <div style={{ textAlign: "center", marginTop: "25px" }}>
//             <button
//               onClick={() => navigate("/courses")}
//               style={{
//                 display: "inline-block",
//                 padding: "12px 25px",
//                 borderRadius: "8px",
//                 fontWeight: "bold",
//                 backgroundColor: "#ff9800",
//                 color: "#fff",
//                 border: "none",
//                 cursor: "pointer",
//                 fontSize: "16px",
//                 marginTop: "10px",
//               }}
//             >
//               🎯 Take Assessment
//             </button>
//           </div>

//           {/* Cumulative Assessment Results */}
// {results.length > 0 && (
//   <div style={{ marginTop: "30px", backgroundColor: "rgba(255,255,255,0.05)", padding: "15px", borderRadius: "10px", textAlign: "center" }}>
//     <h3 style={{ color: "#fff", marginBottom: "10px" }}>📊 Cumulative Assessment Results</h3>

//     {(() => {
//       // Group results by subject
//       const subjects = {};
//       results.forEach(r => {
//         if (!subjects[r.subject]) subjects[r.subject] = [];
//         subjects[r.subject].push(r);
//       });

//       return Object.keys(subjects).map((subject, idx) => {
//         const levels = subjects[subject];
//         // Only show if all 3 levels attempted
//         if (levels.length === 3) {
//           const totalScore = levels.reduce((sum, l) => sum + l.score, 0);
//           const avgScore = Math.round(totalScore / 3); // cumulative percentage
//           const passedAll = levels.every(l => l.score >= 50); // adjust pass criteria if needed
//           return (
//             <div key={idx} style={{ marginBottom: "10px", fontSize: "16px" }}>
//               <strong>{subject}</strong>:{" "}
//               <span style={{ color: passedAll ? "limegreen" : "tomato", fontWeight: "bold" }}>
//                 {avgScore}%
//               </span>
//             </div>
//           );
//         }
//         return null;
//       });
//     })()}
//   </div>
// )}


//           {/* Logout Button */}
//           <div style={{ textAlign: "center", marginTop: "20px" }}>
//             <button
//               onClick={handleLogout}
//               style={{
//                 display: "inline-block",
//                 margin: "5px",
//                 padding: "10px 20px",
//                 borderRadius: "6px",
//                 fontWeight: "bold",
//                 transition: "0.3s",
//                 border: "none",
//                 cursor: "pointer",
//                 backgroundColor: "#4CAF50",
//                 color: "#fff",
//               }}
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }



// import React, { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import api from "../../services/api";
// import "../NewComponents/candi/CandidateProfile.css";

// export default function CandidateWelcome() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [candidate, setCandidate] = useState({});
//   const [formData, setFormData] = useState({});
//   const [isEditing, setIsEditing] = useState(false);
//   const [attemptedLevels, setAttemptedLevels] = useState([]);
//   const [results, setResults] = useState([]);
//   const [cumulativeResults, setCumulativeResults] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [profileSrc, setProfileSrc] = useState("/images/default-profile.png");

//   useEffect(() => {
//     const storedCandidate = localStorage.getItem("candidate");
//     if (!storedCandidate) {
//       navigate("/candidates/login");
//       return;
//     }

//     let parsedCandidate;
//     try {
//       parsedCandidate = JSON.parse(storedCandidate);
//     } catch (err) {
//       console.error("Invalid JSON in localStorage:", err);
//       localStorage.removeItem("candidate");
//       navigate("/candidates/login");
//       return;
//     }

//     setCandidate(parsedCandidate);
//     setFormData(parsedCandidate);

//     if (parsedCandidate.profilePic) {
//       setProfileSrc(`https://backend.virtuehire.in/api/candidates/file/${parsedCandidate.profilePic}`);
//     }

//     fetchAssessmentData(parsedCandidate.id);
//     fetchCumulativeResults(parsedCandidate.id);
//   }, [navigate, location.state]);

//   // Fetch per-level assessment results
//   const fetchAssessmentData = async (candidateId) => {
//     try {
//       const res = await api.get(`/candidates/results`, { withCredentials: true });
//       const resultsData = res.data || [];
//       setResults(resultsData);
//       setAttemptedLevels(resultsData.map((r) => r.level));
//     } catch (error) {
//       console.error("Error loading results:", error);
//       setResults([]);
//       setAttemptedLevels([]);
//     }
//   };

//   // Fetch cumulative results including badges
//   const fetchCumulativeResults = async (candidateId) => {
//     try {
//       const res = await api.get(`/candidates/${candidateId}/cumulative-results`, { withCredentials: true });
//       const data = res.data || [];
//       setCumulativeResults(data);
//     } catch (error) {
//       console.error("Error loading cumulative results:", error);
//       setCumulativeResults([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSave = () => {
//     setCandidate(formData);
//     localStorage.setItem("candidate", JSON.stringify(formData));
//     setIsEditing(false);
//   };

//   const formatSkills = (skills) => {
//     if (Array.isArray(skills)) return skills.join(", ");
//     if (typeof skills === "string") return skills;
//     return "";
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/candidates/login");
//   };

//   const handleAssessmentClick = (level) => {
//     if (attemptedLevels.includes(level)) return;
//     navigate(`/assessment/level/${level}`);
//   };

//   if (loading) {
//     return (
//       <div style={{ textAlign: "center", marginTop: "120px", fontFamily: "Arial, sans-serif" }}>
//         <h2>Loading your assessment details...</h2>
//       </div>
//     );
//   }

//   const fieldMap = {
//     email: "email",
//     mobile: "phoneNumber",
//     college: "collegeUniversity",
//     passoutYear: "yearOfGraduation",
//     experience: "experience",
//     skills: "skills"
//   };

//   return (
//     <div className="profile-container">
//       <div className="profile-card">
//         {/* Profile Header */}
//         <div className="profile-header">
//           <h1>👋 Welcome, <span>{candidate.fullName}</span></h1>
//           <button onClick={() => setIsEditing(!isEditing)} className="edit-btn">
//             {isEditing ? "Cancel" : "Edit Profile"}
//           </button>
//         </div>

//         {/* Profile Image */}
//         <div style={{ textAlign: "center", marginBottom: "20px" }}>
//           <img
//             src={profileSrc}
//             alt="Profile"
//             style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover", border: "2px solid #4CAF50" }}
//             onError={() => setProfileSrc("/images/default-profile.png")}
//           />
//         </div>

//         {/* Profile Details */}
//         <div className="profile-details">
//           {Object.keys(fieldMap).map((field) => (
//             <div className="detail-item" key={field}>
//               <strong>{field === "passoutYear" ? "Passout Year" : field.charAt(0).toUpperCase() + field.slice(1)}:</strong>
//               {isEditing ? (
//                 <input
//                   type="text"
//                   name={fieldMap[field]}
//                   value={field === "skills" ? formatSkills(formData.skills) : formData[fieldMap[field]] || ""}
//                   onChange={(e) => {
//                     if (field === "skills") {
//                       setFormData({ ...formData, skills: e.target.value.split(",").map(s => s.trim()) });
//                     } else {
//                       handleChange(e);
//                     }
//                   }}
//                 />
//               ) : (
//                 <span>{field === "skills" ? formatSkills(candidate.skills) : candidate[fieldMap[field]]}</span>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Save Button */}
//         {isEditing && (
//           <button className="save-btn" onClick={handleSave}>💾 Save Changes</button>
//         )}

//         {/* Take Assessment Button */}
//         <div style={{ textAlign: "center", marginTop: "25px" }}>
//           <button
//             onClick={() => navigate("/courses")}
//             style={{
//               display: "inline-block",
//               padding: "12px 25px",
//               borderRadius: "8px",
//               fontWeight: "bold",
//               backgroundColor: "#ff9800",
//               color: "#fff",
//               border: "none",
//               cursor: "pointer",
//               fontSize: "16px",
//               marginTop: "10px",
//             }}
//           >
//             🎯 Take Assessment
//           </button>
//         </div>

//         {/* Cumulative Results Table */}
// {cumulativeResults.length > 0 && (
//   <div style={{ marginTop: "30px", backgroundColor: "rgba(255,255,255,0.05)", padding: "15px", borderRadius: "10px", textAlign: "center" }}>
//     <h3 style={{ color: "#fff", marginBottom: "10px" }}>📊 Previous Assessment Results</h3>
//     <table style={{ width: "100%", borderCollapse: "collapse", color: "#fff" }}>
//       <thead>
//         <tr>
//           <th style={{ borderBottom: "1px solid #ccc", padding: "8px", textAlign: "left" }}>Subject</th>
//           <th style={{ borderBottom: "1px solid #ccc", padding: "8px", textAlign: "left" }}>Percentage</th>
//           <th style={{ borderBottom: "1px solid #ccc", padding: "8px", textAlign: "left" }}>Badge</th>
//         </tr>
//       </thead>
//       <tbody>
//         {cumulativeResults.map((res, idx) => (
//           <tr key={idx}>
//             <td style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>{res.subject}</td>
//             <td style={{ borderBottom: "1px solid #ccc", padding: "8px", color: res.cumulativePercentage >= 60 ? "limegreen" : "tomato" }}>
//               {res.cumulativePercentage}%
//             </td>
//             <td style={{ borderBottom: "1px solid #ccc", padding: "8px", color: res.badge !== "No Badge" ? "limegreen" : "#fff" }}>
//               {res.badge !== "No Badge" ? res.badge : "-"}
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// )}


//         {/* Logout Button */}
//         <div style={{ textAlign: "center", marginTop: "20px" }}>
//           <button
//             onClick={handleLogout}
//             style={{
//               display: "inline-block",
//               margin: "5px",
//               padding: "10px 20px",
//               borderRadius: "6px",
//               fontWeight: "bold",
//               transition: "0.3s",
//               border: "none",
//               cursor: "pointer",
//               backgroundColor: "#4CAF50",
//               color: "#fff",
//             }}
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


// // src/components/candidate/CandidateWelcome.jsx
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../services/api";
// import "../NewComponents/candi/CandidateProfile.css";

// export default function CandidateWelcome() {
//   const navigate = useNavigate();
//   const [candidate, setCandidate] = useState(null);
//   const [cumulativeResults, setCumulativeResults] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [profileSrc, setProfileSrc] = useState("/images/default-profile.png");

//   useEffect(() => {
//     // Load candidate from localStorage
//     const storedCandidate = localStorage.getItem("candidate");
//     if (!storedCandidate) {
//       navigate("/candidates/login");
//       return;
//     }

//     const parsedCandidate = JSON.parse(storedCandidate);
//     setCandidate(parsedCandidate);

//     if (parsedCandidate.profilePic) {
//       setProfileSrc(`https://backend.virtuehire.in/api/candidates/file/${parsedCandidate.profilePic}`);
//     }

//     fetchCumulativeResults(parsedCandidate.id);
//   }, [navigate]);

//   const fetchCumulativeResults = async (candidateId) => {
//     try {
//       const res = await api.get(`/candidates/${candidateId}/cumulative-results`, { withCredentials: true });
//       setCumulativeResults(res.data || []);
//     } catch (err) {
//       console.error("Error fetching cumulative results:", err);
//       setCumulativeResults([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("candidate");
//     localStorage.removeItem("candidateResults");
//     navigate("/candidates/login");
//   };

//   if (loading || !candidate) {
//     return (
//       <div style={{ textAlign: "center", marginTop: "120px", fontFamily: "Arial, sans-serif" }}>
//         <h2>Loading your data...</h2>
//       </div>
//     );
//   }

//   return (
//     <div className="profile-container">
//       <div className="profile-card">
//         <h1>👋 Welcome, {candidate.fullName}</h1>

//         <div style={{ textAlign: "center", marginBottom: "20px" }}>
//           <img
//             src={profileSrc}
//             alt="Profile"
//             style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover", border: "2px solid #4CAF50" }}
//             onError={() => setProfileSrc("/images/default-profile.png")}
//           />
//         </div>

//         <div className="profile-details">
//           <p><strong>Email:</strong> {candidate.email}</p>
//           <p><strong>Phone:</strong> {candidate.phoneNumber}</p>
//           <p><strong>College:</strong> {candidate.collegeUniversity}</p>
//           <p><strong>Year of Graduation:</strong> {candidate.yearOfGraduation}</p>
//           <p><strong>Experience:</strong> {candidate.experience}</p>
//           <p><strong>Skills:</strong> {(candidate.skills || []).join(", ")}</p>
//         </div>

//         <div style={{ textAlign: "center", marginTop: "25px" }}>
//           <button
//             onClick={() => navigate("/courses")}
//             style={{
//               padding: "12px 25px",
//               borderRadius: "8px",
//               backgroundColor: "#ff9800",
//               color: "#fff",
//               border: "none",
//               cursor: "pointer",
//               fontSize: "16px",
//             }}
//           >
//             🎯 Take Assessment
//           </button>
//         </div>

//         {cumulativeResults.length > 0 && (
//           <div style={{ marginTop: "30px", textAlign: "center" }}>
//             <h3>📊 Previous Assessment Results</h3>
//             <table style={{ width: "100%", color: "#000", borderCollapse: "collapse" }}>
//               <thead>
//                 <tr>
//                   <th>Subject</th>
//                   <th>Percentage</th>
//                   <th>Badge</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {cumulativeResults.map((res, idx) => (
//                   <tr key={idx}>
//                     <td>{res.subject}</td>
//                     <td style={{ color: res.cumulativePercentage >= 60 ? "limegreen" : "tomato" }}>
//                       {res.cumulativePercentage}%
//                     </td>
//                     <td>{res.badge !== "No Badge" ? res.badge : "-"}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         <div style={{ textAlign: "center", marginTop: "20px" }}>
//           <button
//             onClick={handleLogout}
//             style={{
//               padding: "10px 20px",
//               borderRadius: "6px",
//               fontWeight: "bold",
//               border: "none",
//               cursor: "pointer",
//               backgroundColor: "#4CAF50",
//               color: "#fff",
//             }}
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// //mainnnnnnnn workingggggggg
// // src/components/candidate/CandidateWelcome.jsx
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../services/api";
// import "../NewComponents/candi/CandidateProfile.css";

// export default function CandidateWelcome() {
//   const navigate = useNavigate();
//   const [candidate, setCandidate] = useState(null);
//   const [cumulativeResults, setCumulativeResults] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [profileSrc, setProfileSrc] = useState("/images/default-profile.png");

//   // Helper to safely format skills
//   const formatSkills = (skills) => {
//     if (!skills) return "";
//     if (Array.isArray(skills)) return skills.join(", ");
//     if (typeof skills === "string") return skills;
//     return "";
//   };

//   useEffect(() => {
//     // Load candidate from localStorage
//     const storedCandidate = localStorage.getItem("candidate");
//     if (!storedCandidate) {
//       navigate("/candidates/login");
//       return;
//     }

//     let parsedCandidate;
//     try {
//       parsedCandidate = JSON.parse(storedCandidate);
//     } catch (err) {
//       console.error("Invalid JSON in localStorage:", err);
//       localStorage.removeItem("candidate");
//       navigate("/candidates/login");
//       return;
//     }

//     // Ensure skills is normalized to array/string
//     parsedCandidate.skills = parsedCandidate.skills || [];
//     setCandidate(parsedCandidate);

//     if (parsedCandidate.profilePic) {
//       setProfileSrc(`https://backend.virtuehire.in/api/candidates/file/${parsedCandidate.profilePic}`);
//     }

//     fetchCumulativeResults(parsedCandidate.id);
//   }, [navigate]);

//   const fetchCumulativeResults = async (candidateId) => {
//     try {
//       const res = await api.get(
//         `/candidates/${candidateId}/cumulative-results`,
//         { withCredentials: true }
//       );
//       setCumulativeResults(res.data || []);
//     } catch (err) {
//       console.error("Error fetching cumulative results:", err);
//       setCumulativeResults([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("candidate");
//     localStorage.removeItem("candidateResults");
//     navigate("/candidates/login");
//   };

//   if (loading || !candidate) {
//     return (
//       <div style={{ textAlign: "center", marginTop: "120px", fontFamily: "Arial, sans-serif" }}>
//         <h2>Loading your data...</h2>
//       </div>
//     );
//   }

//   return (
//     <div className="profile-container">
//       <div className="profile-card">
//         <h1>👋 Welcome, {candidate.fullName}</h1>

//         <div style={{ textAlign: "center", marginBottom: "20px" }}>
//           <img
//             src={profileSrc}
//             alt="Profile"
//             style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover", border: "2px solid #4CAF50" }}
//             onError={() => setProfileSrc("/images/default-profile.png")}
//           />
//         </div>

//         <div className="profile-details">
//           <p><strong>Email:</strong> {candidate.email}</p>
//           <p><strong>Phone:</strong> {candidate.phoneNumber}</p>
//           <p><strong>College:</strong> {candidate.collegeUniversity}</p>
//           <p><strong>Year of Graduation:</strong> {candidate.yearOfGraduation}</p>
//           <p><strong>Experience:</strong> {candidate.experience}</p>
//           <p><strong>Skills:</strong> {formatSkills(candidate.skills)}</p>
//         </div>

//         <div style={{ textAlign: "center", marginTop: "25px" }}>
//           <button
//             onClick={() => navigate("/courses")}
//             style={{
//               padding: "12px 25px",
//               borderRadius: "8px",
//               backgroundColor: "#ff9800",
//               color: "#fff",
//               border: "none",
//               cursor: "pointer",
//               fontSize: "16px",
//             }}
//           >
//             🎯 Take Assessment
//           </button>
//         </div>

//         {cumulativeResults.length > 0 && (
//           <div style={{ marginTop: "30px", textAlign: "center" }}>
//             <h3>📊 Previous Assessment Results</h3>
//             <table style={{ width: "100%", color: "#000", borderCollapse: "collapse" }}>
//               <thead>
//                 <tr>
//                   <th>Subject</th>
//                   <th>Percentage</th>
//                   <th>Badge</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {cumulativeResults.map((res, idx) => (
//                   <tr key={idx}>
//                     <td>{res.subject}</td>
//                     <td style={{ color: res.cumulativePercentage >= 60 ? "limegreen" : "tomato" }}>
//                       {res.cumulativePercentage}%
//                     </td>
//                     <td>{res.badge !== "No Badge" ? res.badge : "-"}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         <div style={{ textAlign: "center", marginTop: "20px" }}>
//           <button
//             onClick={handleLogout}
//             style={{
//               padding: "10px 20px",
//               borderRadius: "6px",
//               fontWeight: "bold",
//               border: "none",
//               cursor: "pointer",
//               backgroundColor: "#4CAF50",
//               color: "#fff",
//             }}
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


//mainnn workingggggggggggggggg
// src/components/candidate/CandidateWelcome.jsx
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../services/api";
// import "../NewComponents/candi/CandidateProfile.css";

// export default function CandidateWelcome() {
//   const navigate = useNavigate();
//   const [candidate, setCandidate] = useState(null);
//   const [cumulativeResults, setCumulativeResults] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [profileSrc, setProfileSrc] = useState("/images/default-profile.png");

//   // Helper to safely format skills
//   const formatSkills = (skills) => {
//     if (!skills) return "";
//     if (Array.isArray(skills)) return skills.join(", ");
//     if (typeof skills === "string") return skills;
//     return "";
//   };

//   useEffect(() => {
//     // Load candidate from localStorage
//     const storedCandidate = localStorage.getItem("candidate");
//     if (!storedCandidate) {
//       navigate("/candidates/login");
//       return;
//     }

//     let parsedCandidate;
//     try {
//       parsedCandidate = JSON.parse(storedCandidate);
//     } catch (err) {
//       console.error("Invalid JSON in localStorage:", err);
//       localStorage.removeItem("candidate");
//       navigate("/candidates/login");
//       return;
//     }

//     // Ensure skills is normalized to array/string
//     parsedCandidate.skills = parsedCandidate.skills || [];
//     setCandidate(parsedCandidate);

//     if (parsedCandidate.profilePic) {
//       setProfileSrc(`https://backend.virtuehire.in/api/candidates/file/${parsedCandidate.profilePic}`);
//     }

//     fetchCumulativeResults(parsedCandidate.id);
//   }, [navigate]);

//   const fetchCumulativeResults = async (candidateId) => {
//     try {
//       const res = await api.get(
//         `/candidates/${candidateId}/cumulative-results`,
//         { withCredentials: true }
//       );
//       setCumulativeResults(res.data || []);
//     } catch (err) {
//       console.error("Error fetching cumulative results:", err);
//       setCumulativeResults([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("candidate");
//     localStorage.removeItem("candidateResults");
//     navigate("/candidates/login");
//   };

//   if (loading || !candidate) {
//     return (
//       <div style={{ textAlign: "center", marginTop: "120px", fontFamily: "Arial, sans-serif" }}>
//         <h2>Loading your data...</h2>
//       </div>
//     );
//   }

//   return (
//     <div style={{ backgroundColor: "#f3f4f6", minHeight: "100vh", padding: "40px 20px" }}>
//       <div style={{ maxWidth: "900px", margin: "0 auto", backgroundColor: "#ffffff", borderRadius: "12px", padding: "40px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}>
//         <h1 style={{ color: "#1f2937", textAlign: "center", marginBottom: "30px" }}>👋 Welcome, {candidate.fullName}</h1>

//         <div style={{ textAlign: "center", marginBottom: "30px" }}>
//           <img
//             src={profileSrc}
//             alt="Profile"
//             style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover", border: "3px solid #4f46e5" }}
//             onError={() => setProfileSrc("/images/default-profile.png")}
//           />
//         </div>

//         <div style={{ marginBottom: "30px", backgroundColor: "#f9fafb", padding: "20px", borderRadius: "8px" }}>
//           <p style={{ color: "#1f2937", marginBottom: "10px" }}><strong>Email:</strong> {candidate.email}</p>
//           <p style={{ color: "#1f2937", marginBottom: "10px" }}><strong>Phone:</strong> {candidate.phoneNumber}</p>
//           <p style={{ color: "#1f2937", marginBottom: "10px" }}><strong>College:</strong> {candidate.collegeUniversity}</p>
//           <p style={{ color: "#1f2937", marginBottom: "10px" }}><strong>Year of Graduation:</strong> {candidate.yearOfGraduation}</p>
//           <p style={{ color: "#1f2937", marginBottom: "10px" }}><strong>Experience:</strong> {candidate.experience}</p>
//           <p style={{ color: "#1f2937" }}><strong>Skills:</strong> {formatSkills(candidate.skills)}</p>
//         </div>

//         <div style={{ textAlign: "center", marginTop: "25px" }}>
//           <button
//             onClick={() => navigate("/courses")}
//             style={{
//               padding: "12px 25px",
//               borderRadius: "8px",
//               backgroundColor: "#ff9800",
//               color: "#fff",
//               border: "none",
//               cursor: "pointer",
//               fontSize: "16px",
//               fontWeight: "600",
//             }}
//             onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#f57c00"}
//             onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#ff9800"}
//           >
//             🎯 Take Assessment
//           </button>
//         </div>

//         {cumulativeResults.length > 0 && (
//           <div style={{ marginTop: "30px", textAlign: "center" }}>
//             <h3 style={{ color: "#1f2937" }}>📊 Previous Assessment Results</h3>
//             <table style={{ width: "100%", color: "#1f2937", borderCollapse: "collapse", marginTop: "15px" }}>
//               <thead>
//                 <tr style={{ backgroundColor: "#f3f4f6", borderBottom: "2px solid #e5e7eb" }}>
//                   <th style={{ padding: "12px", textAlign: "left", fontWeight: "600" }}>Subject</th>
//                   <th style={{ padding: "12px", textAlign: "left", fontWeight: "600" }}>Percentage</th>
//                   <th style={{ padding: "12px", textAlign: "left", fontWeight: "600" }}>Badge</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {cumulativeResults.map((res, idx) => (
//                   <tr key={idx} style={{ borderBottom: "1px solid #e5e7eb" }}>
//                     <td style={{ padding: "12px", color: "#1f2937" }}>{res.subject}</td>
//                     <td style={{ padding: "12px", color: res.cumulativePercentage >= 60 ? "#10b981" : "#ef4444", fontWeight: "600" }}>
//                       {res.cumulativePercentage}%
//                     </td>
//                     <td style={{ padding: "12px", color: "#1f2937" }}>{res.badge !== "No Badge" ? res.badge : "-"}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         <div style={{ textAlign: "center", marginTop: "30px" }}>
//           <button
//             onClick={handleLogout}
//             style={{
//               padding: "10px 20px",
//               borderRadius: "6px",
//               fontWeight: "bold",
//               border: "none",
//               cursor: "pointer",
//               backgroundColor: "#4CAF50",
//               color: "#fff",
//             }}
//             onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#45a049"}
//             onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#4CAF50"}
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// src/components/candidate/CandidateWelcome.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { API_BASE_URL } from "../../config";
import "../NewComponents/candi/CandidateProfile.css";

export default function CandidateWelcome() {
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState(null);
  const [cumulativeResults, setCumulativeResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profileSrc, setProfileSrc] = useState("/images/default-profile.png");
  const [hoveredResult, setHoveredResult] = useState(null);

  // Helper to safely format skills
  const formatSkills = (skills) => {
    if (!skills) return "";
    if (Array.isArray(skills)) return skills.join(", ");
    if (typeof skills === "string") return skills;
    return "";
  };

  useEffect(() => {
    // Load candidate from localStorage
    const storedCandidate = localStorage.getItem("candidate");
    if (!storedCandidate) {
      navigate("/candidates/login");
      return;
    }

    let parsedCandidate;
    try {
      parsedCandidate = JSON.parse(storedCandidate);
    } catch (err) {
      console.error("Invalid JSON in localStorage:", err);
      localStorage.removeItem("candidate");
      navigate("/candidates/login");
      return;
    }

    // Ensure skills is normalized to array/string
    parsedCandidate.skills = parsedCandidate.skills || [];
    setCandidate(parsedCandidate);

    if (parsedCandidate.profilePic) {
      setProfileSrc(`${API_BASE_URL}/candidates/file/${parsedCandidate.profilePic}`);
    }

    fetchCumulativeResults(parsedCandidate.id);
  }, [navigate]);

  const fetchCumulativeResults = async (candidateId) => {
    try {
      const res = await api.get(
        `/candidates/${candidateId}/cumulative-results`,
        { withCredentials: true }
      );
      setCumulativeResults(res.data || []);
    } catch (err) {
      console.error("Error fetching cumulative results:", err);
      setCumulativeResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("candidate");
    localStorage.removeItem("candidateResults");
    navigate("/candidates/login");
  };

  const getScoreBadgeColor = (percentage) => {
    if (percentage >= 80) return { bg: "#dbeafe", text: "#0369a1", label: "⭐ Excellent" };
    if (percentage >= 60) return { bg: "#dcfce7", text: "#166534", label: "✓ Good" };
    return { bg: "#fee2e2", text: "#991b1b", label: "↗ Needs Work" };
  };

  const statsData = [
    { label: "Assessments Taken", value: cumulativeResults.length, icon: "📋" },
    { label: "Avg Score", value: cumulativeResults.length > 0 ? Math.round(cumulativeResults.reduce((a, b) => a + b.cumulativePercentage, 0) / cumulativeResults.length) + "%" : "N/A", icon: "📊" },
    { label: "Passed", value: cumulativeResults.filter(r => r.cumulativePercentage >= 60).length, icon: "✅" }
  ];

  if (loading || !candidate) {
    return (
      <div style={{ textAlign: "center", marginTop: "120px", fontFamily: "Arial, sans-serif" }}>
        <h2>Loading your data...</h2>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#f3f4f6", minHeight: "100vh", paddingTop: "40px", paddingBottom: "60px" }}>
      {/* Header Section with Gradient */}
      <div style={{
        background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
        padding: "60px 40px",
        borderRadius: "0 0 24px 24px",
        marginBottom: "40px",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Decorative elements */}
        <div style={{
          position: "absolute",
          top: "-50px",
          right: "-50px",
          width: "200px",
          height: "200px",
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "50%"
        }} />

        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
          textAlign: "center"
        }}>
          <h1 style={{
            color: "#ffffff",
            fontSize: "2.8rem",
            fontWeight: "800",
            marginBottom: "10px",
            margin: "0 0 10px 0"
          }}>
            👋 Welcome back, {candidate.fullName}!
          </h1>
          <p style={{
            color: "rgba(255, 255, 255, 0.9)",
            fontSize: "1.1rem",
            fontWeight: "500",
            margin: "0"
          }}>
            Ready to ace your next assessment?
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>

        {/* Profile Card */}
        <div style={{
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          padding: "50px 40px",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
          marginBottom: "40px",
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: "50px",
          alignItems: "center"
        }}>
          {/* Profile Picture */}
          <div style={{ textAlign: "center" }}>
            <div style={{
              position: "relative",
              width: "150px",
              height: "150px",
              margin: "0 auto",
              borderRadius: "50%",
              overflow: "hidden",
              border: "6px solid #4f46e5",
              boxShadow: "0 8px 24px rgba(79, 70, 229, 0.3)"
            }}>
              <img
                src={profileSrc}
                alt="Profile"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover"
                }}
                onError={() => setProfileSrc("/images/default-profile.png")}
              />
            </div>
          </div>

          {/* Profile Info */}
          <div>
            <h2 style={{ color: "#1f2937", fontSize: "1.5rem", fontWeight: "700", marginBottom: "20px" }}>Profile Information</h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
              <div>
                <p style={{ color: "#6b7280", fontSize: "0.9rem", fontWeight: "600", marginBottom: "4px" }}>EMAIL</p>
                <p style={{ color: "#1f2937", fontSize: "1rem", fontWeight: "500" }}>{candidate.email}</p>
              </div>
              <div>
                <p style={{ color: "#6b7280", fontSize: "0.9rem", fontWeight: "600", marginBottom: "4px" }}>PHONE</p>
                <p style={{ color: "#1f2937", fontSize: "1rem", fontWeight: "500" }}>{candidate.phoneNumber}</p>
              </div>
              <div>
                <p style={{ color: "#6b7280", fontSize: "0.9rem", fontWeight: "600", marginBottom: "4px" }}>COLLEGE</p>
                <p style={{ color: "#1f2937", fontSize: "1rem", fontWeight: "500" }}>{candidate.collegeUniversity}</p>
              </div>
              <div>
                <p style={{ color: "#6b7280", fontSize: "0.9rem", fontWeight: "600", marginBottom: "4px" }}>GRADUATION</p>
                <p style={{ color: "#1f2937", fontSize: "1rem", fontWeight: "500" }}>{candidate.yearOfGraduation}</p>
              </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <p style={{ color: "#6b7280", fontSize: "0.9rem", fontWeight: "600", marginBottom: "4px" }}>EXPERIENCE</p>
              <p style={{ color: "#1f2937", fontSize: "1rem", fontWeight: "500" }}>{candidate.experience} years</p>
            </div>

            <div>
              <p style={{ color: "#6b7280", fontSize: "0.9rem", fontWeight: "600", marginBottom: "8px" }}>SKILLS</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {formatSkills(candidate.skills).split(",").map((skill, idx) => (
                  <span key={idx} style={{
                    backgroundColor: "#f0f9ff",
                    color: "#0369a1",
                    padding: "6px 14px",
                    borderRadius: "20px",
                    fontSize: "0.9rem",
                    fontWeight: "600",
                    border: "1px solid #bfdbfe"
                  }}>
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          marginBottom: "40px"
        }}>
          {statsData.map((stat, idx) => (
            <div key={idx} style={{
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              padding: "24px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
              textAlign: "center",
              transition: "all 0.3s ease",
              cursor: "pointer"
            }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 8px 16px rgba(79, 70, 229, 0.15)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.06)";
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "8px" }}>{stat.icon}</div>
              <p style={{ color: "#6b7280", fontSize: "0.9rem", fontWeight: "600", margin: "0 0 8px 0" }}>{stat.label}</p>
              <p style={{ color: "#1f2937", fontSize: "2rem", fontWeight: "800", margin: "0" }}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <button
            onClick={() => navigate("/courses")}
            style={{
              padding: "16px 48px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #ff9800 0%, #f57c00 100%)",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              fontSize: "18px",
              fontWeight: "700",
              transition: "all 0.3s ease",
              boxShadow: "0 6px 20px rgba(255, 152, 0, 0.4)"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 10px 28px rgba(255, 152, 0, 0.5)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(255, 152, 0, 0.4)";
            }}
          >
            🎯 Start Assessment
          </button>
        </div>

        {/* Results Section */}
        {cumulativeResults.length > 0 && (
          <div style={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            padding: "40px",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
            marginBottom: "40px"
          }}>
            <h3 style={{
              color: "#1f2937",
              fontSize: "1.8rem",
              fontWeight: "700",
              marginBottom: "30px",
              display: "flex",
              alignItems: "center",
              gap: "10px"
            }}>
              📊 Assessment Results
            </h3>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "20px"
            }}>
              {cumulativeResults.map((res, idx) => {
                const scoreInfo = getScoreBadgeColor(res.cumulativePercentage);
                return (
                  <div
                    key={idx}
                    onMouseEnter={() => setHoveredResult(idx)}
                    onMouseLeave={() => setHoveredResult(null)}
                    style={{
                      border: "1px solid #e5e7eb",
                      borderRadius: "12px",
                      padding: "24px",
                      backgroundColor: hoveredResult === idx ? "#f9fafb" : "#ffffff",
                      transition: "all 0.3s ease",
                      transform: hoveredResult === idx ? "translateY(-4px)" : "translateY(0)",
                      boxShadow: hoveredResult === idx ? "0 8px 20px rgba(0, 0, 0, 0.08)" : "0 2px 8px rgba(0, 0, 0, 0.04)"
                    }}
                  >
                    <h4 style={{ color: "#1f2937", fontSize: "1.3rem", fontWeight: "700", marginBottom: "12px", margin: "0 0 12px 0" }}>
                      {res.subject}
                    </h4>

                    <div style={{ marginBottom: "16px" }}>
                      <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "8px"
                      }}>
                        <span style={{ color: "#6b7280", fontWeight: "600" }}>Score</span>
                        <span style={{ fontSize: "2rem", fontWeight: "800", color: res.cumulativePercentage >= 60 ? "#10b981" : "#ef4444" }}>
                          {res.cumulativePercentage}%
                        </span>
                      </div>
                      <div style={{
                        width: "100%",
                        height: "8px",
                        backgroundColor: "#e5e7eb",
                        borderRadius: "4px",
                        overflow: "hidden"
                      }}>
                        <div
                          style={{
                            height: "100%",
                            width: `${res.cumulativePercentage}%`,
                            backgroundColor: res.cumulativePercentage >= 60 ? "#10b981" : "#ef4444",
                            borderRadius: "4px",
                            transition: "width 0.5s ease"
                          }}
                        />
                      </div>
                    </div>

                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}>
                      <span style={{
                        backgroundColor: scoreInfo.bg,
                        color: scoreInfo.text,
                        padding: "6px 14px",
                        borderRadius: "20px",
                        fontSize: "0.85rem",
                        fontWeight: "700"
                      }}>
                        {scoreInfo.label}
                      </span>
                      <span style={{
                        color: "#6b7280",
                        fontSize: "0.9rem",
                        fontWeight: "600"
                      }}>
                        {res.badge !== "No Badge" ? "🏆 " + res.badge : ""}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Logout Button */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <button
            onClick={handleLogout}
            style={{
              padding: "12px 32px",
              borderRadius: "10px",
              fontWeight: "700",
              border: "2px solid #ef4444",
              cursor: "pointer",
              backgroundColor: "transparent",
              color: "#ef4444",
              fontSize: "15px",
              transition: "all 0.3s ease"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#ef4444";
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#ef4444";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
