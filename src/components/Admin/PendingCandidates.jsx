// // AdminPendingCandidates.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const AdminPendingCandidates = () => {
//   const [candidates, setCandidates] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [rejectReason, setRejectReason] = useState("");
//   const [selectedCandidate, setSelectedCandidate] = useState(null);

//   useEffect(() => {
//     fetchPendingCandidates();
//   }, []);

//   const fetchPendingCandidates = async () => {
//     try {
//       const res = await axios.get("http://localhost:8081/admin/candidates/pending");
//       setCandidates(res.data);
//       setLoading(false);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to load pending candidates.");
//       setLoading(false);
//     }
//   };

//   const handleApprove = async (id) => {
//     try {
//       await axios.post(`http://localhost:8081/admin/candidates/approve/${id}`);
//       setCandidates(candidates.filter(c => c.id !== id));
//     } catch (err) {
//       console.error(err);
//       alert("Failed to approve candidate.");
//     }
//   };

//   const handleReject = async (id) => {
//     if (!rejectReason.trim()) {
//       alert("Please enter a reason for rejection.");
//       return;
//     }
//     try {
//       await axios.post(`http://localhost:8081/admin/candidates/reject/${id}`, { reason: rejectReason });
//       setCandidates(candidates.filter(c => c.id !== id));
//       setRejectReason("");
//       setSelectedCandidate(null);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to reject candidate.");
//     }
//   };

//   if (loading) return <div className="p-4">Loading pending candidates...</div>;
//   if (error) return <div className="p-4 text-red-600">{error}</div>;

//   return (
//     <div className="container my-4">
//       {/* Navbar */}
//       <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
//         <div className="container">
//           <a className="navbar-brand" href="/admin/dashboard">
//             <i className="fas fa-crown me-2"></i> Admin Panel
//           </a>
//           <div className="navbar-nav ms-auto">
//             <a className="nav-link" href="/admin/dashboard">Dashboard</a>
//             <a className="nav-link" href="/admin/hrs">HR Management</a>
//             <a className="nav-link" href="/admin/questions">Question Bank</a>
//             <a className="nav-link active" href="/admin/candidates">Candidates</a>
//           </div>
//         </div>
//       </nav>

//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h1><i className="fas fa-user-clock me-2"></i> Pending Candidate Verification</h1>
//         <a href="/admin/candidates" className="btn btn-secondary">
//           <i className="fas fa-arrow-left me-2"></i> Back to All Candidates
//         </a>
//       </div>

//       <div className="card">
//         <div className="card-header bg-warning text-dark">
//           <h5 className="mb-0">
//             Candidates Waiting for Verification
//             <span className="badge bg-danger ms-2">{candidates.length}</span>
//           </h5>
//         </div>
//         <div className="card-body">
//           {candidates.length === 0 ? (
//             <div className="text-center text-muted py-4">
//               <i className="fas fa-check-circle fa-2x mb-2"></i>
//               <p>No pending candidate verifications</p>
//             </div>
//           ) : (
//             <div className="table-responsive">
//               <table className="table table-striped">
//                 <thead>
//                   <tr>
//                     <th>ID</th>
//                     <th>Name</th>
//                     <th>Email</th>
//                     <th>Phone</th>
//                     <th>College/University</th>
//                     <th>Graduation Year</th>
//                     <th>ID Card</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {candidates.map(candidate => (
//                     <tr key={candidate.id}>
//                       <td>{candidate.id}</td>
//                       <td>{candidate.fullName}</td>
//                       <td>{candidate.email}</td>
//                       <td>{candidate.phoneNumber}</td>
//                       <td>{candidate.collegeUniversity}</td>
//                       <td>{candidate.yearOfGraduation}</td>
//                       <td>
//                         {candidate.idCardPath ? (
//                           <a
//                             href={`http://localhost:8081/candidates/file/${candidate.idCardPath}`}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="btn btn-sm btn-outline-primary"
//                           >
//                             <i className="fas fa-eye me-1"></i> View ID
//                           </a>
//                         ) : (
//                           <span className="text-muted">No ID</span>
//                         )}
//                       </td>
//                       <td>
//                         <div className="btn-group btn-group-sm">
//                           <button
//                             className="btn btn-success"
//                             onClick={() => handleApprove(candidate.id)}
//                           >
//                             <i className="fas fa-check me-1"></i> Approve
//                           </button>
//                           <button
//                             className="btn btn-danger"
//                             data-bs-toggle="modal"
//                             data-bs-target={`#rejectModal${candidate.id}`}
//                             onClick={() => setSelectedCandidate(candidate)}
//                           >
//                             <i className="fas fa-times me-1"></i> Reject
//                           </button>
//                         </div>

//                         {/* Reject Modal */}
//                         {selectedCandidate && selectedCandidate.id === candidate.id && (
//                           <div
//                             className="modal fade show"
//                             style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
//                             tabIndex="-1"
//                           >
//                             <div className="modal-dialog">
//                               <div className="modal-content">
//                                 <div className="modal-header">
//                                   <h5 className="modal-title">Reject Candidate</h5>
//                                   <button
//                                     type="button"
//                                     className="btn-close"
//                                     onClick={() => setSelectedCandidate(null)}
//                                   ></button>
//                                 </div>
//                                 <div className="modal-body">
//                                   <p>
//                                     Reject <strong>{candidate.fullName}</strong>?
//                                   </p>
//                                   <div className="mb-3">
//                                     <label className="form-label">Reason for rejection:</label>
//                                     <textarea
//                                       className="form-control"
//                                       rows="3"
//                                       value={rejectReason}
//                                       onChange={(e) => setRejectReason(e.target.value)}
//                                       placeholder="Enter reason for rejection..."
//                                     ></textarea>
//                                   </div>
//                                 </div>
//                                 <div className="modal-footer">
//                                   <button
//                                     type="button"
//                                     className="btn btn-secondary"
//                                     onClick={() => setSelectedCandidate(null)}
//                                   >
//                                     Cancel
//                                   </button>
//                                   <button
//                                     type="button"
//                                     className="btn btn-danger"
//                                     onClick={() => handleReject(candidate.id)}
//                                   >
//                                     Reject Candidate
//                                   </button>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminPendingCandidates;


// src/pages/admin/PendingCandidates.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const PendingCandidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/admin/candidates/pending", { withCredentials: true })
      .then((res) => {
        setCandidates(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load pending candidates.");
        setLoading(false);
      });
  }, []);

  const handleApprove = (id) => {
    axios
      .post(`http://localhost:8081/api/admin/candidates/approve/${id}`, {}, { withCredentials: true })
      .then(() => {
        setCandidates((prev) => prev.filter((c) => c.id !== id));
      })
      .catch((err) => console.error(err));
  };

  const handleReject = (id, reason) => {
    axios
      .post(`http://localhost:8081/api/admin/candidates/reject/${id}`, { reason }, { withCredentials: true })
      .then(() => {
        setCandidates((prev) => prev.filter((c) => c.id !== id));
      })
      .catch((err) => console.error(err));
  };

  if (loading) return <p>Loading candidates...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1><i className="fas fa-user-clock me-2"></i>Pending Candidate Verification</h1>
      </div>

      {candidates.length === 0 ? (
        <div className="text-center text-muted py-4">
          <i className="fas fa-check-circle fa-2x mb-2"></i>
          <p>No pending candidate verifications</p>
        </div>
      ) : (
        <div className="card">
          <div className="card-header bg-warning text-dark">
            <h5 className="mb-0">
              Candidates Waiting for Verification <span className="badge bg-danger">{candidates.length}</span>
            </h5>
          </div>
          <div className="card-body table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>College/University</th>
                  <th>Graduation Year</th>
                  <th>ID Card</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map((candidate) => (
                  <tr key={candidate.id}>
                    <td>{candidate.id}</td>
                    <td>{candidate.fullName}</td>
                    <td>{candidate.email}</td>
                    <td>{candidate.phoneNumber}</td>
                    <td>{candidate.collegeUniversity}</td>
                    <td>{candidate.yearOfGraduation}</td>
                    <td>
                      {candidate.idCardPath ? (
                        <a
                          href={`http://localhost:8081/candidates/file/${candidate.idCardPath}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-outline-primary"
                        >
                          <i className="fas fa-eye me-1"></i>View ID
                        </a>
                      ) : (
                        <span className="text-muted">No ID</span>
                      )}
                    </td>
                    <td>
                      <div className="btn-group btn-group-sm">
                        <button
                          onClick={() => handleApprove(candidate.id)}
                          className="btn btn-success"
                        >
                          <i className="fas fa-check me-1"></i>Approve
                        </button>

                        {/* Reject Button triggers prompt for reason */}
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            const reason = prompt(`Reject ${candidate.fullName}? Enter reason:`);
                            if (reason) handleReject(candidate.id, reason);
                          }}
                        >
                          <i className="fas fa-times me-1"></i>Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingCandidates;
