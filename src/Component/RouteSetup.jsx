import React, { useState, useEffect } from 'react';
import './SetupTable.css';
import { FaEdit } from 'react-icons/fa';
import axios from 'axios';
import { BsFillTrashFill } from 'react-icons/bs';
import AddRoute from './AddRoute';

const RouteSetup = () => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editedRouteId, setEditedRouteId] = useState('');
  const [editedCheckpoints, setEditedCheckpoints] = useState('');


  //Fetch routes
  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await axios.get('/api/routes');
        setRoutes(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchRoutes();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  //Add routes
  const addRouteHandler = async (route) => {
    try {
      const response = await axios.post('/api/add-route', route);
      if (response.data.success) {
        setRoutes([...routes, response.data.data]);
        setShowAddForm(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert('Failed to add route. Please try again.');
    }
  };



  //edit routes
  
  const startEditingHandler = (route) => {
    setEditingId(route.id);
    setEditedRouteId(route.routeId);
    setEditedCheckpoints(route.checkpoints);
  };
  
  const saveEditHandler = async (id) => {
    try {
      const response = await axios.put('/api/update-route', {
        routeId: id,
        newRouteName: editedRouteId,
        newcheckPointNames: editedCheckpoints,
      });
      if (response.data.success) {
        setRoutes(routes.map((route) =>
          route.id === id ? { ...route, routeId: editedRouteId, checkpoints: editedCheckpoints } : route
        ));
        setEditingId(null);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert('Failed to update route. Please try again.');
    }
  };


  //delete routes
  const deleteRouteHandler = async (routeId) => {
    try {
      const response = await axios.delete('/api/delete-route', { data: { routeId } });
      if (response.data.success) {
        setRoutes(routes.filter(route => route.id !== routeId));
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert('Failed to delete route. Please try again.');
    }
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
                    <td>
                      {editingId === route.id ? (
                        <input
                          type="text"
                          value={editedRouteId}
                          onChange={(e) => setEditedRouteId(e.target.value)}
                        />
                      ) : (
                        route.routeId
                      )}
                    </td>
                    <td>
                      {editingId === route.id ? (
                        <input
                          type="text"
                          value={editedCheckpoints}
                          onChange={(e) => setEditedCheckpoints(e.target.value)}
                        />
                      ) : (
                        route.checkpoints
                      )}
                    </td>
                    <td>
                      {editingId === route.id ? (
                        <>
                          <button className="editsavebutton" onClick={() => saveEditHandler(route.id)}>Save</button>
                          <button className="editcancelbutton" onClick={() => setEditingId(null)}>Cancel</button>
                        </>
                      ) : (
                        <>
                          <FaEdit className="icon" onClick={() => startEditingHandler(route)} />
                          <BsFillTrashFill className="icon icon-trash" onClick={() => deleteRouteHandler(route.id)} />
                        </>
                      )}
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
