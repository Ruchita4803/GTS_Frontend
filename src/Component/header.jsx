import React, { useState } from 'react';
import { BsFillBellFill, BsPersonCircle, BsJustify } from 'react-icons/bs';
import Profile from './Profile';
import './Profile.css';

function Header({ OpenSidebar }) {
  const [isProfileOpen, setProfileOpen] = useState(false);

  const handleProfileClick = () => {
    setProfileOpen(!isProfileOpen);
  };

  return (
    <>
      <header className="header">

       
        <div className="header-left menu-icon">
          <BsJustify className="icon" onClick={OpenSidebar} />
        </div>
        {/* <div className="header-left">
          <BsSearch className="icon" />
        </div> */}
        <BsFillBellFill className="icon" />
        <div className="header-right">
          
          <div className='profileicon'>
          <BsPersonCircle className="icon "  />
          <div className="dropdown-content">
            <div className="pd-item" onClick={handleProfileClick}>Profile</div>
            <div className="pd-item">Logout</div>
          </div>
          </div>
        </div>
      </header>
      {isProfileOpen && <Profile isOpen={isProfileOpen} onClose={handleProfileClick} />}
    </>
  );
}

export default Header;
