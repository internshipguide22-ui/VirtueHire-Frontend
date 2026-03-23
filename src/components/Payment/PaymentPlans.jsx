// // PaymentPlans.jsx
// import React from "react";

// const PaymentPlans = ({ monthlyPrice = 4999, tenPrice = 1999, singlePrice = 299 }) => {
//   const plans = [
//     {
//       title: "Monthly Unlimited",
//       price: monthlyPrice,
//       type: "MONTHLY_UNLIMITED",
//       billing: "per month",
//       features: [
//         "Unlimited candidate views",
//         "Valid for 30 days",
//         "Best for active recruiters",
//         "Download all resumes",
//         "Access candidate contact info",
//         "Priority support",
//       ],
//       buttonClass: "btn-success",
//       badge: "MOST POPULAR",
//       footer: "Best value for high-volume hiring",
//     },
//     {
//       title: "10 Candidates",
//       price: tenPrice,
//       type: "TEN_CANDIDATES",
//       billing: "one-time payment",
//       features: [
//         "View 10 candidates",
//         "No expiry date",
//         "Use views anytime",
//         "Download resumes",
//         "Access contact information",
//         "Perfect for project hiring",
//       ],
//       buttonClass: "btn-primary",
//       footer: "Great for medium-scale hiring",
//     },
//     {
//       title: "Single Candidate",
//       price: singlePrice,
//       type: "SINGLE_CANDIDATE",
//       billing: "per view",
//       features: [
//         "View 1 candidate",
//         "Instant access",
//         "No commitment",
//         "Download resume",
//         "Get contact details",
//         "Try before you buy",
//       ],
//       buttonClass: "btn-info",
//       footer: "Perfect for one-time hiring",
//     },
//   ];

//   return (
//     <div className="container mt-5 mb-5">
//       <h2 className="text-center mb-4">Choose Your Plan</h2>
//       <p className="text-center text-muted mb-5">Select the plan that best fits your recruitment needs</p>

//       <div className="row">
//         {plans.map((plan, index) => (
//           <div className="col-md-4 mb-4" key={index}>
//             <div className="card plan-card text-center h-100" style={{ position: "relative" }}>
//               {plan.badge && <span className="popular-badge">{plan.badge}</span>}
//               <div className={`card-header text-white py-4 bg-${plan.buttonClass.split("-")[1]}`}>
//                 <h3>{plan.title}</h3>
//               </div>
//               <div className="card-body d-flex flex-column">
//                 <div className="mb-4">
//                   <h1 className="display-4">₹{plan.price}</h1>
//                   <p className="text-muted">{plan.billing}</p>
//                 </div>
//                 <ul className="list-unstyled text-start mb-4">
//                   {plan.features.map((feature, i) => (
//                     <li className="mb-2" key={i}>✓ <strong>{feature.split(" ")[0]}</strong> {feature.split(" ").slice(1).join(" ")}</li>
//                   ))}
//                 </ul>
//                 <form action="/payments/process-payment" method="post" className="mt-auto">
//                   <input type="hidden" name="planType" value={plan.type} />
//                   <button type="submit" className={`btn ${plan.buttonClass} btn-lg w-100`}>
//                     Buy Now
//                   </button>
//                 </form>
//               </div>
//               <div className="card-footer text-muted">
//                 <small>{plan.footer}</small>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="text-center mt-5">
//         <a href="/hrs/dashboard" className="btn btn-secondary btn-lg">Back to Dashboard</a>
//       </div>

//       <div className="mt-5 p-4 bg-light rounded">
//         <h4>Frequently Asked Questions</h4>
//         <div className="accordion" id="faqAccordion">
//           <div className="accordion-item">
//             <h2 className="accordion-header">
//               <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
//                 What happens when my Monthly Unlimited plan expires?
//               </button>
//             </h2>
//             <div id="faq1" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
//               <div className="accordion-body">
//                 Your plan will automatically expire after 30 days. You'll need to purchase a new plan to continue viewing candidate details.
//               </div>
//             </div>
//           </div>
//           <div className="accordion-item">
//             <h2 className="accordion-header">
//               <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
//                 Can I purchase multiple plans?
//               </button>
//             </h2>
//             <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
//               <div className="accordion-body">
//                 Yes! If you purchase 10 Candidates or Single Candidate plans, the views will be added to your account. However, Monthly Unlimited will replace any existing plan.
//               </div>
//             </div>
//           </div>
//           <div className="accordion-item">
//             <h2 className="accordion-header">
//               <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
//                 Do the 10 Candidates views expire?
//               </button>
//             </h2>
//             <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
//               <div className="accordion-body">
//                 No! The 10 Candidates and Single Candidate plans never expire. Use your views whenever you need them.
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentPlans;


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const PaymentPlans = () => {
//   const navigate = useNavigate();
//   const [hr, setHr] = useState(null);
//   const [monthlyPrice, setMonthlyPrice] = useState(0);
//   const [tenPrice, setTenPrice] = useState(0);
//   const [singlePrice, setSinglePrice] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     axios
//       .get("https://backend.virtuehire.in/api/payments/plans", { withCredentials: true })
//       .then((res) => {
//         setHr(res.data.hr);
//         setMonthlyPrice(res.data.monthlyPrice);
//         setTenPrice(res.data.tenPrice);
//         setSinglePrice(res.data.singlePrice);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setError("Failed to load plans. Please login.");
//         setLoading(false);
//         navigate("/login");
//       });
//   }, [navigate]);

//   const handleBuy = async (planType) => {
//     try {
//       const res = await axios.post(
//         "https://backend.virtuehire.in/api/payments/process-payment",
//         null,
//         {
//           params: { planType },
//           withCredentials: true,
//         }
//       );

//       if (res.data.success) {
//         alert("Payment successful!");
//         if (res.data.redirectCandidateId) {
//           navigate(`/hr/candidates/${res.data.redirectCandidateId}`);
//         } else {
//           navigate("/hr/dashboard");
//         }
//       } else {
//         alert(res.data.error || "Payment failed.");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Payment failed. Try again.");
//     }
//   };

//   if (loading) return <div className="container mt-5">Loading plans...</div>;
//   if (error) return <div className="container mt-5 text-danger">{error}</div>;

//   return (
//     <div className="container mt-5 mb-5">
//       <h2 className="text-center mb-4">Choose Your Plan</h2>
//       <p className="text-center text-muted mb-5">
//         Select the plan that best fits your recruitment needs
//       </p>

//       {/* Current Plan Info */}
//       {hr && (
//         <div className="alert alert-info">
//           <strong>Current Plan:</strong> {hr.planDisplay || "No Active Plan"}
//           {hr.remainingViews !== undefined &&
//             ` (${hr.remainingViews} views remaining)`}
//         </div>
//       )}

//       <div className="row">
//         {/* Monthly Unlimited */}
//         <div className="col-md-4 mb-4">
//           <div className="card text-center h-100" style={{ position: "relative" }}>
//             <span className="badge bg-danger position-absolute top-0 end-0 m-3">MOST POPULAR</span>
//             <div className="card-header bg-success text-white py-4">
//               <h3>Monthly Unlimited</h3>
//             </div>
//             <div className="card-body d-flex flex-column">
//               <div className="mb-4">
//                 <h1 className="display-4">₹{monthlyPrice}</h1>
//                 <p className="text-muted">per month</p>
//               </div>
//               <ul className="list-unstyled text-start mb-4">
//                 <li>✓ Unlimited candidate views</li>
//                 <li>✓ Valid for 30 days</li>
//                 <li>✓ Best for active recruiters</li>
//                 <li>✓ Download all resumes</li>
//                 <li>✓ Access candidate contact info</li>
//                 <li>✓ Priority support</li>
//               </ul>
//               <button
//                 className="btn btn-success btn-lg mt-auto"
//                 onClick={() => handleBuy("MONTHLY_UNLIMITED")}
//               >
//                 Buy Now
//               </button>
//             </div>
//             <div className="card-footer text-muted">
//               Best value for high-volume hiring
//             </div>
//           </div>
//         </div>

//         {/* 10 Candidates */}
//         <div className="col-md-4 mb-4">
//           <div className="card text-center h-100">
//             <div className="card-header bg-primary text-white py-4">
//               <h3>10 Candidates</h3>
//             </div>
//             <div className="card-body d-flex flex-column">
//               <div className="mb-4">
//                 <h1 className="display-4">₹{tenPrice}</h1>
//                 <p className="text-muted">one-time payment</p>
//               </div>
//               <ul className="list-unstyled text-start mb-4">
//                 <li>✓ View 10 candidates</li>
//                 <li>✓ No expiry date</li>
//                 <li>✓ Use views anytime</li>
//                 <li>✓ Download resumes</li>
//                 <li>✓ Access contact information</li>
//                 <li>✓ Perfect for project hiring</li>
//               </ul>
//               <button
//                 className="btn btn-primary btn-lg mt-auto"
//                 onClick={() => handleBuy("TEN_CANDIDATES")}
//               >
//                 Buy Now
//               </button>
//             </div>
//             <div className="card-footer text-muted">
//               Great for medium-scale hiring
//             </div>
//           </div>
//         </div>

//         {/* Single Candidate */}
//         <div className="col-md-4 mb-4">
//           <div className="card text-center h-100">
//             <div className="card-header bg-info text-white py-4">
//               <h3>Single Candidate</h3>
//             </div>
//             <div className="card-body d-flex flex-column">
//               <div className="mb-4">
//                 <h1 className="display-4">₹{singlePrice}</h1>
//                 <p className="text-muted">per view</p>
//               </div>
//               <ul className="list-unstyled text-start mb-4">
//                 <li>✓ View 1 candidate</li>
//                 <li>✓ Instant access</li>
//                 <li>✓ No commitment</li>
//                 <li>✓ Download resume</li>
//                 <li>✓ Get contact details</li>
//                 <li>✓ Try before you buy</li>
//               </ul>
//               <button
//                 className="btn btn-info btn-lg mt-auto"
//                 onClick={() => handleBuy("SINGLE_CANDIDATE")}
//               >
//                 Buy Now
//               </button>
//             </div>
//             <div className="card-footer text-muted">
//               Perfect for one-time hiring
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="text-center mt-5">
//         <button className="btn btn-secondary btn-lg" onClick={() => navigate("/hr/dashboard")}>
//           Back to Dashboard
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PaymentPlans;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function PaymentPlans() {
//   const [prices, setPrices] = useState({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get("/api/payments/plans", { withCredentials: true })
//       .then(res => setPrices(res.data));
//   }, []);

//   const buy = (planType) => {
//     axios.post("/api/payments/process-payment", null, {
//       params: { planType },
//       withCredentials: true
//     }).then(res => {
//       navigate("/payments/success");
//     }).catch(() => navigate("/payments/failed"));
//   };

//   return (
//     <div>
//       <h2>Choose Plan</h2>

//       <button onClick={() => buy("MONTHLY_UNLIMITED")}>
//         Monthly ₹{prices.monthlyPrice}
//       </button>

//       <button onClick={() => buy("TEN_CANDIDATES")}>
//         10 Candidates ₹{prices.tenPrice}
//       </button>

//       <button onClick={() => buy("SINGLE_CANDIDATE")}>
//         Single ₹{prices.singlePrice}
//       </button>
//     </div>
//   );
// }

// export default PaymentPlans;


// import React from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import api from "../../services/api";

// function PaymentPlans() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const candidateId = location.state?.fromCandidateId;

//   const buyPlan = (planType) => {
//     api
//       .post("/payments/process", {
//         planType: planType
//       })
//       .then((res) => {
//         const redirectCandidateId = res.data.redirectCandidateId;

//         // 🔥 RETURN TO SAME CANDIDATE
//         if (redirectCandidateId) {
//           navigate(`/hr/candidate/${redirectCandidateId}`);
//         } else {
//           navigate("/hr/dashboard");
//         }
//       })
//       .catch((err) => {
//         alert("Payment failed");
//       });
//   };

//   return (
//     <div>
//       <h2>Select Payment Plan</h2>

//       <button onClick={() => buyPlan("BASIC")}>
//         Buy Basic Plan
//       </button>

//       <button onClick={() => buyPlan("PREMIUM")}>
//         Buy Premium Plan
//       </button>
//     </div>
//   );
// }

// export default PaymentPlans;


// import React from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import api from "../../services/api";

// function PaymentPlans() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const buyPlan = (planType) => {
//     api
//       .post("/payments/process", null, {
//         params: { planType: planType }
//       })
//       .then((res) => {
//         const candidateId = res.data.redirectCandidateId;

//         if (candidateId) {
//           navigate(`/hr/candidates/${candidateId}`);
//         } else {
//           navigate("/hr/dashboard");
//         }
//       })
//       .catch((err) => {
//         console.error(err);
//         alert("Payment failed");
//       });
//   };

//   return (
//     <div>
//       <h2>Select Payment Plan</h2>

//       <button onClick={() => buyPlan("BASIC")}>
//         Buy Basic Plan
//       </button>

//       <button onClick={() => buyPlan("PREMIUM")}>
//         Buy Premium Plan
//       </button>
//     </div>
//   );
// }

// export default PaymentPlans;


import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function PaymentPlans() {
  const navigate = useNavigate();

  const buy = (planType) => {
    api
      .post("/payments/process", null, {
        params: { planType }
      })
      .then(() => {
        navigate("/payments/success");
      })
      .catch((err) => {
        console.error(err);
        navigate("/payments/failure");
      });
  };

  return (
    <div>
      <h2>Select Payment Plan</h2>

      <button onClick={() => buy("MONTHLY_UNLIMITED")}>
        Buy Basic Plan
      </button>

      <button onClick={() => buy("TEN_CANDIDATES")}>
        Buy Premium Plan
      </button>

      <button onClick={() => buy("SINGLE_CANDIDATE")}>
        Buy Single Candidate
      </button>
    </div>
  );
}

export default PaymentPlans;
