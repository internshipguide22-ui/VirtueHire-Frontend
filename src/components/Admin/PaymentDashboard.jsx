// // AdminPaymentDashboard.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const AdminPaymentDashboard = () => {
//   const [paymentStats, setPaymentStats] = useState({
//     totalRevenue: 0,
//     totalPayments: 0,
//     successfulPayments: 0,
//     failedPayments: 0,
//   });

//   const [recentTransactions, setRecentTransactions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetchPaymentData();
//   }, []);

//   const fetchPaymentData = async () => {
//     try {
//       const statsRes = await axios.get("http://localhost:8081/admin/payment-stats");
//       const transactionsRes = await axios.get("http://localhost:8081/admin/recent-transactions");

//       setPaymentStats(statsRes.data);
//       setRecentTransactions(transactionsRes.data);

//       setLoading(false);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to load payment data.");
//       setLoading(false);
//     }
//   };

//   const getBadgeClass = (status) => {
//     switch (status) {
//       case "SUCCESS":
//         return "bg-green-100 text-green-800 px-2 py-1 rounded";
//       case "FAILED":
//         return "bg-red-100 text-red-800 px-2 py-1 rounded";
//       case "PENDING":
//         return "bg-yellow-100 text-yellow-800 px-2 py-1 rounded";
//       default:
//         return "bg-gray-100 text-gray-800 px-2 py-1 rounded";
//     }
//   };

//   if (loading) return <div className="p-4">Loading payment dashboard...</div>;
//   if (error) return <div className="p-4 text-red-600">{error}</div>;

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Navbar */}
//       <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
//         <a href="/admin/dashboard" className="flex items-center gap-2 font-bold text-lg">
//           <i className="fas fa-crown"></i> VirtueHire Admin
//         </a>
//         <div className="flex gap-4">
//           <a href="/admin/dashboard" className="hover:underline">Dashboard</a>
//           <a href="/admin/payments" className="font-bold underline">Payments</a>
//           <a href="/admin/dashboard" className="hover:underline">HR Requests</a>
//           <a href="/logout" className="hover:underline">Logout</a>
//         </div>
//       </nav>

//       <div className="container mx-auto p-4">
//         <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
//           <i className="fas fa-chart-line"></i> Payment Dashboard
//         </h1>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
//           <div className="bg-white border-l-4 border-blue-500 shadow p-4 rounded hover:translate-y-[-2px] transition">
//             <div className="flex justify-between items-center">
//               <div>
//                 <h5 className="text-blue-500 text-xl font-bold">₹{paymentStats.totalRevenue}</h5>
//                 <p>Total Revenue</p>
//               </div>
//               <i className="fas fa-rupee-sign fa-2x text-blue-500"></i>
//             </div>
//           </div>

//           <div className="bg-white border-l-4 border-green-500 shadow p-4 rounded hover:translate-y-[-2px] transition">
//             <div className="flex justify-between items-center">
//               <div>
//                 <h5 className="text-green-500 text-xl font-bold">{paymentStats.totalPayments}</h5>
//                 <p>Total Payments</p>
//               </div>
//               <i className="fas fa-receipt fa-2x text-green-500"></i>
//             </div>
//           </div>

//           <div className="bg-white border-l-4 border-yellow-500 shadow p-4 rounded hover:translate-y-[-2px] transition">
//             <div className="flex justify-between items-center">
//               <div>
//                 <h5 className="text-yellow-500 text-xl font-bold">{paymentStats.successfulPayments}</h5>
//                 <p>Successful</p>
//               </div>
//               <i className="fas fa-check-circle fa-2x text-yellow-500"></i>
//             </div>
//           </div>

//           <div className="bg-white border-l-4 border-red-500 shadow p-4 rounded hover:translate-y-[-2px] transition">
//             <div className="flex justify-between items-center">
//               <div>
//                 <h5 className="text-red-500 text-xl font-bold">{paymentStats.failedPayments}</h5>
//                 <p>Failed</p>
//               </div>
//               <i className="fas fa-times-circle fa-2x text-red-500"></i>
//             </div>
//           </div>
//         </div>

//         {/* Charts placeholder */}
//         <div className="grid md:grid-cols-12 gap-4">
//           <div className="md:col-span-8 bg-white rounded shadow p-4">
//             <h5 className="font-bold mb-2">Revenue Overview</h5>
//             <div className="revenue-chart bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-4 rounded text-center">
//               <h4>Revenue Analytics</h4>
//               <p className="mb-0">Chart integration would go here</p>
//               <small>Total Revenue: ₹{paymentStats.totalRevenue}</small>
//             </div>
//             <div className="grid grid-cols-3 text-center mt-3">
//               <div>
//                 <h6>This Month</h6>
//                 <h4 className="text-green-500">₹12,450</h4>
//               </div>
//               <div>
//                 <h6>Last Month</h6>
//                 <h4 className="text-blue-500">₹9,870</h4>
//               </div>
//               <div>
//                 <h6>Growth</h6>
//                 <h4 className="text-yellow-500">+26%</h4>
//               </div>
//             </div>
//           </div>

//           <div className="md:col-span-4 bg-white rounded shadow p-4">
//             <h5 className="font-bold mb-2">Plan Distribution</h5>
//             <div className="text-center">
//               <div className="mb-3">
//                 <i className="fas fa-chart-pie fa-3x text-blue-500 mb-2"></i>
//                 <p>Plan subscription analytics</p>
//               </div>
//               <div className="text-left">
//                 <div className="flex justify-between mb-2">
//                   <span>Premium Plan</span>
//                   <strong>65%</strong>
//                 </div>
//                 <div className="flex justify-between mb-2">
//                   <span>Basic Plan</span>
//                   <strong>25%</strong>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Enterprise Plan</span>
//                   <strong>10%</strong>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Recent Transactions */}
//         <div className="bg-white rounded shadow mt-4">
//           <div className="flex justify-between items-center p-4 border-b">
//             <h5 className="font-bold mb-0">Recent Transactions</h5>
//             <button className="btn border border-blue-500 text-blue-500 px-3 py-1 rounded flex items-center gap-1">
//               <i className="fas fa-sync-alt"></i> Refresh
//             </button>
//           </div>
//           <div className="overflow-x-auto p-4">
//             <table className="min-w-full table-auto border-collapse">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="border p-2">HR Name</th>
//                   <th className="border p-2">Plan</th>
//                   <th className="border p-2">Amount</th>
//                   <th className="border p-2">Method</th>
//                   <th className="border p-2">Status</th>
//                   <th className="border p-2">Date</th>
//                   <th className="border p-2">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {recentTransactions.length > 0 ? (
//                   recentTransactions.map((t, i) => (
//                     <tr key={i} className="hover:bg-gray-50">
//                       <td className="border p-2">{t.hrName}</td>
//                       <td className="border p-2">
//                         <span className={`px-2 py-1 rounded ${t.plan === "PREMIUM" ? "bg-blue-200" : t.plan === "BASIC" ? "bg-gray-200" : "bg-yellow-200"}`}>
//                           {t.plan}
//                         </span>
//                       </td>
//                       <td className="border p-2">₹{t.amount.toFixed(2)}</td>
//                       <td className="border p-2">{t.method}</td>
//                       <td className="border p-2">
//                         <span className={getBadgeClass(t.status)}>{t.status}</span>
//                       </td>
//                       <td className="border p-2">{t.date}</td>
//                       <td className="border p-2">
//                         <button className="border border-blue-500 text-blue-500 px-2 py-1 rounded">
//                           <i className="fas fa-eye"></i>
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="7" className="text-center p-4 text-gray-500">
//                       <i className="fas fa-inbox fa-2x mb-2"></i>
//                       <p>No transactions found.</p>
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Export Section */}
//         <div className="bg-white rounded shadow mt-4 p-4">
//           <h5 className="font-bold mb-2">Data Export</h5>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//             <button className="border border-blue-500 text-blue-500 px-4 py-2 rounded flex items-center justify-center gap-2">
//               <i className="fas fa-file-excel"></i> Export to Excel
//             </button>
//             <button className="border border-green-500 text-green-500 px-4 py-2 rounded flex items-center justify-center gap-2">
//               <i className="fas fa-file-csv"></i> Export to CSV
//             </button>
//             <button className="border border-blue-300 text-blue-300 px-4 py-2 rounded flex items-center justify-center gap-2">
//               <i className="fas fa-chart-bar"></i> Generate Report
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="bg-gray-800 text-white py-4 mt-8 text-center">
//         &copy; 2024 VirtueHire Admin. All rights reserved.
//       </footer>
//     </div>
//   );
// };

// export default AdminPaymentDashboard;


// src/pages/admin/PaymentDashboard.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentDashboard = () => {
  const [payments, setPayments] = useState([]);
  const [stats, setStats] = useState({
    totalPayments: 0,
    successfulPayments: 0,
    failedPayments: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axios.get("http://localhost:8081/api/payments/history", { withCredentials: true });
        const data = res.data || [];

        const totalPayments = data.length;
        const successfulPayments = data.filter(p => p.status === "SUCCESS").length;
        const failedPayments = totalPayments - successfulPayments;
        const totalRevenue = data.reduce((sum, p) => sum + (p.amount || 0), 0);

        setPayments(data);
        setStats({ totalPayments, successfulPayments, failedPayments, totalRevenue });
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load payments.");
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case "SUCCESS": return "badge bg-success";
      case "FAILED": return "badge bg-danger";
      case "PENDING": return "badge bg-warning";
      default: return "badge bg-secondary";
    }
  };

  if (loading) return <p>Loading payment dashboard...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container-fluid my-4">
      <h1 className="mb-4"><i className="fas fa-chart-line me-2"></i>Payment Dashboard</h1>

      {/* Stats Cards */}
      <div className="row g-4 mb-4">
        <div className="col-xl-3 col-md-6">
          <div className="card text-white bg-primary">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h5>{stats.totalRevenue.toFixed(2)}</h5>
                <p>Total Revenue</p>
              </div>
              <i className="fas fa-rupee-sign fa-2x"></i>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="card text-white bg-success">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h5>{stats.totalPayments}</h5>
                <p>Total Payments</p>
              </div>
              <i className="fas fa-receipt fa-2x"></i>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="card text-white bg-warning">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h5>{stats.successfulPayments}</h5>
                <p>Successful</p>
              </div>
              <i className="fas fa-check-circle fa-2x"></i>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="card text-white bg-danger">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h5>{stats.failedPayments}</h5>
                <p>Failed</p>
              </div>
              <i className="fas fa-times-circle fa-2x"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="card mt-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Recent Transactions</h5>
          <button className="btn btn-sm btn-outline-primary" onClick={() => window.location.reload()}>
            <i className="fas fa-sync-alt me-1"></i>Refresh
          </button>
        </div>
        <div className="card-body table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>HR Name</th>
                <th>Plan</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.length > 0 ? (
                payments.map((payment) => (
                  <tr key={payment.id}>
                    <td>{payment.hr?.fullName || "N/A"}</td>
                    <td><span className="badge bg-secondary">{payment.planType}</span></td>
                    <td>₹{payment.amount?.toFixed(2)}</td>
                    <td><span className={getStatusClass(payment.status)}>{payment.status}</span></td>
                    <td>{new Date(payment.createdAt).toLocaleString()}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-info"
                        onClick={() => navigate(`/admin/payments/${payment.id}`)}
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-muted py-4">
                    <i className="fas fa-inbox fa-2x mb-2"></i>
                    <p>No transactions found.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Export Section */}
      <div className="card mt-4">
        <div className="card-header">
          <h5 className="mb-0">Data Export</h5>
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <button className="btn btn-outline-primary w-100"><i className="fas fa-file-excel me-2"></i>Export to Excel</button>
            </div>
            <div className="col-md-4">
              <button className="btn btn-outline-success w-100"><i className="fas fa-file-csv me-2"></i>Export to CSV</button>
            </div>
            <div className="col-md-4">
              <button className="btn btn-outline-info w-100"><i className="fas fa-chart-bar me-2"></i>Generate Report</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDashboard;
