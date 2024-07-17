import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import QRCode from 'qrcode.react';
import './AddForm.css';

const AddCheckpoints = ({ addCheckpointHandler, closeForm }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addCheckpointHandler({ title, description });
    setTitle('');
    setDescription('');
  };

  return (
    <div className="add-guard-container">
      <div className="form-header">
        <h2>Add New Checkpoint</h2>
        <FaTimes className="close-icon" onClick={closeForm} />
      </div>
      <div className="form-content">
        <form onSubmit={handleSubmit} className="left-form">
          <div className="form-group">
            <label htmlFor="title">Checkpoint Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit" className="add-guard-button">Submit</button>
        </form>
        <div className="qr-code-section">
          <QRCode value={`${title} - ${description}`} size={150} />
          <button className="add-guard-button" onClick={() => {
            const canvas = document.querySelector('canvas');
            const img = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = img;
            link.download = `${title}_QRCode.png`;
            link.click();
          }}>Download QR Code</button>
        </div>
      </div>
    </div>
  );
};

export default AddCheckpoints;
