// import React from 'react';
// import './Profile.css';
// import profilePhoto from '../profile_photo.png';

// function Profile({ isOpen, onClose }) {
//   return (
//     <div className={`drawer ${isOpen ? 'open' : ''}`}>
//       <div className="drawer-content">
//         <span className="close-btn" onClick={onClose}>&times;</span>
//         <h2>Profile</h2>
//         <div className="profile-info">
//           <img src={profilePhoto} alt="Profile Picture" className="profile-pic" />
//           <div className="profile-details">
//             <div className="profile-item">
//               <label>Name:</label>
//               <input type="text" defaultValue="John Doe" readOnly />
//             </div>
//             <div className="profile-item">
//               <label>Email:</label>
//               <input type="email" defaultValue="john.doe@example.com" readOnly />
//             </div>
//             <div className="profile-item">
//               <label>Mobile No:</label>
//               <input type="text" defaultValue="123-456-7890" readOnly />
//             </div>
//             <div className="profile-item">
//               <label>DOB:</label>
//               <input type="text" defaultValue="Jan 1, 1990" readOnly />
//             </div>
//           </div>
//           <button className="edit-btn">Edit Profile</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Profile;
import React, { useState } from 'react';
import './Profile.css';
import profilePhoto from '../profile_photo.png';
import EditProfile from './EditProfile';

function Profile({ isOpen, onClose }) {
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    mobile: '123-456-7890',
    dob: 'Jan 1, 1990',
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = (profile) => {
    setUserProfile(profile);
    setIsEditing(false);
  };

  return (
    <div className={`drawer ${isOpen ? 'open' : ''}`}>
      <div className="drawer-content">
        <span className="close-btn" onClick={onClose}>&times;</span>
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
              <img src={profilePhoto} alt="Profile Picture" className="profile-pic" />
              <div className="profile-details">
                <div className="profile-item">
                  <label>Name:</label>
                  <input type="text" defaultValue={userProfile.name} readOnly />
                </div>
                <div className="profile-item">
                  <label>Email:</label>
                  <input type="email" defaultValue={userProfile.email} readOnly />
                </div>
                <div className="profile-item">
                  <label>Mobile No:</label>
                  <input type="text" defaultValue={userProfile.mobile} readOnly />
                </div>
                <div className="profile-item">
                  <label>DOB:</label>
                  <input type="text" defaultValue={userProfile.dob} readOnly />
                </div>
              </div>
              <button className="edit-btn" onClick={handleEditClick}>Edit Profile</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
