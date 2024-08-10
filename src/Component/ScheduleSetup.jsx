import React, { useState, useEffect } from 'react';
import './SetupTable.css';
import { FaEdit } from 'react-icons/fa';
import { BsFillTrashFill } from 'react-icons/bs';
import axios from 'axios';
import AddSchedule from './AddSchedule';

const ScheduleSetup = () => {
  const [schedules, setSchedules] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editedSchedule, setEditedSchedule] = useState({ startDate: '', endDate: '', guardName: '', patrolTitle: '' });
  const [sortCriterion, setSortCriterion] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from backend
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axios.get('/api/schedules');
        setSchedules(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchSchedules();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const addScheduleHandler = async (schedule) => {
    try {
      const response = await axios.post('/api/schedules', schedule);
      setSchedules([...schedules, response.data]);
      setShowAddForm(false);
    } catch (error) {
      console.error("Error adding schedule:", error);
    }
  };

  const startEditingHandler = (schedule) => {
    setEditingId(schedule.id);
    setEditedSchedule({ ...schedule });
  };

  const saveEditHandler = async (id) => {
    try {
      await axios.put(`/api/schedules/${id}`, editedSchedule);
      setSchedules(schedules.map(schedule => schedule.id === id ? editedSchedule : schedule));
      setEditingId(null);
    } catch (error) {
      console.error("Error updating schedule:", error);
    }
  };

  const deleteScheduleHandler = async (id) => {
    try {
      await axios.delete(`/api/schedules/${id}`);
      setSchedules(schedules.filter(schedule => schedule.id !== id));
    } catch (error) {
      console.error("Error deleting schedule:", error);
    }
  };

  const handleSortChange = (e) => {
    setSortCriterion(e.target.value);
    sortSchedules(e.target.value);
  };

  const sortSchedules = (criterion) => {
    const sortedSchedules = [...schedules].sort((a, b) => {
      if (criterion === 'startDate' || criterion === 'endDate') {
        return new Date(a[criterion]) - new Date(b[criterion]);
      } else if (criterion === 'guardName' || criterion === 'patrolTitle') {
        return a[criterion].localeCompare(b[criterion]);
      }
      return 0;
    });
    setSchedules(sortedSchedules);
  };

  return (
    <main className="main-container">
      <div className="Content">
        <h1>SCHEDULE SETUP</h1>
        <div className="control-panel">
          {!showAddForm && (
            <div className="Sort">
              <label htmlFor="sort">Sort by: </label>
              <select id="sort" value={sortCriterion} onChange={handleSortChange}>
                <option value="">Select</option>
                <option value="startDate">Start Date</option>
                <option value="endDate">End Date</option>
                <option value="guardName">Guard Name</option>
                <option value="patrolTitle">Patrol Title</option>
              </select>
            </div>
          )}
        </div>
        {showAddForm ? (
          <AddSchedule addScheduleHandler={addScheduleHandler} closeForm={() => setShowAddForm(false)} />
        ) : (
          <>
            <button className="Add" onClick={() => setShowAddForm(true)}>ADD</button>
            <table className="Table">
              <thead>
                <tr>
                  <th>Sr.No.</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Guard Name</th>
                  <th>Patrol Title</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {schedules.map((schedule, index) => (
                  <tr key={schedule.id}>
                    <td>{index + 1}</td>
                    <td>
                      {editingId === schedule.id ? (
                        <input
                          type="date"
                          value={editedSchedule.startDate}
                          onChange={(e) => setEditedSchedule({ ...editedSchedule, startDate: e.target.value })}
                        />
                      ) : (
                        new Date(schedule.startDate).toLocaleDateString()
                      )}
                    </td>
                    <td>
                      {editingId === schedule.id ? (
                        <input
                          type="date"
                          value={editedSchedule.endDate}
                          onChange={(e) => setEditedSchedule({ ...editedSchedule, endDate: e.target.value })}
                        />
                      ) : (
                        new Date(schedule.endDate).toLocaleDateString()
                      )}
                    </td>
                    <td>
                      {editingId === schedule.id ? (
                        <input
                          type="text"
                          value={editedSchedule.guardName}
                          onChange={(e) => setEditedSchedule({ ...editedSchedule, guardName: e.target.value })}
                        />
                      ) : (
                        schedule.guardName
                      )}
                    </td>
                    <td>
                      {editingId === schedule.id ? (
                        <input
                          type="text"
                          value={editedSchedule.patrolTitle}
                          onChange={(e) => setEditedSchedule({ ...editedSchedule, patrolTitle: e.target.value })}
                        />
                      ) : (
                        schedule.patrolTitle
                      )}
                    </td>
                    <td>
                      {editingId === schedule.id ? (
                        <>
                          <button className="editsavebutton" onClick={() => saveEditHandler(schedule.id)}>Save</button>
                          <button className="editcancelbutton" onClick={() => setEditingId(null)}>Cancel</button>
                        </>
                      ) : (
                        <>
                          <FaEdit className="icon" onClick={() => startEditingHandler(schedule)} />
                          <BsFillTrashFill className="icon icon-trash" onClick={() => deleteScheduleHandler(schedule.id)} />
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

export default ScheduleSetup;
