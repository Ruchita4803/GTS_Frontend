
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SetupTable.css';
import {Url} from "../Api/Url"
const GuardSetup = () => {
  const [guards, setGuards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGuards = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(Url.fetchguards, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }); // Replace with your API endpoint
        setGuards(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchGuards();
  }, []);

  if (loading) {
    return <div className='display-msg'>Loading...</div>;
  }

  if (error) {
    return <div className='display-msg'>Error: {error}</div>;
  }

  return (
    <main className="main-container">
      <div className="Content">
        <h1>GUARD SETUP</h1>
        <table className="Table">
          <thead>
            <tr>
              <th>Sr.No.</th>
              <th>Guard Name</th>
              <th>Mobile No.</th>
              <th>Email id</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {guards.map((guard, index) => (
              <tr key={guard.id}>
                <td>{index + 1}</td>
                <td>{`${guard.firstName} ${guard.lastName}`}</td>
                <td>{guard.contactNumber}</td>
                <td>{guard.email}</td>
                <td>{guard.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default GuardSetup;

