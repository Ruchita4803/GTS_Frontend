import React, { useState, useEffect } from 'react';
import './SetupTable.css';
import { FaEdit } from 'react-icons/fa';
import axios from 'axios';
import { BsFillTrashFill } from 'react-icons/bs';
import AddPatrol from './AddPatrol';
import { Url } from "../Api/Url";

const PatrolSetup = () => {
  const [patrols, setPatrols] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedRouteId, setEditedRouteId] = useState('');
  const [editedGuardName, setEditedGuardName] = useState('');
  const [editedStartTime, setEditedStartTime] = useState('');
  const [editedEndTime, setEditedEndTime] = useState('');

  // Fetch data
  useEffect(() => {
    const fetchPatrols = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(Url.fetchpatrols, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(response.data)
        if (Array.isArray(response.data)) {
          setPatrols(response.data); // Setting the patrols array in the state
        } else {
          console.error('Expected an array of patrols, but got:', response.data);
        }
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
      if (response.data) {
        setPatrols((prevPatrols) => [...prevPatrols, response.data]); // Add the new patrol to the state
      }
      setShowAddForm(false);
    } catch (error) {
      console.error("Error adding patrol:", error);
    }
  };

  // Edit Patrol
  const startEditingHandler = (patrol) => {
    setEditingId(patrol.patrolId);
    setEditedTitle(patrol.patrolName);
    setEditedGuardName(patrol.guardName);
    setEditedRouteId(patrol.routeIds.join(", ")); // Assuming routeIds are stored as an array
    setEditedStartTime(patrol.startTime);
    setEditedEndTime(patrol.endTime);
  };

  const saveEditHandler = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        Url.editpatrols,
        {
          patrolId: id,
          title: editedTitle,
          routeIds: editedRouteId.split(',').map((id) => parseInt(id.trim(), 10)), // Convert to array of numbers
          guardName: editedGuardName,
          startTime: editedStartTime,
          endTime: editedEndTime
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.data.success) {
        setPatrols(
          patrols.map((patrol) =>
            patrol.patrolId === id
              ? {
                  ...patrol,
                  patrolName: editedTitle,
                  routeIds: editedRouteId.split(',').map((id) => parseInt(id.trim(), 10)),
                  guardName: editedGuardName,
                  startTime: editedStartTime,
                  endTime: editedEndTime,
                }
              : patrol
          )
        );
        setEditingId(null);
      } else {
        alert(response.data.message); // Show error message if something goes wrong
      }
    } catch (error) {
      console.error("Error updating patrol:", error);
      alert("An error occurred while updating the patrol. Please try again.");
    }
  };
  

  // Delete Patrol
  const deletePatrolHandler = async (patrolId) => {
    if (window.confirm("Are you sure you want to delete this patrol?")) {
      try {
        // Send patrolId in the request body
        const token = localStorage.getItem("authToken");
        const response = await axios.delete(
        Url.deletepatrols,
        {
          data: { patrolId: patrolId },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
        if (response.status === 200) {
          // Update the state after successful deletion
          setPatrols(patrols.filter((patrol) => patrol.patrolId !== patrolId));
        } else {
          console.error("Error deleting patrol: Unexpected status code", response.status);
        }
      } catch (error) {
        console.error("Error deleting patrol:", error);
      }
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
                  <th>Guard Name</th> {/* New column for Guard Name */}
                  <th>Route ID(s)</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {patrols.map((patrol, index) => (
                  <tr key={patrol.patrolId}>
                    <td>{index + 1}</td>
                    <td>
                      {editingId === patrol.patrolId ? (
                        <input
                          type="text"
                          value={editedTitle}
                          onChange={(e) => setEditedTitle(e.target.value)}
                        />
                      ) : (
                        patrol.patrolName
                      )}
                    </td>

                    <td>
                      {editingId === patrol.patrolId ? (
                        <input
                          type="text"
                          value={editedGuardName} // Display the guard's name
                          onChange={(e) => setEditedGuardName(e.target.value)} // Assuming you want to edit the title, not guard name
                        />
                      ) : (
                        patrol.guardName // Assuming guardName is the field in your patrol object
                      )}
                    </td>

                    <td>
                      {editingId === patrol.patrolId ? (
                        <input
                          type="text"
                          value={editedRouteId}
                          onChange={(e) => setEditedRouteId(e.target.value)}
                        />
                      ) : (
                        patrol.routeIds.join(", ") // Show all Route IDs as a comma-separated string
                      )}
                    </td>
                    <td>
                      {editingId === patrol.patrolId ? (
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
                      {editingId === patrol.patrolId ? (
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
                      {editingId === patrol.patrolId ? (
                        <>
                          <button className="editsavebutton" onClick={() => saveEditHandler(patrol.patrolId)}>Save</button>
                          <button className="editcancelbutton" onClick={() => setEditingId(null)}>Cancel</button>
                        </>
                      ) : (
                        <>
                          <FaEdit className="icon" onClick={() => startEditingHandler(patrol)} />
                          <BsFillTrashFill className="icon icon-trash" onClick={() => deletePatrolHandler(patrol.patrolId)} />
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
