import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';
import './AddForm.css';
import { Url } from '../Api/Url';

const AddPatrol = ({ addPatrolHandler, closeForm }) => {
  const [patrolName, setPatrolName] = useState('');
  const [routeIds, setRouteIds] = useState([]);
  const [guardName, setGuardName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [routes, setRoutes] = useState([]);
  const [error, setError] = useState('');
  const [loadingRoutes, setLoadingRoutes] = useState(true);

  // Fetch routes from the backend
  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(Url.fetchroutes, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRoutes(response.data); // Set the response data which contains routes
        setLoadingRoutes(false); // Stop loading after fetching routes
      } catch (err) {
        setError('Failed to fetch routes');
        console.error('Error fetching routes:', err);
        setLoadingRoutes(false); // Stop loading in case of error
      }
    };

    fetchRoutes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Check if any route is selected
    if (routeIds.length === 0) {
      setError('Please select at least one route');
      return;
    }

    // Validate time format (HH:MM:SS)
    const timePattern = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
    if (!timePattern.test(startTime) || !timePattern.test(endTime)) {
      setError('Please enter a valid time format (HH:MM:SS)');
      return;
    }

    try {
      const patrolData = {
        patrolName,
        routeIds,
        guardName,
        startTime,
        endTime
      };

      // Send data to the backend
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        Url.addpatrols,
        patrolData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setPatrolName('');
        setRouteIds([]);
        setGuardName('');
        setStartTime('');
        setEndTime('');
        setError('');
        closeForm(); // Close the form after success
      } else {
        setError('Failed to add patrol');
      }
    } catch (error) {
      console.error("Error adding patrol:", error);
      setError('Error adding patrol');
    }
  };

  const handleRouteChange = (routeId) => {
    setRouteIds((prev) =>
      prev.includes(routeId)
        ? prev.filter((r) => r !== routeId) // If routeId is already selected, remove it
        : [...prev, routeId] // Otherwise, add the routeId to the selectedRoutes
    );
  };

  return (
    <div className="add-container">
      <div className="form-header">
        <h2>Add New Patrol</h2>
        <FaTimes className="close-icon" onClick={closeForm} />
      </div>
      <form onSubmit={handleSubmit}>
        {error && <div className="error-message">{error}</div>}
        <div className="form-group">
          <label htmlFor="patrolName">Patrol Name:</label>
          <input
            type="text"
            id="patrolName"
            value={patrolName}
            onChange={(e) => setPatrolName(e.target.value)}
            required
          />
        </div>
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
          <label htmlFor="startTime">Start Time (HH:MM:SS):</label>
          <input
            type="text"
            id="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
            placeholder="HH:MM:SS"
          />
        </div>
        <div className="form-group">
          <label htmlFor="endTime">End Time (HH:MM:SS):</label>
          <input
            type="text"
            id="endTime"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
            placeholder="HH:MM:SS"
          />
        </div>
        <div className="form-group">
          <label>Routes:</label>
          {loadingRoutes ? (
            <p>Loading routes...</p>
          ) : (
            routes.map((route) => (
              <div key={route.routeId}>
                <input
                  type="checkbox"
                  id={route.routeId}
                  value={route.routeId}
                  checked={routeIds.includes(route.routeId)}
                  onChange={() => handleRouteChange(route.routeId)}
                />
                <label htmlFor={route.routeId}>{route.routeName}</label>
              </div>
            ))
          )}
        </div>
        <button type="submit" className="add-button">Submit</button>
      </form>
    </div>
  );
};

export default AddPatrol;
