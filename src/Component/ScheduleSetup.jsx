
import React, { useState } from 'react';
import './SetupTable.css';
import { FaEdit } from 'react-icons/fa';
import { BsFillTrashFill } from 'react-icons/bs';
import AddSchedule from './AddSchedule';

const ScheduleSetup = () => {
  const [schedules, setSchedules] = useState([
    { id: 1, startDate: '2024-07-06', endDate: '2024-07-14', guardName: 'Daniel', patrolTitle: 'A_Morning' },
    { id: 2, startDate: '2024-07-06', endDate: '2024-07-14', guardName: 'Emily', patrolTitle: 'A_Evening' },
    { id: 3, startDate: '2024-07-06', endDate: '2024-07-14', guardName: 'John', patrolTitle: 'A_Night' },
    { id: 4, startDate: '2024-07-06', endDate: '2024-07-14', guardName: 'Smith', patrolTitle: 'B_Morning' },
    { id: 5, startDate: '2024-07-06', endDate: '2024-07-14', guardName: 'Denver', patrolTitle: 'B_Evening' },
    { id: 6, startDate: '2024-07-06', endDate: '2024-07-14', guardName: 'Levis', patrolTitle: 'B_Night' },
    { id: 7, startDate: '2024-07-15', endDate: '2024-07-30', guardName: 'John', patrolTitle: 'A_Morning' },
    { id: 8, startDate: '2024-07-15', endDate: '2024-07-30', guardName: 'Daniel', patrolTitle: 'A_Evening' },
    { id: 9, startDate: '2024-07-15', endDate: '2024-07-30', guardName: 'Emily', patrolTitle: 'A_Night' },
    { id: 10, startDate: '2024-07-15', endDate: '2024-07-30', guardName: 'Levis', patrolTitle: 'B_Morning' },
    { id: 11, startDate: '2024-07-15', endDate: '2024-07-30', guardName: 'Smith', patrolTitle: 'B_Evening' },
    { id: 12, startDate: '2024-07-15', endDate: '2024-07-30', guardName: 'Denver', patrolTitle: 'B_Night' },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editedSchedule, setEditedSchedule] = useState({ startDate: '', endDate: '', guardName: '', patrolTitle: '' });
  const [sortCriterion, setSortCriterion] = useState('');

  const addScheduleHandler = (schedule) => {
    const formattedSchedule = {
      ...schedule,
      id: schedules.length + 1
    };
    setSchedules([...schedules, formattedSchedule]);
    setShowAddForm(false);
  };

  const startEditingHandler = (schedule) => {
    setEditingId(schedule.id);
    setEditedSchedule({ ...schedule });
  };

  const saveEditHandler = (id) => {
    setSchedules(schedules.map(schedule => schedule.id === id ? editedSchedule : schedule));
    setEditingId(null);
  };

  const deleteScheduleHandler = (id) => {
    setSchedules(schedules.filter(schedule => schedule.id !== id));
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
