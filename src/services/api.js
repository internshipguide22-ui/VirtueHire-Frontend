// src/services/api.js
import axios from "axios";

// Adjust this baseURL if your backend runs on a different port
const api = axios.create({
  baseURL: "http://localhost:8081/api",  // your Spring Boot backend
  withCredentials: true, // ✅ send cookies/session data with requests
});

export default api;



// // src/services/api.js
// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:8081/api",
//   withCredentials: true,
// });

// // 🔑 Attach logged-in user info to EVERY request
// api.interceptors.request.use(
//   (config) => {
//     const user = JSON.parse(localStorage.getItem("user"));

//     if (user?.email && user?.role) {
//       config.headers["X-User-Email"] = user.email;
//       config.headers["X-User-Role"] = user.role;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default api;
