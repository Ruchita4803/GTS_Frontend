// import "./SetupTable.css";
// import { FaEdit } from "react-icons/fa";
// import { BsFillTrashFill } from "react-icons/bs";

// const CheckpointSetup = () => {
//   return (
//     <main className="main-container">
//       <div className="Content">
//         <h1>CHECKPOINT SETUP</h1>
//         <button className="Add">ADD</button>
//         <table className="Table">
//           <thead>
//             <tr>
//               <th>Sr.No.</th>
//               <th>Checkpoint Title</th>
//               <th>Description</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>1</td>
//               <td>Entry Gate </td>
//               <td>Entry Gate near Building A</td>
//               <td>
//                 <FaEdit className="icon" />
//                 <BsFillTrashFill className="icon icon-trash" />
//               </td>
//             </tr>
//             <tr>
//               <td>2</td>
//               <td>Gym</td>
//               <td>Gym Area Building B-8th floor</td>
//               <td>
//                 <FaEdit className="icon" />
//                 <BsFillTrashFill className="icon icon-trash" />
//               </td>
//             </tr>
//             <tr>
//               <td>3</td>
//               <td>PlayArea1</td>
//               <td>Play Area Behind Building A</td>
//               <td>
//                 <FaEdit className="icon" />
//                 <BsFillTrashFill className="icon icon-trash" />
//               </td>
//             </tr>
//             <tr>
//               <td>4</td>
//               <td>PlayArea2</td>
//               <td>Play Area Behind Building C</td>
//               <td>
//                 <FaEdit className="icon" />
//                 <BsFillTrashFill className="icon icon-trash" />
//               </td>
//             </tr>
//             <tr>
//               <td>5</td>
//               <td>ClubHouse</td>
//               <td>Club House </td>
//               <td>
//                 <FaEdit className="icon" />
//                 <BsFillTrashFill className="icon icon-trash" />
//               </td>
//             </tr>
//             <tr>
//               <td>6</td>
//               <td>ExitGate</td>
//               <td>Exit Gate at Building C</td>
//               <td>
//                 <FaEdit className="icon" />
//                 <BsFillTrashFill className="icon icon-trash" />
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </main>
//   );
// };

// export default CheckpointSetup;
import React, { useState } from 'react';
import './SetupTable.css';
import { FaEdit } from 'react-icons/fa';
import { BsFillTrashFill } from 'react-icons/bs';
import AddCheckpoints from './AddCheckpoints';

const CheckpointSetup = () => {
  const [checkpoints, setCheckpoints] = useState([
    { id: 1, title: 'Entry Gate', description: 'Entry Gate near Building A' },
    { id: 2, title: 'SwimmingPool', description: 'Building B-8th floor' },
    { id: 2, title: 'Gym', description: 'Building A-4th floor' },
    { id: 3, title: 'PlayArea1', description: 'Play Area Behind Building A' },
    { id: 4, title: 'PlayArea2', description: 'Play Area Behind Building B' },
    { id: 5, title: 'BuildingA', description: ' Building A' },
    { id: 6, title: 'BuildingB', description: ' Building B' },
    { id: 7, title: 'ClubHouse', description: 'Club House' },
    { id: 8, title: 'ExitGate', description: 'Exit Gate at Building B' },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);

  const addCheckpointHandler = (checkpoint) => {
    const formattedCheckpoint = {
      ...checkpoint,
      id: checkpoints.length + 1
    };
    setCheckpoints([...checkpoints, formattedCheckpoint]);
    setShowAddForm(false);
  };

  return (
    <main className="main-container">
      <div className="Content">
        <h1>CHECKPOINT SETUP</h1>
        {showAddForm ? (
          <AddCheckpoints addCheckpointHandler={addCheckpointHandler} closeForm={() => setShowAddForm(false)} />
        ) : (
          <>
            <button className="Add" onClick={() => setShowAddForm(true)}>ADD</button>
            <table className="Table">
              <thead>
                <tr>
                  <th>Sr.No.</th>
                  <th>Checkpoint Title</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {checkpoints.map((checkpoint, index) => (
                  <tr key={checkpoint.id}>
                    <td>{index + 1}</td>
                    <td>{checkpoint.title}</td>
                    <td>{checkpoint.description}</td>
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

export default CheckpointSetup;
