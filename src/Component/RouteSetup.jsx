import React, { useState, useEffect } from 'react';
import './SetupTable.css';
import { FaEdit } from 'react-icons/fa';
import axios from 'axios';
import { BsFillTrashFill } from 'react-icons/bs';
import AddRoute from './AddRoute';
import {Url} from "../Api/Url";
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
        const token = localStorage.getItem("authToken");
        const response = await axios.get(Url.fetchroutes, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
    return <div className='display-msg'>Loading...</div>;
  }

  if (error) {
    return <div className='display-msg'>Error: {error}</div>;
  }


  //Add routes
  const addRouteHandler = async (route) => {
    try {
      const response = await axios.post(Url.addroutes, route);
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
    setEditingId(route.routeId);
    setEditedRouteId(route.routeId);
    setEditedCheckpoints(route.checkpoints);
  };
  
  const saveEditHandler = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(Url.editroutes, {
        routeId: id,
        newRouteName: editedRouteId,
        newcheckPointNames: editedCheckpoints,
      },{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setRoutes(routes.map((route) =>
          route.routeId === id ? { ...route, routeId: editedRouteId, checkpoints: editedCheckpoints } : route
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
      const response = await axios.delete(Url.deleteroutes, { data: { routeId } });
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
                  <tr key={route.routeId}>
                    <td>{index + 1}</td>
                    <td>
                      {editingId === route.routeId ? (
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
                      {editingId === route.routeId ? (
                        <input
                          type="text"
                          value={editedCheckpoints}
                          onChange={(e) => setEditedCheckpoints(e.target.value)}
                        />
                      ) : (
                        `${route.checkPointName}`
                      )}
                    </td>
                    <td>
                      {editingId === route.routeId ? (
                        <>
                          <button className="editsavebutton" onClick={() => saveEditHandler(route.routeId)}>Save</button>
                          <button className="editcancelbutton" onClick={() => setEditingId(null)}>Cancel</button>
                        </>
                      ) : (
                        <>
                          <FaEdit className="icon" onClick={() => startEditingHandler(route)} />
                          <BsFillTrashFill className="icon icon-trash" onClick={() => deleteRouteHandler(route.routeId)} />
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
