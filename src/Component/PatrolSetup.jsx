// import './SetupTable.css';
// import { FaEdit } from 'react-icons/fa';
// import { BsFillTrashFill } from 'react-icons/bs';

// const PatrolSetup = () => {
//     return (
//         <main className="main-container">
//         <div className="Content">
//           <h1>PATROL SETUP</h1>
//           <button className="Add">ADD</button>
//           <table className="Table">
//             <thead>
//               <tr>
//                 <th>Sr.No.</th>
//                 <th>Patrol Title</th>
//                 <th>Route ID</th>
//                 <th>Start Time</th>
//                 <th>End Time</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td>1</td>
//                 <td>Morning</td>
//                 <td>R_01,R_02</td>
//                 <td>8:00am</td>
//                 <td>4:00pm</td>
//                 <td>
//                   <FaEdit className="icon" />
//                   <BsFillTrashFill className="icon icon-trash" />
//                 </td>
//               </tr>
//               <tr>
//                 <td>2</td>
//                 <td>Evening</td>
//                 <td>R_03</td>
//                 <td>4:00pm</td>
//                 <td>12:00am</td>
//                 <td>
//                   <FaEdit className="icon" />
//                   <BsFillTrashFill className="icon icon-trash" />
//                 </td>
//               </tr>
//               <tr>
//                 <td>3</td>
//                 <td>Night</td>
//                 <td>R_01,R_02,R_03</td>
//                 <td>12:00am</td>
//                 <td>8:00am</td>
//                 <td>
//                   <FaEdit className="icon" />
//                   <BsFillTrashFill className="icon icon-trash" />
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </main>
//      );
// }

// export default PatrolSetup;

import React, { useState } from "react";
import "./SetupTable.css";
import { FaEdit } from "react-icons/fa";
import { BsFillTrashFill } from "react-icons/bs";
import AddPatrol from "./AddPatrol";

const PatrolSetup = () => {
  const [patrols, setPatrols] = useState([
    {
      id: 1,
      title: "A_Morning",
      routeId: "R_01,R_02",
      timeInterval: "2 hours",
      startTime: "08:00 AM",
      endTime: "04:00 PM",
    },
    {
      id: 2,
      title: "A_Evening",
      routeId: "R_03",
      timeInterval: "2 hours",
      startTime: "04:00 PM",
      endTime: "12:00 AM",
    },
    {
      id: 3,
      title: "A_Night",
      routeId: "R_01,R_02,R_03",
      timeInterval: "2 hours",
      startTime: "12:00 AM",
      endTime: "08:00 AM",
    },
    {
      id: 4,
      title: "B_Morning",
      routeId: "R_04,R_05",
      timeInterval: "2 hours",
      startTime: "08:00 AM",
      endTime: "04:00 PM",
    },
    {
      id: 5,
      title: "B_Evening",
      routeId: "R_06",
      timeInterval: "2 hours",
      startTime: "04:00 PM",
      endTime: "12:00 AM",
    },
    {
      id: 6,
      title: "B_Night",
      routeId: "R_04,R_05,R_06",
      timeInterval: "2 hours",
      startTime: "12:00 AM",
      endTime: "08:00 AM",
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);

  const addPatrolHandler = (patrol) => {
    const formattedPatrol = {
      ...patrol,
      routeId: patrol.routes.join(","),
      id: patrols.length + 1,
    };
    setPatrols([...patrols, formattedPatrol]);
    setShowAddForm(false);
  };

  return (
    <main className="main-container">
      <div className="Content">
        <h1>PATROL SETUP</h1>
        {showAddForm ? (
          <AddPatrol
            addPatrolHandler={addPatrolHandler}
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
                  <th>Patrol Title</th>
                  <th>Route ID</th>
                  <th>Time Interval</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {patrols.map((patrol, index) => (
                  <tr key={patrol.id}>
                    <td>{index + 1}</td>
                    <td>{patrol.title}</td>
                    <td>{patrol.routeId}</td>
                    <td>{patrol.timeInterval}</td>
                    <td>{patrol.startTime}</td>
                    <td>{patrol.endTime}</td>
                    <td>
                      <FaEdit className="icon" />
                      <BsFillTrashFill className="icon icon-trash" />
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

export default PatrolSetup;
