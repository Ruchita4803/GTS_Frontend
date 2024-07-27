import React, { useState, useEffect } from "react";
import "./SetupTable.css";
import { BiDownload } from "react-icons/bi";
import axios from 'axios';
function InsightLog() {
  const [logs, setLogs] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get("/api/insightlog");
        setLogs(response.data);
      } catch (error) {
        alert("Error fetching log", error);
      }
    };

    fetchLogs();
  }, []);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const filteredLogs = logs.filter((log) => {
    if (!selectedMonth) return true;
    const logMonth = new Date(log.date).getMonth() + 1;
    return logMonth === parseInt(selectedMonth);
  });

  const downloadCSV = () => {
    const headers = [
      "Date",
      "Guard Name",
      "Patrol Title",
      "MissedCheckpoint",
      "Incident",
      "Incident Status",
    ];
    const rows = filteredLogs.map((log) => [
      log.date,
      log.name,
      log.title,
      log.missedCheckpoint,
      log.incident,
      log.incident_status,
    ]);

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += headers.join(",") + "\n";
    rows.forEach((row) => {
      csvContent += row.join(",") + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "insight_log.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="main-container">
      <div className="Content">
        <div className="header-container">
          <h1>INSIGHT LOG</h1>
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
              <th>MissedCheckpoint</th>
              <th>Incident</th>
              <th>Incident Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log) => (
              <tr key={log.id}>
                <td>{log.date}</td>
                <td>{log.name}</td>
                <td>{log.title}</td>
                <td>{log.missedCheckpoint}</td>
                <td>{log.incident}</td>
                <td>{log.incident_status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default InsightLog;
