// // PaymentFailed.jsx
// import React from "react";

// const PaymentFailed = ({ paymentResult, error }) => {
//   return (
//     <div className="container my-5">
//       <div className="row justify-content-center">
//         <div className="col-md-6 text-center">
//           {/* Failure Icon */}
//           <div className="mb-4">
//             <i className="fas fa-times-circle text-danger" style={{ fontSize: "5rem" }}></i>
//           </div>

//           {/* Error Message */}
//           <h1 className="text-danger mb-3">Payment Failed</h1>

//           {paymentResult && (
//             <>
//               <p className="lead mb-4">{paymentResult.message}</p>
//               <div className="alert alert-warning mb-4 text-start">
//                 <h6><i className="fas fa-exclamation-triangle me-2"></i>Transaction Details</h6>
//                 <p className="mb-1"><strong>Error:</strong> {paymentResult.message}</p>
//                 <p className="mb-0"><strong>Transaction ID:</strong> {paymentResult.transactionId}</p>
//               </div>
//             </>
//           )}

//           {error && (
//             <p className="lead mb-4">{error}</p>
//           )}

//           {/* Common Reasons */}
//           <div className="card border-danger mb-4">
//             <div className="card-header bg-danger text-white">
//               <h6 className="mb-0">Common Reasons for Failure</h6>
//             </div>
//             <div className="card-body text-start">
//               <ul className="mb-0">
//                 <li>Insufficient funds in your account</li>
//                 <li>Incorrect card details entered</li>
//                 <li>Card expiration date has passed</li>
//                 <li>Network connectivity issues</li>
//                 <li>Bank server maintenance</li>
//               </ul>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="d-grid gap-2 d-md-block mb-3">
//             <a href="/payments/plans" className="btn btn-primary btn-lg me-md-2">
//               <i className="fas fa-arrow-left me-2"></i>Try Again
//             </a>
//             <a href="/hrs/dashboard" className="btn btn-outline-secondary btn-lg">
//               <i className="fas fa-home me-2"></i>Return to Dashboard
//             </a>
//           </div>

//           {/* Support Info */}
//           <div className="mt-4">
//             <p className="text-muted">
//               If the problem persists, please{" "}
//               <a href="mailto:support@virtuehire.com">contact our support team</a> or call us at{" "}
//               <strong>+91-1800-123-4567</strong>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentFailed;


import React from "react";
import { useNavigate } from "react-router-dom";

function PaymentFailed() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Payment Failed ❌</h2>
      <button onClick={() => navigate("/payments/plans")}>
        Try Again
      </button>
    </div>
  );
}

export default PaymentFailed;
