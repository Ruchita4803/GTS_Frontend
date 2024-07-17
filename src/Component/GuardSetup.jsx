// import './SetupTable.css';
// import { FaEdit } from 'react-icons/fa';
// import { BsFillTrashFill } from 'react-icons/bs';

// const GuardSetup = () => {
//   return (
//     <main className="main-container">
//       <div className="Content">
//         <h1>GUARD SETUP</h1>
//         <button className="Add">ADD</button>
//         <table className="Table">
//           <thead>
//             <tr>
//               <th>Sr.No.</th>
//               <th>Guard Name</th>
//               <th>Mobile No.</th>
//               <th>Email id</th>
//               <th>Address</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>1</td>
//               <td>Daniel</td>
//               <td>9876544345</td>
//               <td>daniel@gmail.com</td>
//               <td>Ravet</td>
//               <td>
//                 <FaEdit className="icon" />
//                 <BsFillTrashFill className="icon icon-trash" />
//               </td>
//             </tr>
//             <tr>
//               <td>2</td>
//               <td>John</td>
//               <td>9873458765</td>
//               <td>john@gmail.com</td>
//               <td>Ravet</td>
//               <td>
//                 <FaEdit className="icon" />
//                 <BsFillTrashFill className="icon icon-trash" />
//               </td>
//             </tr>
//             <tr>
//               <td>3</td>
//               <td>Emily</td>
//               <td>9458787832</td>
//               <td>emily@gmail.com</td>
//               <td>Ravet</td>
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

// export default GuardSetup;
import React, { useState } from 'react';
import './SetupTable.css';
import { FaEdit } from 'react-icons/fa';
import { BsFillTrashFill } from 'react-icons/bs';
import AddGuard from './AddGuard';

const GuardSetup = () => {
  const [guards, setGuards] = useState([
    { id: 1, name: 'Daniel', mobile: '9876544345', email: 'daniel@gmail.com', address: 'Ravet' },
    { id: 2, name: 'John', mobile: '9873458765', email: 'john@gmail.com', address: 'Chinchwad' },
    { id: 3, name: 'Emily', mobile: '9458787832', email: 'emily@gmail.com', address: 'Ravet' },
    { id: 3, name: 'Smith', mobile: '9458787832', email: 'smith@gmail.com', address: 'Ravet' },
    { id: 3, name: 'Denver', mobile: '9458787832', email: 'denver@gmail.com', address: 'Chinchwad' },
    { id: 3, name: 'Levis', mobile: '9458787832', email: 'levis@gmail.com', address: 'Pimpri' },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);

  const addGuardHandler = (guard) => {
    setGuards([...guards, { ...guard, id: guards.length + 1 }]);
    setShowAddForm(false);
  };

  return (
    <main className="main-container">
      <div className="Content">
        <h1>GUARD SETUP</h1>
        {showAddForm ? (
          <AddGuard addGuardHandler={addGuardHandler} closeForm={() => setShowAddForm(false)} />
        ) : (
          <>
            <button className="Add" onClick={() => setShowAddForm(true)}>ADD</button>
            <table className="Table">
              <thead>
                <tr>
                  <th>Sr.No.</th>
                  <th>Guard Name</th>
                  <th>Mobile No.</th>
                  <th>Email id</th>
                  <th>Address</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {guards.map((guard, index) => (
                  <tr key={guard.id}>
                    <td>{index + 1}</td>
                    <td>{guard.name}</td>
                    <td>{guard.mobile}</td>
                    <td>{guard.email}</td>
                    <td>{guard.address}</td>
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

export default GuardSetup;
