
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Login.css';
import { FaShield } from "react-icons/fa6";
import { Signupdata,Otp } from "../Api/Function";

const OTP = ({ handleOTP, userData }) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  

   const storeData = async (e) => {
    e.preventDefault();
    try {
      // verify otp 
      const verifyotp= Otp(otp);
      if (verifyotp) {
        // Save user data to the database
        const signup= Signupdata( userData);
        if (signup) {
          handleOTP();
          navigate("/");
        }
      }
    } catch (error) {
      setError(error);
      alert('An error occurred. Please try again.');
    }
//  alert(userData.firstName);
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
