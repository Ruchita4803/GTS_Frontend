import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import './AddForm.css';


const AddSchedule = ({ addScheduleHandler, closeForm, patrolTitles }) => {
  const [guardName, setGuardName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedPatrolTitle, setSelectedPatrolTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newSchedule = { guardName, startDate, endDate, patrolTitle: selectedPatrolTitle };
      await addScheduleHandler(newSchedule);
      setGuardName('');
      setStartDate('');
      setEndDate('');
      setSelectedPatrolTitle('');
    } catch (error) {
      console.error("Error adding schedule:", error);
    }
  };

  return (
    <div className="add-container">
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
          <label htmlFor="patrolTitle">Patrol Title:</label>
          <select
            id="patrolTitle"
            value={selectedPatrolTitle}
            onChange={(e) => setSelectedPatrolTitle(e.target.value)}
            required
          >
            <option value="">Select</option>
            {patrolTitles.map((title, index) => (
              <option key={index} value={title}>{title}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default AddSchedule;

