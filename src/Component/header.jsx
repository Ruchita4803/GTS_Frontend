import React, { useState } from 'react';
import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify } from 'react-icons/bs';
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
        <div className="header-right">
          <BsFillBellFill className="icon" />
          <BsFillEnvelopeFill className="icon" />
          <BsPersonCircle className="icon profileicon" onClick={handleProfileClick} />
          <div className="dropdown-content">
            <div className="pd-item" onClick={handleProfileClick}>Profile</div>
            <div className="pd-item">Logout</div>
          </div>
        </div>
      </header>
      {isProfileOpen && <Profile isOpen={isProfileOpen} onClose={handleProfileClick} />}
    </>
  );
}

export default Header;
