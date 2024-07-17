import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import './AddForm.css';

const AddSchedule = ({ addScheduleHandler, closeForm, patrolTitles }) => {
  const [guardName, setGuardName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedPatrolTitle, setSelectedPatrolTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addScheduleHandler({ guardName, startDate, endDate, patrolTitle: selectedPatrolTitle });
    setGuardName('');
    setStartDate('');
    setEndDate('');
    setSelectedPatrolTitle('');
  };

  return (
    <div className="add-guard-container">
      <div className="form-header">
        <h2>Add New Schedule</h2>
        <FaTimes className="close-icon" onClick={closeForm} />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="guardName">Guard Name:</label>
          <input
            type="text"
            id="guardName"
            value={guardName}
            onChange={(e) => setGuardName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Patrol Title:</label>
          {patrolTitles.map((title) => (
            <div key={title}>
              <input
                type="radio"
                id={title}
                value={title}
                checked={selectedPatrolTitle === title}
                onChange={(e) => setSelectedPatrolTitle(e.target.value)}
              />
              <label htmlFor={title}>{title}</label>
            </div>
          ))}
        </div>
        <button type="submit" className="add-guard-button">Submit</button>
      </form>
    </div>
  );
};

export default AddSchedule;
