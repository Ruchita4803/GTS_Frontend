
import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import './AddForm.css';

const AddGuard = ({ addGuardHandler, closeForm }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addGuardHandler({ name, email, mobile, address });
    setName('');
    setEmail('');
    setMobile('');
    setAddress('');
  };

  return (
    <div className="add-guard-container">
      <div className="form-header">
        <h2>Add New Guard</h2>
        <FaTimes className="close-icon" onClick={closeForm} />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Guard Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email ID:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobile">Mobile No.:</label>
          <input
            type="tel"
            id="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="add-guard-button">Submit</button>
      </form>
    </div>
  );
};

export default AddGuard;
