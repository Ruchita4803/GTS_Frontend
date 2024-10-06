import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import './AddForm.css';

const AddPatrol = ({ addPatrolHandler, closeForm }) => {
  const [title, setTitle] = useState('');
  const [timeInterval, setTimeInterval] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [selectedRoutes, setSelectedRoutes] = useState([]);

  const routes = ['R_01', 'R_02', 'R_03'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedStartTime = formatTime(startTime);
      const formattedEndTime = formatTime(endTime);
      await addPatrolHandler({ title, timeInterval, startTime: formattedStartTime, endTime: formattedEndTime, routes: selectedRoutes });
      setTitle('');
      setTimeInterval('');
      setStartTime('');
      setEndTime('');
      setSelectedRoutes([]);
    } catch (error) {
      console.error("Error adding patrol:", error);
    }
  };

  const handleRouteChange = (route) => {
    setSelectedRoutes((prev) =>
      prev.includes(route)
        ? prev.filter((r) => r !== route)
        : [...prev, route]
    );
  };

  return (
    <div className="add-container">
      <div className="form-header">
        <h2>Add New Patrol</h2>
        <FaTimes className="close-icon" onClick={closeForm} />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Patrol Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="timeInterval">Time Interval:</label>
          <input
            type="text"
            id="timeInterval"
            value={timeInterval}
            onChange={(e) => setTimeInterval(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="startTime">Start Time:</label>
          <input
            type="time"
            id="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="endTime">End Time:</label>
          <input
            type="time"
            id="endTime"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Routes:</label>
          {routes.map((route) => (
            <div key={route}>
              <input
                type="checkbox"
                id={route}
                value={route}
                checked={selectedRoutes.includes(route)}
                onChange={() => handleRouteChange(route)}
              />
              <label htmlFor={route}>{route}</label>
            </div>
          ))}
        </div>
        <button type="submit" className="add-button">Submit</button>
      </form>
    </div>
  );
};

const formatTime = (time24) => {
  const [hours, minutes] = time24.split(':');
  const period = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12;
  return `${hours12}:${minutes} ${period}`;
};

export default AddPatrol;
