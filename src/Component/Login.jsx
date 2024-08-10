// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './Login.css';
// import { FaUserShield } from "react-icons/fa";
// import { Link } from 'react-router-dom';

// const Login = ({ handleLogin }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const storeData = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('/api/login', { email, password });
//       if (response.data.success) {
//         handleLogin();
//         navigate('/');
//       } else {
//         setError(response.data.message);
//       }
//     } catch (error) {
//       setError('An error occurred. Please try again.');
//     }
//   };

//   return (
//     <div className="login-body">
//       <div className="login-container">
//         <form className="login-form" onSubmit={storeData}>
//           <div className="logo">
//             <FaUserShield className="icon_header" />
//             PatrolMaster360
//           </div>
//           <h2>Login</h2>
//           <div className="form-group">
//             <label htmlFor="email">Email:</label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="password">Password:</label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           {error && <p className="error-message">{error}</p>}
//           <button type="submit" className="login-button">Login</button>
//           <div className="login-links">
//             <a href="/forgot-password" className="forgot-password">Forgot password?</a>
//             <Link to="/signup" className="signup">Don't have an account? Sign Up</Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { FaUserShield } from "react-icons/fa";
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
 
    try {
      const response = await axios.post('https://your-api-endpoint.com/login', {
        email,
        password,
      });
      if (response.data.success) {
        handleLogin();
        navigate('/'); // Navigate to the home page
      } else {
        alert('Invalid email or password.');
      }
    } catch (error) {
      alert('An error occurred while logging in.');
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
        <button type="submit" className="login-button">Login</button>
        <div className="login-links">
          <a href="/forgot-password" className="forgot-password">Forgot password?</a>
          <Link to="/signup" className="signup">Don't have an account? Sign Up</Link>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Login;