import React, { useState } from 'react';
import './Profile.css';
import profilePhoto from '../profile_photo.png';

function EditProfile({ isOpen, onClose, userProfile, onSave }) {
  const [profile, setProfile] = useState(userProfile);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(profile);
    onClose();
  };

  return (
    <div className={`drawer ${isOpen ? 'open' : ''}`}>
      <div className="drawer-content">
        <span className="close-btn" onClick={onClose}>&times;</span>
        <h2>Edit Profile</h2>
        <div className="profile-info">
          <img src={profilePhoto} alt="Profile Picture" className="profile-pic" />
          <form onSubmit={handleSubmit} className="profile-details">
            <div className="profile-item">
              <label>Name:</label>
              <input 
                type="text" 
                name="name" 
                value={profile.name} 
                onChange={handleChange} 
              />
            </div>
            <div className="profile-item">
              <label>Email:</label>
              <input 
                type="email" 
                name="email" 
                value={profile.email} 
                onChange={handleChange} 
              />
            </div>
            <div className="profile-item">
              <label>Mobile No:</label>
              <input 
                type="text" 
                name="mobile" 
                value={profile.mobile} 
                onChange={handleChange} 
              />
            </div>
            <div className="profile-item">
              <label>DOB:</label>
              <input 
                type="text" 
                name="dob" 
                value={profile.dob} 
                onChange={handleChange} 
              />
            </div>
            <button type="submit" className="edit-btn">Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
