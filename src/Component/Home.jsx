// import React from "react";
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
//   const data = [
//     {
//       name: "Emily",
//       pv: 7400,
//       amt: 2400,
//     },
//     {
//       name: "John",
//       pv: 8398,
//       amt: 2210,
//     },
//     {
//       name: "Daniel",
//       pv: 9800,
//       amt: 2290,
//     },
//     {
//       name: "Denver",
//       pv: 7908,
//       amt: 2000,
//     },
//     {
//       name: "Smith",
//       pv: 6400,
//       amt: 2400,
//     },
//     {
//       name: "Levis",
//       pv: 8400,
//       amt: 2400,
//     },
    
//   ];

//   const data1 = [
//     { name: "Solved", value: 5 },
//     { name: "Pending", value: 2 },
//   ];

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
//             <h3>ACTIVE GUARD: Emily</h3>
//           </div>
//           <h1 className="card-number">7</h1>
//         </div>
//         <div className="card">
//           <div className="card-inner">
//             <h3>TOTAL CHECKPOINTS </h3>
//             <MdLocationOn className="card_icon" />
//           </div>
//           <h1 className="card-number">12</h1>
//         </div>
//         <div className="card">
//           <div className="card-inner">
//             <h3>MISSED CHECKPOINTS</h3>
//             <MdNotListedLocation className="card_icon" />
//           </div>
//           <h1 className="card-number">03</h1>
//         </div>
//         <div className="card">
//           <div className="card-inner">
//             <h3>INCIDENTS</h3>
//             <BsFillBellFill className="card_icon" />
//           </div>
//           <h1 className="card-number">07</h1>
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
//                 data={data1}
//                 dataKey="value"
//                 nameKey="name"
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={80}
//                 label
//               >
//                 {data1.map((entry, index) => (
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

// export default Home;
import React from "react";
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
  const data = [
    {
      name: "Emily",
      pv: 7400,
      amt: 2400,
    },
    {
      name: "John",
      pv: 8398,
      amt: 2210,
    },
    {
      name: "Daniel",
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Denver",
      pv: 7908,
      amt: 2000,
    },
    {
      name: "Smith",
      pv: 6400,
      amt: 2400,
    },
    {
      name: "Levis",
      pv: 8400,
      amt: 2400,
    },
  ];

  const data1 = [
    { name: "Solved", value: 5 },
    { name: "Pending", value: 2 },
  ];

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
          <div className="Active-guard">
            <h3>Active Guard: Emily</h3>
          </div>
          <h1 className="card-number">7</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>TOTAL CHECKPOINTS </h3>
            <MdLocationOn className="card_icon" />
          </div>
          <h1 className="card-number">12</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>MISSED CHECKPOINTS</h3>
            <MdNotListedLocation className="card_icon" />
          </div>
          <h1 className="card-number">03</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>INCIDENTS</h3>
            <BsFillBellFill className="card_icon" />
          </div>
          <h1 className="card-number">07</h1>
        </div>
      </div>

      <div className="charts">
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pv" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data1}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {data1.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.name === "Solved" ? "#FFCD4E" : "#FF6969"}
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


