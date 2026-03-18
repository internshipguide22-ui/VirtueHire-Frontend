// // PaymentSuccess.jsx
// import React from "react";

// const PaymentSuccess = ({ paymentResult }) => {
//   return (
//     <div className="container my-5">
//       <div className="row justify-content-center">
//         <div className="col-md-6 text-center">
//           {/* Success Icon */}
//           <div
//             className="mb-4"
//             style={{
//               animation: "bounce 1s ease-in-out",
//             }}
//           >
//             <i
//               className="fas fa-check-circle text-success"
//               style={{ fontSize: "5rem" }}
//             ></i>
//           </div>

//           {/* Success Message */}
//           <h1 className="text-success mb-3">Payment Successful!</h1>
//           <p className="lead mb-4">
//             Thank you for your purchase. Your payment has been processed
//             successfully.
//           </p>

//           {/* Payment Details */}
//           {paymentResult && (
//             <div className="card border-success mb-4">
//               <div className="card-body">
//                 <h5 className="card-title">Payment Details</h5>
//                 <div className="row text-start">
//                   <div className="col-6">
//                     <p>
//                       <strong>Transaction ID:</strong>
//                     </p>
//                     <p>
//                       <strong>Amount Paid:</strong>
//                     </p>
//                     <p>
//                       <strong>Plan:</strong>
//                     </p>
//                     <p>
//                       <strong>Date:</strong>
//                     </p>
//                   </div>
//                   <div className="col-6">
//                     <p>{paymentResult.transactionId}</p>
//                     <p>₹{paymentResult.payment?.amount?.toFixed(2)}</p>
//                     <p>{paymentResult.payment?.planType}</p>
//                     <p>
//                       {paymentResult.payment?.completedAt
//                         ? new Date(paymentResult.payment.completedAt).toLocaleString(
//                             "en-GB",
//                             {
//                               day: "2-digit",
//                               month: "short",
//                               year: "numeric",
//                               hour: "2-digit",
//                               minute: "2-digit",
//                             }
//                           )
//                         : "-"}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Next Steps */}
//           <div className="alert alert-info mb-4">
//             <h6>
//               <i className="fas fa-rocket me-2"></i>What's Next?
//             </h6>
//             <p className="mb-0">
//               Your account has been upgraded. You can now access all the
//               premium features immediately.
//             </p>
//           </div>

//           {/* Action Buttons */}
//           <div className="d-grid gap-2 d-md-block">
//             <a
//               href="/hrs/dashboard"
//               className="btn btn-primary btn-lg me-md-2 mb-2"
//             >
//               <i className="fas fa-tachometer-alt me-2"></i>Go to Dashboard
//             </a>
//             <a
//               href="/payments/history"
//               className="btn btn-outline-secondary btn-lg mb-2"
//             >
//               <i className="fas fa-receipt me-2"></i>View Payment History
//             </a>
//           </div>

//           {/* Support Info */}
//           <div className="mt-4">
//             <p className="text-muted">
//               Need help?{" "}
//               <a href="mailto:support@virtuehire.com">
//                 Contact our support team
//               </a>
//             </p>
//           </div>

//           {/* Bounce Animation Keyframes */}
//           <style>
//             {`
//               @keyframes bounce {
//                 0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
//                 40% { transform: translateY(-10px); }
//                 60% { transform: translateY(-5px); }
//               }
//             `}
//           </style>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentSuccess;


import React from "react";
import { useNavigate } from "react-router-dom";

function PaymentSuccess() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Payment Successful 🎉</h2>
      <button onClick={() => navigate("/hr/dashboard")}>
        Go to Dashboard
      </button>
      <button onClick={() => navigate("/payments/history")}>
        Payment History
      </button>
    </div>
  );
}

export default PaymentSuccess;
