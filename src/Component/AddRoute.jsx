import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import './AddForm.css';

const AddRoute = ({ addRouteHandler, closeForm }) => {
  const [routeId, setRouteId] = useState('');
  const [selectedCheckpoints, setSelectedCheckpoints] = useState([]);

  const checkpoints = [
    'Entry Gate',
    'ClubHouse',
    'Gym',
    'Exit Gate',
    'PlayArea1',
    'PlayArea2',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    addRouteHandler({ routeId, checkpoints: selectedCheckpoints });
    setRouteId('');
    setSelectedCheckpoints([]);
  };

  const handleCheckpointChange = (checkpoint) => {
    setSelectedCheckpoints((prev) =>
      prev.includes(checkpoint)
        ? prev.filter((cp) => cp !== checkpoint)
        : [...prev, checkpoint]
    );
  };

  return (
    <div className="add-guard-container">
      <div className="form-header">
        <h2>Add New Route</h2>
        <FaTimes className="close-icon" onClick={closeForm} />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="routeId">Route ID:</label>
          <input
            type="text"
            id="routeId"
            value={routeId}
            onChange={(e) => setRouteId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Checkpoints:</label>
          {checkpoints.map((checkpoint) => (
            <div key={checkpoint}>
              <input
                type="checkbox"
                id={checkpoint}
                value={checkpoint}
                checked={selectedCheckpoints.includes(checkpoint)}
                onChange={() => handleCheckpointChange(checkpoint)}
              />
              <label htmlFor={checkpoint}>{checkpoint}</label>
            </div>
          ))}
        </div>
        <button type="submit" className="add-guard-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddRoute;
