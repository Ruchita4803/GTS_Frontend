import React, { useState, useEffect } from "react";
import "./Profile.css";
import profilePhoto from "../profile_photo.png";
import EditProfile from "./EditProfile";
import axios from "axios";

function Profile({ isOpen, onClose }) {
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          "/api/profile"
        );
        setUserProfile(response.data);
      } catch (error) {
        alert("Error fetching profile data:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = (updatedProfile) => {
    setUserProfile(updatedProfile);
    setIsEditing(false);
    onClose(); //CLose profile after saving
  };

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`drawer ${isOpen ? "open" : ""}`}>
      <div className="drawer-content">
        <span className="close-btn" onClick={onClose}>
          &times;
        </span>
        {isEditing ? (
          <EditProfile
            isOpen={isEditing}
            onClose={() => setIsEditing(false)}
            userProfile={userProfile}
            onSave={handleSave}
          />
        ) : (
          <>
            <h2>Profile</h2>
            <div className="profile-info">
              <img
                src={profilePhoto}
                alt="Profile Picture"
                className="profile-pic"
              />
              <div className="profile-details">
                <div className="profile-item">
                  <label>Name:</label>
                  <input type="text" value={userProfile.name} readOnly />
                </div>
                <div className="profile-item">
                  <label>Email:</label>
                  <input type="email" value={userProfile.email} readOnly />
                </div>
                <div className="profile-item">
                  <label>Mobile No:</label>
                  <input type="text" value={userProfile.mobile} readOnly />
                </div>
                <div className="profile-item">
                  <label>DOB:</label>
                  <input type="text" value={userProfile.dob} readOnly />
                </div>
              </div>
              <button className="edit-btn" onClick={handleEditClick}>
                Edit Profile
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
