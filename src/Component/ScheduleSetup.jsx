import React, { useState, useEffect } from "react";
import "./SetupTable.css";
import { FaEdit } from "react-icons/fa";
import { BsFillTrashFill } from "react-icons/bs";
import axios from "axios";
import AddSchedule from "./AddSchedule";
import { Url } from "../Api/Url";
const ScheduleSetup = () => {
  const [schedules, setSchedules] = useState([
    {
      id: 1,
      startDate: "2024-07-06",
      endDate: "2024-07-14",
      firstName: "Daniel",
      lastName: "Patil",
      patrolTitle: "A_Morning",
    },
    {
      id: 2,
      startDate: "2024-07-06",
      endDate: "2024-07-14",
      firstName: "Emily",
      lastName: "Patil",
      patrolTitle: "A_Evening",
    },
    {
      id: 3,
      startDate: "2024-07-06",
      endDate: "2024-07-14",
      firstName: "John",
      lastName: "Patil",
      patrolTitle: "A_Night",
    },
    {
      id: 4,
      startDate: "2024-07-06",
      endDate: "2024-07-14",
      firstName: "Smith",
      lastName: "Patil",
      patrolTitle: "B_Morning",
    },
    {
      id: 5,
      startDate: "2024-07-06",
      endDate: "2024-07-14",
      firstName: "Denver",
      lastName: "Patil",
      patrolTitle: "B_Evening",
    },
    {
      id: 6,
      startDate: "2024-07-06",
      endDate: "2024-07-14",
      firstName: "Levis",
      lastName: "Patil",
      patrolTitle: "B_Night",
    },
    {
      id: 7,
      startDate: "2024-07-15",
      endDate: "2024-07-30",
      firstName: "John",
      lastName: "Patil",
      patrolTitle: "A_Morning",
    },
    {
      id: 8,
      startDate: "2024-07-15",
      endDate: "2024-07-30",
      firstName: "Daniel",
      lastName: "Patil",
      patrolTitle: "A_Evening",
    },
    {
      id: 9,
      startDate: "2024-07-15",
      endDate: "2024-07-30",
      firstName: "Emily",
      lastName: "Patil",
      patrolTitle: "A_Night",
    },
    {
      id: 10,
      startDate: "2024-07-15",
      endDate: "2024-07-30",
      firstName: "Levis",
      lastName: "Patil",
      patrolTitle: "B_Morning",
    },
    {
      id: 11,
      startDate: "2024-07-15",
      endDate: "2024-07-30",
      firstName: "Smith",
      lastName: "Patil",
      patrolTitle: "B_Evening",
    },
    {
      id: 12,
      startDate: "2024-07-15",
      endDate: "2024-07-30",
      firstName: "Denver",
      lastName: "Patil",
      patrolTitle: "B_Night",
    },
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editedSchedule, setEditedSchedule] = useState({
    startDate: "",
    endDate: "",
    firstName: "",
    lastName: "",
    patrolTitle: "",
  });
  const [sortCriterion, setSortCriterion] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from backend
  // useEffect(() => {
  //   const fetchSchedules = async () => {
  //     try {
  //       const response = await axios.get(Url.fetchschedules);
  //       const formattedSchedules = response.data.map((schedule) => ({
  //         ...schedule,
  //         firstName: schedule.guardName.split(" ")[0],
  //         lastName: schedule.guardName.split(" ")[1] || "",
  //       }));
  //       setSchedules(formattedSchedules);
  //       setLoading(false);
  //     } catch (err) {
  //       setError(err.message);
  //       setLoading(false);
  //     }
  //   };

  //   fetchSchedules();
  // }, []);

  // if (loading) {
  //   return <div className="display-msg">Loading...</div>;
  // }

  if (error) {
    return <div className="display-msg">Error: {error}</div>;
  }

  const addScheduleHandler = async (schedule) => {
    try {
      const response = await axios.post(Url.addschedules, schedule);
      const formattedSchedule = {
        ...response.data,
        firstName: response.data.guardName.split(" ")[0],
        lastName: response.data.guardName.split(" ")[1] || "",
      };
      setSchedules([...schedules, formattedSchedule]);
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
      const updatedSchedule = {
        ...editedSchedule,
        guardName: `${editedSchedule.firstName} ${editedSchedule.lastName}`,
        scheduleId:id,
      };
      await axios.put(Url.editschedules, updatedSchedule);
      setSchedules(
        schedules.map((schedule) =>
          schedule.id === id ? updatedSchedule : schedule
        )
      );
      setEditingId(null);
    } catch (error) {
      console.error("Error updating schedule:", error);
    }
  };

  const deleteScheduleHandler = async (id) => {
    try {
      await axios.delete(Url.deleteschedules);
      setSchedules(schedules.filter((schedule) => schedule.id !== id));
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
      if (criterion === "startDate" || criterion === "endDate") {
        return new Date(a[criterion]) - new Date(b[criterion]);
      } else if (criterion === "guardName") {
        return a.guardName.localeCompare(b.guardName);
      } else if (criterion === "patrolTitle") {
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
              <select
                id="sort"
                value={sortCriterion}
                onChange={handleSortChange}
              >
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
          <AddSchedule
            addScheduleHandler={addScheduleHandler}
            closeForm={() => setShowAddForm(false)}
          />
        ) : (
          <>
            <button className="Add" onClick={() => setShowAddForm(true)}>
              ADD
            </button>
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
                          onChange={(e) =>
                            setEditedSchedule({
                              ...editedSchedule,
                              startDate: e.target.value,
                            })
                          }
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
                          onChange={(e) =>
                            setEditedSchedule({
                              ...editedSchedule,
                              endDate: e.target.value,
                            })
                          }
                        />
                      ) : (
                        new Date(schedule.endDate).toLocaleDateString()
                      )}
                    </td>
                    <td>
                      {editingId === schedule.id ? (
                        <>
                          <input
                            type="text"
                            value={editedSchedule.firstName}
                            placeholder="First Name"
                            onChange={(e) =>
                              setEditedSchedule({
                                ...editedSchedule,
                                firstName: e.target.value,
                              })
                            }
                          />
                          <input
                            type="text"
                            value={editedSchedule.lastName}
                            placeholder="Last Name"
                            onChange={(e) =>
                              setEditedSchedule({
                                ...editedSchedule,
                                lastName: e.target.value,
                              })
                            }
                          />
                        </>
                      ) : (
                        `${schedule.firstName} ${schedule.lastName}`
                      )}
                    </td>
                    <td>
                      {editingId === schedule.id ? (
                        <input
                          type="text"
                          value={editedSchedule.patrolTitle}
                          onChange={(e) =>
                            setEditedSchedule({
                              ...editedSchedule,
                              patrolTitle: e.target.value,
                            })
                          }
                        />
                      ) : (
                        schedule.patrolTitle
                      )}
                    </td>
                    <td>
                      {editingId === schedule.id ? (
                        <>
                          <button
                            className="editsavebutton"
                            onClick={() => saveEditHandler(schedule.id)}
                          >
                            Save
                          </button>
                          <button
                            className="editcancelbutton"
                            onClick={() => setEditingId(null)}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <FaEdit
                            className="icon"
                            onClick={() => startEditingHandler(schedule)}
                          />
                          <BsFillTrashFill
                            className="icon icon-trash"
                            onClick={() => deleteScheduleHandler(schedule.id)}
                          />
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
