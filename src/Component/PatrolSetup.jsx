import React, { useState, useEffect } from 'react';
import './SetupTable.css';
import { FaEdit } from 'react-icons/fa';
import axios from 'axios';
import { BsFillTrashFill } from 'react-icons/bs';
import AddPatrol from './AddPatrol';
import {Url} from "../Api/Url";
const PatrolSetup = () => {
  const [patrols, setPatrols] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedRouteId, setEditedRouteId] = useState('');
  const [editedTimeInterval, setEditedTimeInterval] = useState('');
  const [editedStartTime, setEditedStartTime] = useState('');
  const [editedEndTime, setEditedEndTime] = useState('');

  // Fetch data
  useEffect(() => {
    const fetchPatrols = async () => {
      try {
        const response = await axios.get(Url.fetchpatrols);
        setPatrols(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPatrols();
  }, []);

  if (loading) {
    return <div className='display-msg'>Loading...</div>;
  }

  if (error) {
    return <div className='display-msg'>Error: {error}</div>;
  }

  // Add Patrol
  const addPatrolHandler = async (patrol) => {
    try {
      const response = await axios.post(Url.addpatrols, patrol);
      setPatrols([...patrols, response.data]);
      setShowAddForm(false);
    } catch (error) {
      console.error("Error adding patrol:", error);
    }
  };

  // Edit Patrol
  const startEditingHandler = (patrol) => {
    setEditingId(patrol.id);
    setEditedTitle(patrol.title);
    setEditedRouteId(patrol.routeId);
    setEditedTimeInterval(patrol.timeInterval);
    setEditedStartTime(patrol.startTime);
    setEditedEndTime(patrol.endTime);
  };

  const saveEditHandler = async (id) => {
    try {
      await axios.put(Url.editpatrols, {
        patrolId:id,
        title: editedTitle,
        routeId: editedRouteId,
        timeInterval: editedTimeInterval,
        startTime: editedStartTime,
        endTime: editedEndTime
      });

      setPatrols(patrols.map((patrol) =>
        patrol.id === id ? { ...patrol, title: editedTitle, routeId: editedRouteId, timeInterval: editedTimeInterval, startTime: editedStartTime, endTime: editedEndTime } : patrol
      ));

      setEditingId(null);
    } catch (error) {
      console.error("Error updating patrol:", error);
    }
  };

  // Delete Patrol
  const deletePatrolHandler = async (id) => {
    try {
      await axios.delete(Url.deletepatrols, {data:{patrolId:id}});
      setPatrols(patrols.filter((patrol) => patrol.id !== id));
    } catch (error) {
      console.error("Error deleting patrol:", error);
    }
  };

  return (
    <main className="main-container">
      <div className="Content">
        <h1>PATROL SETUP</h1>
        {showAddForm ? (
          <AddPatrol addPatrolHandler={addPatrolHandler} closeForm={() => setShowAddForm(false)} />
        ) : (
          <>
            <button className="Add" onClick={() => setShowAddForm(true)}>ADD</button>
            <table className="Table">
              <thead>
                <tr>
                  <th>Sr.No.</th>
                  <th>Patrol Title</th>
                  <th>Route ID</th>
                  <th>Time Interval</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {patrols.map((patrol, index) => (
                  <tr key={patrol.id}>
                    <td>{index + 1}</td>
                    <td>
                      {editingId === patrol.id ? (
                        <input
                          type="text"
                          value={editedTitle}
                          onChange={(e) => setEditedTitle(e.target.value)}
                        />
                      ) : (
                        patrol.title
                      )}
                    </td>
                    <td>
                      {editingId === patrol.id ? (
                        <input
                          type="text"
                          value={editedRouteId}
                          onChange={(e) => setEditedRouteId(e.target.value)}
                        />
                      ) : (
                        patrol.routeId
                      )}
                    </td>
                    <td>
                      {editingId === patrol.id ? (
                        <input
                          type="text"
                          value={editedTimeInterval}
                          onChange={(e) => setEditedTimeInterval(e.target.value)}
                        />
                      ) : (
                        patrol.timeInterval
                      )}
                    </td>
                    <td>
                      {editingId === patrol.id ? (
                        <input
                          type="text"
                          value={editedStartTime}
                          onChange={(e) => setEditedStartTime(e.target.value)}
                        />
                      ) : (
                        patrol.startTime
                      )}
                    </td>
                    <td>
                      {editingId === patrol.id ? (
                        <input
                          type="text"
                          value={editedEndTime}
                          onChange={(e) => setEditedEndTime(e.target.value)}
                        />
                      ) : (
                        patrol.endTime
                      )}
                    </td>
                    <td>
                      {editingId === patrol.id ? (
                        <>
                          <button className="editsavebutton" onClick={() => saveEditHandler(patrol.id)}>Save</button>
                          <button className="editcancelbutton" onClick={() => setEditingId(null)}>Cancel</button>
                        </>
                      ) : (
                        <>
                          <FaEdit className="icon" onClick={() => startEditingHandler(patrol)} />
                          <BsFillTrashFill className="icon icon-trash" onClick={() => deletePatrolHandler(patrol.id)} />
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </main>
  );
};

export default PatrolSetup;
