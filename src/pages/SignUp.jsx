// export default Signup;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Component/Login.css";
import { FaUserShield } from "react-icons/fa";

const Signup = ({ handleSignup}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const storeData = async (e) => {

    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    const data = { firstName, lastName, email, password, contactNo };
    handleSignup(data);
    navigate("/otp");
  };

  return (
    <div className="signup-body">
      <div className="signup-container">
        <form className="signup-form" onSubmit={storeData}>
          <div className="logo">
            <FaUserShield className="icon_header" />
            PatrolMaster360
          </div>
          <h2>Sign Up</h2>
          <div className="signup-name">
            <div className="form-group">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="contactNo">Contact No:</label>
            <input
              type="text"
              id="contactNo"
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="signup-button">
            Sign Up
          </button>
          <div className="signup-links">
            <a href="/login" className="login-link">
              Already have an account? Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
