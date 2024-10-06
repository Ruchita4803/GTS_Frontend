import React, { useState,useEffect } from 'react';
import './SetupTable.css';
import { BiDownload } from "react-icons/bi";
import axios from 'axios';
import {Url} from "../Api/Url"
function AbsentGuardReport() {
  const [absentGuards, setAbsentGuards] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');

  useEffect(() => {
    const fetchAbsentGuards = async () => {
      try {
        const response = await axios.get(Url.absentguardreport);
        setAbsentGuards(response.data);
      } catch (error) {
        console.error('Error fetching Absent Guard Report:', error);
      }
    };

    fetchAbsentGuards();
  }, []);


  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const filteredGuards = absentGuards.filter((guard) => {
    if (!selectedMonth) return true;
    const guardMonth = new Date(guard.date).getMonth() + 1;
    return guardMonth === parseInt(selectedMonth);
  });

  const downloadCSV = () => {
    const headers = ['Date', 'Guard Name', 'Patrol Title'];
    const rows = filteredGuards.map(guard => [guard.date, guard.name, guard.title]);

    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += headers.join(',') + '\n';
    rows.forEach(row => {
      csvContent += row.join(',') + '\n';
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'absent_guard_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="main-container">
      <div className="Content">
        <div className="header-container">
          <h1>ABSENT GUARD REPORT</h1>
          
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
