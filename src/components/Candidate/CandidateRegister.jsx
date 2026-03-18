// // src/components/Candidate/CandidateRegister.jsx
// import React, { useState } from "react";
// import api from "../../services/api";
// import "./CandidateRegister.css";

// export default function CandidateRegister() {
//   const [form, setForm] = useState({
//     fullName: "",
//     email: "",
//     phoneNumber: "",
//     alternatePhoneNumber: "",
//     password: "",
//     confirmPassword: "",
//     gender: "",
//     city: "",
//     state: "",
//     highestEducation: "",
//     collegeUniversity: "",
//     yearOfGraduation: "",
//     skills: "",
//     experience: "",
//   });

//   const [resumeFile, setResumeFile] = useState(null);
//   const [profilePicFile, setProfilePicFile] = useState(null);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   // update text inputs
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   // submit registration
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     setError("");

//     try {
//       const data = new FormData();
//       Object.keys(form).forEach((key) => data.append(key, form[key]));
//       if (resumeFile) data.append("resumeFile", resumeFile);
//       if (profilePicFile) data.append("profilePicFile", profilePicFile);

//       const res = await api.post("/candidates/register", data, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       setMessage(res.data.message || "Candidate registered successfully!");
//       setForm({
//         fullName: "",
//         email: "",
//         phoneNumber: "",
//         alternatePhoneNumber: "",
//         password: "",
//         confirmPassword: "",
//         gender: "",
//         city: "",
//         state: "",
//         highestEducation: "",
//         collegeUniversity: "",
//         yearOfGraduation: "",
//         skills: "",
//         experience: "",
//       });
//       setResumeFile(null);
//       setProfilePicFile(null);
//     } catch (err) {
//       console.error(err);
//       setError("Registration failed. Please try again.");
//     }
//   };

//   return (
//     <div className="register-body">
//       <form onSubmit={handleSubmit} className="register-form">
//         <h2>Candidate Registration</h2>

//         {message && <div className="success-msg">{message}</div>}
//         {error && <div className="error-msg">{error}</div>}

//         <label>Full Name:</label>
//         <input name="fullName" value={form.fullName} onChange={handleChange} required />

//         <label>Email:</label>
//         <input name="email" type="email" value={form.email} onChange={handleChange} required />

//         <label>Phone Number:</label>
//         <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} required />

//         <label>Alternate Phone:</label>
//         <input name="alternatePhoneNumber" value={form.alternatePhoneNumber} onChange={handleChange} />

//         <label>Password:</label>
//         <input name="password" type="password" value={form.password} onChange={handleChange} required />

//         <label>Confirm Password:</label>
//         <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} required />

//         <label>Gender:</label>
//         <select name="gender" value={form.gender} onChange={handleChange}>
//           <option value="">Select</option>
//           <option value="Male">Male</option>
//           <option value="Female">Female</option>
//           <option value="Other">Other</option>
//         </select>

//         <label>City:</label>
//         <input name="city" value={form.city} onChange={handleChange} />

//         <label>State:</label>
//         <input name="state" value={form.state} onChange={handleChange} />

//         <label>Highest Education:</label>
//         <input name="highestEducation" value={form.highestEducation} onChange={handleChange} />

//         <label>College/University:</label>
//         <input name="collegeUniversity" value={form.collegeUniversity} onChange={handleChange} />

//         <label>Year of Graduation:</label>
//         <input name="yearOfGraduation" type="number" value={form.yearOfGraduation} onChange={handleChange} />

//         <label>Skills:</label>
//         <input name="skills" value={form.skills} onChange={handleChange} />

//         <label>Experience (years):</label>
//         <input name="experience" type="number" value={form.experience} onChange={handleChange} />

//         <label>Upload Resume:</label>
//         <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setResumeFile(e.target.files[0])} />

//         <label>Upload Profile Picture:</label>
//         <input type="file" accept="image/*" onChange={(e) => setProfilePicFile(e.target.files[0])} />

//         <button type="submit">Register</button>

//         <p>
//           <a href="/candidates/login">Already registered? Login here</a>
//         </p>
//       </form>
//     </div>
//   );
// }




// src/components/Candidate/CandidateRegister.jsx
import React, { useState } from "react";
import api from "../../services/api";
import "./CandidateRegister.css";

export default function CandidateRegister() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    alternatePhoneNumber: "",
    password: "",
    confirmPassword: "",
    gender: "",
    city: "",
    state: "",
    highestEducation: "",
    collegeUniversity: "",
    yearOfGraduation: "",
    skills: "",
    experience: "",
    dateOfBirth: "", // <-- added DOB field
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // update text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // submit registration
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const data = new FormData();
      Object.keys(form).forEach((key) => data.append(key, form[key]));
      if (resumeFile) data.append("resumeFile", resumeFile);
      if (profilePicFile) data.append("profilePicFile", profilePicFile);

      const res = await api.post("/candidates/register", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(res.data.message || "Candidate registered successfully!");
      setForm({
        fullName: "",
        email: "",
        phoneNumber: "",
        alternatePhoneNumber: "",
        password: "",
        confirmPassword: "",
        gender: "",
        city: "",
        state: "",
        highestEducation: "",
        collegeUniversity: "",
        yearOfGraduation: "",
        skills: "",
        experience: "",
        dateOfBirth: "", // <-- reset DOB
      });
      setResumeFile(null);
      setProfilePicFile(null);
    } catch (err) {
      console.error(err);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="register-body">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Candidate Registration</h2>

        {message && <div className="success-msg">{message}</div>}
        {error && <div className="error-msg">{error}</div>}

        <label>Full Name:</label>
        <input name="fullName" value={form.fullName} onChange={handleChange} required />

        <label>Email:</label>
        <input name="email" type="email" value={form.email} onChange={handleChange} required />

        <label>Phone Number:</label>
        <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} required />

        <label>Alternate Phone:</label>
        <input name="alternatePhoneNumber" value={form.alternatePhoneNumber} onChange={handleChange} />

        <label>Password:</label>
        <input name="password" type="password" value={form.password} onChange={handleChange} required />

        <label>Confirm Password:</label>
        <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} required />

        <label>Gender:</label>
        <select name="gender" value={form.gender} onChange={handleChange}>
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label>Date of Birth:</label>
        <input name="dateOfBirth" type="date" value={form.dateOfBirth} onChange={handleChange} /> {/* <-- DOB added */}

        <label>City:</label>
        <input name="city" value={form.city} onChange={handleChange} />

        <label>State:</label>
        <input name="state" value={form.state} onChange={handleChange} />

        <label>Highest Education:</label>
        <input name="highestEducation" value={form.highestEducation} onChange={handleChange} />

        <label>College/University:</label>
        <input name="collegeUniversity" value={form.collegeUniversity} onChange={handleChange} />

        <label>Year of Graduation:</label>
        <input name="yearOfGraduation" type="number" value={form.yearOfGraduation} onChange={handleChange} />

        <label>Skills:</label>
        <input name="skills" value={form.skills} onChange={handleChange} />

        <label>Work Experience:</label>
        <input name="experience" type="number" value={form.experience} onChange={handleChange} />

        <label>Upload Resume:</label>
        <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setResumeFile(e.target.files[0])} />

        <label>Upload Profile Picture:</label>
        <input type="file" accept="image/*" onChange={(e) => setProfilePicFile(e.target.files[0])} />

        <button type="submit">Register</button>

        <p>
          <a href="/candidates/login">Already registered? Login here</a>
        </p>

        <p>
  <a href="/portfolio">Create your portfolio</a>
</p>
      </form>
    </div>
  );
}
