import React, { useState } from 'react';
import './SetupTable.css';
import { BiDownload } from "react-icons/bi";

function MissedCheckpointReport() {
  const [missedCheckpoints, setMissedCheckpoints] = useState([
    { id: 1, date: '2024-07-08', name: 'Emily', title: 'A_Evening', missedCheckpoints: 'PlayArea1' },
    { id: 2, date: '2024-07-18', name: 'Levis', title: 'B_Morning', missedCheckpoints: 'SwimmingPool' }
  ]);
  const [selectedMonth, setSelectedMonth] = useState('');

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const filteredCheckpoints = missedCheckpoints.filter((checkpoint) => {
    if (!selectedMonth) return true;
    const checkpointMonth = new Date(checkpoint.date).getMonth() + 1;
    return checkpointMonth === parseInt(selectedMonth);
  });

  return (
    <main className="main-container">
      <div className="Content">
        <div className="header-container">
          <h1>MISSED CHECKPOINT REPORT</h1>
        </div>
        
        <div className="filter-download-container">
          <div className="filter-container">
            <label htmlFor="month">Filter by month:</label>
            <select id="month" value={selectedMonth} onChange={handleMonthChange}>
              <option value="">All</option>
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
          </div>
          <BiDownload className="icon-download" />
        </div>
        
        <table className="Table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Guard Name</th>
              <th>Patrol Title</th>
              <th>Missed Checkpoints</th>
            </tr>
          </thead>
          <tbody>
            {filteredCheckpoints.map((checkpoint) => (
              <tr key={checkpoint.id}>
                <td>{checkpoint.date}</td>
                <td>{checkpoint.name}</td>
                <td>{checkpoint.title}</td>
                <td>{checkpoint.missedCheckpoints}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default MissedCheckpointReport;
