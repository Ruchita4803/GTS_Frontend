import React, { useState } from 'react';
import './SetupTable.css';
import { BiDownload } from "react-icons/bi";

function AbsentGuardReport() {
  const [absentGuards, setAbsentGuards] = useState([
    { id: 1, date: '2024-07-06', name: 'Daniel', title: 'B_Night' },
  ]);
  const [selectedMonth, setSelectedMonth] = useState('');

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const filteredGuards = absentGuards.filter((guard) => {
    if (!selectedMonth) return true;
    const guardMonth = new Date(guard.date).getMonth() + 1;
    return guardMonth === parseInt(selectedMonth);
  });

  return (
    <main className="main-container">
      <div className="Content">
        <div className="header-container">
          <h1>ABSENT GUARD REPORT</h1>
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
            </tr>
          </thead>
          <tbody>
            {filteredGuards.map((guard) => (
              <tr key={guard.id}>
                <td>{guard.date}</td>
                <td>{guard.name}</td>
                <td>{guard.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default AbsentGuardReport;
