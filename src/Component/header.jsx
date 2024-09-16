import React, { useState } from 'react';
import { BsFillBellFill, BsPersonCircle, BsJustify } from 'react-icons/bs';
import Profile from './Profile';
import LogOut from './LogOut';
import './Profile.css';

function Header({ OpenSidebar }) {
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null); // Managing the user profile state

  const handleProfileClick = () => {
    setProfileOpen(!isProfileOpen);
  };

  const handleLogout = () => {
    // Clear user profile data and any other necessary state
    setUserProfile(null);
    setProfileOpen(false);
  };

  return (
    <>
      <header className="header">
        <div className="header-left menu-icon">
          <BsJustify className="icon" onClick={OpenSidebar} />
        </div>
        <BsFillBellFill className="icon" />
        <div className="header-right">
          <div className='profileicon'>
            <BsPersonCircle className="icon" />
            <div className="dropdown-content">
              <div className="pd-item" onClick={handleProfileClick}>Profile</div>
              <div className="pd-item">
                <LogOut onLogout={handleLogout} />
              </div>
            </div>
          </div>
        </div>
      </header>
      {isProfileOpen && <Profile isOpen={isProfileOpen} onClose={handleProfileClick} />}
    </>
  );
}

export default Header;
