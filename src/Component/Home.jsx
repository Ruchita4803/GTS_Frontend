
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { BsFillBellFill } from "react-icons/bs";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
// } from "recharts";
// import { MdLocationOn, MdNotListedLocation } from "react-icons/md";
// import { GiPoliceOfficerHead } from "react-icons/gi";

// function Home() {
//   const [data, setData] = useState([]);
//   const [totalGuards, setTotalGuards] = useState(0);
//   const [activeGuard, setActiveGuard] = useState("");
//   const [totalCheckpoints, setTotalCheckpoints] = useState(0);
//   const [missedCheckpoints, setMissedCheckpoints] = useState(0);
//   const [totalIncidents, setTotalIncidents] = useState(0);
//   const [incidentStatus, setIncidentStatus] = useState([]);

//   useEffect(() => {
//     // Fetch the data from the backend
//     axios
//       .get("/api/statistics") // Replace with your actual API endpoint
//       .then((response) => {
//         const dashboardData = response.data;
//         setData(dashboardData.guardsData);
//         setTotalGuards(dashboardData.totalGuards);
//         setActiveGuard(dashboardData.activeGuard);
//         setTotalCheckpoints(dashboardData.totalCheckpoints);
//         setMissedCheckpoints(dashboardData.missedCheckpoints);
//         setTotalIncidents(dashboardData.totalIncidents);
//         setIncidentStatus(dashboardData.incidentStatus);
//       })
//       .catch((error) => {
//         console.error("Error fetching data from the backend:", error);
//       });
//   }, []);

//   return (
//     <main className="main-container">
//       <div className="main-title">
//         <h3>DASHBOARD</h3>
//       </div>

//       <div className="main-cards">
//         <div className="card">
//           <div className="card-inner">
//             <h3>TOTAL GUARDS</h3>
//             <GiPoliceOfficerHead className="card_icon" />
//           </div>
//           <div className="Active-guard">
//             <h3>Active Guard: {activeGuard}</h3>
//           </div>
//           <h1 className="card-number">{totalGuards}</h1>
//         </div>
//         <div className="card">
//           <div className="card-inner">
//             <h3>TOTAL CHECKPOINTS</h3>
//             <MdLocationOn className="card_icon" />
//           </div>
//           <h1 className="card-number">{totalCheckpoints}</h1>
//         </div>
//         <div className="card">
//           <div className="card-inner">
//             <h3>MISSED CHECKPOINTS</h3>
//             <MdNotListedLocation className="card_icon" />
//           </div>
//           <h1 className="card-number">{missedCheckpoints}</h1>
//         </div>
//         <div className="card">
//           <div className="card-inner">
//             <h3>INCIDENTS</h3>
//             <BsFillBellFill className="card_icon" />
//           </div>
//           <h1 className="card-number">{totalIncidents}</h1>
//         </div>
//       </div>

//       <div className="charts">
//         <div className="chart-container">
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart
//               data={data}
//               margin={{
//                 top: 5,
//                 right: 30,
//                 left: 20,
//                 bottom: 5,
//               }}
//             >
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="pv" fill="#8884d8" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="chart-container">
//           <ResponsiveContainer width="100%" height="100%">
//             <PieChart>
//               <Pie
//                 data={incidentStatus}
//                 dataKey="value"
//                 nameKey="name"
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={80}
//                 label
//               >
//                 {incidentStatus.map((entry, index) => (
//                   <Cell
//                     key={`cell-${index}`}
//                     fill={entry.name === "Solved" ? "#FFCD4E" : "#FF6969"}
//                   />
//                 ))}
//               </Pie>
//               <Tooltip />
//               <Legend />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </main>
//   );
// }

//  export default Home;
import React, { useState, useEffect } from "react";
import axios from "axios";
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
      const response = await axios.get("/statistics"); // Adjust this endpoint to your backend API
      const {
        totalGuards,
        totalCheckpoints,
        totalIncidents,
        missedCheckpoints,
        guardPunctuality,
        incidentStatus,
      } = response.data;

      setTotalGuards(totalGuards);
      setTotalCheckpoints(totalCheckpoints);
      setTotalIncidents(totalIncidents);
      setMissedCheckpoints(missedCheckpoints);
      setGuardPunctualityData(guardPunctuality);
      setIncidentStatusData(incidentStatus);
    } catch (error) {
      console.error("Error fetching data:", error);
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
            <BarChart
              data={guardPunctualityData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="guardName" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
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