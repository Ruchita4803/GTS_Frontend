

import React, { useState,useEffect } from 'react';
import './SetupTable.css';
import { BiDownload } from "react-icons/bi";
import axios from 'axios';


function IncidentReport() {
  const [incidents, setIncidents] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');


  useEffect(()=>{
    const fetchIncidents= async()=>{
      try{
        const response = await axios.get('/api/incidentreport');
        setIncidents(response.data);
      }catch(error){
        alert('Error in fetching incident report', error);
      }
    };
  
    fetchIncidents();
  },[]);


  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const filteredIncidents = incidents.filter((incident) => {
    if (!selectedMonth) return true;
    const incidentMonth = new Date(incident.date).getMonth() + 1;
    return incidentMonth === parseInt(selectedMonth);
  });

  const downloadCSV = () => {
    const headers = ['Date', 'Incident', 'Guard Name', 'Patrol Title', 'Incident Status'];
    const rows = filteredIncidents.map(incident => [incident.date, incident.incident, incident.name, incident.title, incident.status]);

    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += headers.join(',') + '\n';
    rows.forEach(row => {
      csvContent += row.join(',') + '\n';
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'incident_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="main-container">
      <div className="Content">
        <div className="header-container">
          <h1>INCIDENT REPORT</h1>
         
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
              <th>Incident</th>
              <th>Guard Name</th>
              <th>Patrol Title</th>
              <th>Incident Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredIncidents.map((incident) => (
              <tr key={incident.id}>
                <td>{incident.date}</td>
                <td>{incident.incident}</td>
                <td>{incident.name}</td>
                <td>{incident.title}</td>
                <td>{incident.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default IncidentReport;
