import React, { useState,useEffect } from 'react';
import './SetupTable.css';
import { BiDownload } from "react-icons/bi";
import axios from 'axios';


function MissedCheckpointReport() {
  const [missedCheckpoints, setMissedCheckpoints] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');


  useEffect(() => {
    const fetchMissedCheckpoints = async () => {
      try {
        const response = await axios.get('/api/missedcheckpoint');
        setMissedCheckpoints(response.data);
      } catch (error) {
        console.error('Error fetching Missed Checkpoints:', error);
      }
    };

    fetchMissedCheckpoints();
  }, []);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const filteredCheckpoints = missedCheckpoints.filter((checkpoint) => {
    if (!selectedMonth) return true;
    const checkpointMonth = new Date(checkpoint.date).getMonth() + 1;
    return checkpointMonth === parseInt(selectedMonth);
  });

  const downloadCSV = () => {
    const headers = ['Date', 'Guard Name', 'Patrol Title', 'Missed Checkpoints'];
    const rows = filteredCheckpoints.map(checkpoint => [checkpoint.date, checkpoint.name, checkpoint.title, checkpoint.missedCheckpoints]);

    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += headers.join(',') + '\n';
    rows.forEach(row => {
      csvContent += row.join(',') + '\n';
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'missed_checkpoint_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="main-container">
      <div className="Content">
        <div className="header-container">
          <h1>MISSED CHECKPOINT REPORT</h1>
         
        </div>
        
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
          <BiDownload className="icon-download" onClick={downloadCSV} />
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
