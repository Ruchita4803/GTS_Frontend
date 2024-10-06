import {React, useState} from 'react';
import { useNavigate } from 'react-router-dom';

const LogOut = ( ) => {
  const navigate = useNavigate();
   const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("authToken"); // Remove token on logout 
    navigate('/login');
  };
  // };

  return (
    <div className="logout-container">
      <div className="logout-button" onClick={handleLogout}>Log Out</div>
    </div>
  );
};

export default LogOut;