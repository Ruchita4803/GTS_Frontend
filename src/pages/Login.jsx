import React, { useState } from "react";
import "../Component/Login.css";
import { FaUserShield } from "react-icons/fa";
import { Link } from "react-router-dom";
import { login } from "../Api/Function"; // Importing login function
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Calling login function
    const isLoggedIn = await login(email, password);

    if (isLoggedIn) {
      // Redirect to the home page on successful login
      navigate("/");
    }
  };

  return (
    <div className="login-body">
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="logo">
            <FaUserShield className="icon_header" />
            PatrolMaster360
          </div>
          <h2>Login</h2>
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
          <button type="submit" className="login-button">
            Login
          </button>
          <div className="login-links">
            <a href="/forgot-password" className="forgot-password">
              Forgot password?
            </a>
            <Link to="/signup" className="signup">
              Don't have an account? Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
