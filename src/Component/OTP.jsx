// import React, { useState, useEffect } from "react";
// import { FaShield } from "react-icons/fa6";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./Login.css";

// const OTP = ({ handleOTP }) => {
//   const [otp, setOtp] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const storeData = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('/api/verify-otp', { otp });
//       if (response.data.success) {
//         handleOTP();
//         navigate("/");
//       } else {
//         setError(response.data.message);
//       }
//     } catch (error) {
//       setError('An error occurred. Please try again.');
//     }
//   };

//   return (
//     <div className="otp-body">
//       <div className="otp-container">
//         <form className="otp-form" onSubmit={storeData}>
//           <div className="logo">
//             <FaShield className="icon-header" />
//             PatrolMaster360
//           </div>
//           <h2>ENTER OTP</h2>
//           <div className="form-group">
//             <label htmlFor="otp">OTP:</label>
//             <input
//               type="text"
//               id="otp"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               required
//             />
//           </div>
//           {error && <p className="error-message">{error}</p>}
//           <button type="submit" className="otp-button">Verify OTP</button>
//           <div className="signup-links">
//             <a href="/login" className="login-link">Already have an account? Login</a>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default OTP;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import { FaShield } from "react-icons/fa6";

const OTP = ({ handleOTP, userData }) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const storeData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/verify-otp', { otp });
      if (response.data.success) {
        // Save user data to the database
        const signupResponse = await axios.post('/api/signup', userData);
        if (signupResponse.data.success) {
          handleOTP();
          navigate('/');
        } else {
          setError(signupResponse.data.message);
        }
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="otp-body">
      <div className="otp-container">
        <form className="otp-form" onSubmit={storeData}>
          <div className="logo">
            <FaShield className="icon-header" />
            PatrolMaster360
          </div>
          <h2>ENTER OTP</h2>
          <div className="form-group">
            <label htmlFor="otp">OTP:</label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="otp-button">Verify OTP</button>
          <div className="signup-links">
            <a href="/login" className="login-link">Already have an account? Login</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OTP;
