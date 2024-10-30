import React, { useState, useEffect } from "react";
import axios from "axios";
import { Url } from "../Api/Url";
import { BsFillBellFill } from "react-icons/bs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { MdLocationOn, MdNotListedLocation } from "react-icons/md";
import { GiPoliceOfficerHead } from "react-icons/gi";

function Home() {
  const [totalGuards, setTotalGuards] = useState(0);
  const [totalCheckpoints, setTotalCheckpoints] = useState(0);
  const [missedCheckpoints, setMissedCheckpoints] = useState(0);
  const [totalIncidents, setTotalIncidents] = useState(0);
  const [guardPunctualityData, setGuardPunctualityData] = useState([]);
  const [incidentStatusData, setIncidentStatusData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(Url.statistics, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Data received from API:", response.data);

      const {
        totalGuards,
        totalCheckpoints,
        totalIncidents,
        numberOfMissedCheckpoints,
        missedCheckpoints,
        guardPunctuality,
        incidentStatus,
      } = response.data;

      setTotalGuards(totalGuards || 0);
      setTotalCheckpoints(totalCheckpoints || 0);
      setTotalIncidents(totalIncidents || 0);
      setMissedCheckpoints(numberOfMissedCheckpoints || 0);
      setGuardPunctualityData(guardPunctuality || []);
      setIncidentStatusData(incidentStatus || []);
    } catch (error) {
      console.error("Error fetching data from API:", error);
    }
  };

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>DASHBOARD</h3>
      </div>

      <div className="main-cards">
        <div className="card">
          <div className="card-inner">
            <h3>TOTAL GUARDS</h3>
            <GiPoliceOfficerHead className="card_icon" />
          </div>
          <h1 className="card-number">{totalGuards}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>TOTAL CHECKPOINTS</h3>
            <MdLocationOn className="card_icon" />
          </div>
          <h1 className="card-number">{totalCheckpoints}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>MISSED CHECKPOINTS</h3>
            <MdNotListedLocation className="card_icon" />
          </div>
          <h1 className="card-number">{missedCheckpoints}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>INCIDENTS</h3>
            <BsFillBellFill className="card_icon" />
          </div>
          <h1 className="card-number">{totalIncidents}</h1>
        </div>
      </div>

      <div className="charts">
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            {guardPunctualityData.length > 0 ? (
              <BarChart
                data={guardPunctualityData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="guardName" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="punctuality" fill="#8884d8" />
              </BarChart>
            ) : (
              <p>No guard punctuality data available</p>
            )}
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={incidentStatusData}
                dataKey="count"
                nameKey="status"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {incidentStatusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.status === false ? "#FFCD4E" : "#FF6969"}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </main>
  );
}

export default Home;
