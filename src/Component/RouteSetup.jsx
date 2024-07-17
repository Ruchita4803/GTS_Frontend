
import React, { useState } from 'react';
import './SetupTable.css';
import { FaEdit } from 'react-icons/fa';
import { BsFillTrashFill } from 'react-icons/bs';
import AddRoute from './AddRoute';

const RouteSetup = () => {
  const [routes, setRoutes] = useState([
    { id: 1, routeId: 'R_01', checkpoints: 'Entry Gate-BuildingA-ClubHouse-Gym' },
    { id: 2, routeId: 'R_02', checkpoints: 'PlayArea1-ClubHouse-Gym-Entry Gate' },
    { id: 3, routeId: 'R_03', checkpoints: 'Entry Gate-PlayArea1-BuildingA' },
    { id: 4, routeId: 'R_04', checkpoints: 'BuildingB-PlayArea2-Exit Gate' },
    { id: 5, routeId: 'R_05', checkpoints: 'BuildingB-PlayArea2-SwimmimgPool' },
    { id: 6, routeId: 'R_06', checkpoints: 'BuildingB-PlayArea2-SwimmimgPool-Exit Gate' },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);

  const addRouteHandler = (route) => {
    const formattedRoute = {
      ...route,
      checkpoints: route.checkpoints.join('-'), // Join checkpoints with a dash
      id: routes.length + 1
    };
    setRoutes([...routes, formattedRoute]);
    setShowAddForm(false);
  };

  return (
    <main className="main-container">
      <div className="Content">
        <h1>ROUTE SETUP</h1>
        {showAddForm ? (
          <AddRoute addRouteHandler={addRouteHandler} closeForm={() => setShowAddForm(false)} />
        ) : (
          <>
            <button className="Add" onClick={() => setShowAddForm(true)}>ADD</button>
            <table className="Table">
              <thead>
                <tr>
                  <th>Sr.No.</th>
                  <th>Route ID</th>
                  <th>Checkpoints</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {routes.map((route, index) => (
                  <tr key={route.id}>
                    <td>{index + 1}</td>
                    <td>{route.routeId}</td>
                    <td>{route.checkpoints}</td>
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

export default RouteSetup;

