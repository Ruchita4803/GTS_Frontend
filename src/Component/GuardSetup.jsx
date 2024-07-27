
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SetupTable.css';

const GuardSetup = () => {
  const [guards, setGuards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGuards = async () => {
      try {
        const response = await axios.get('/api/guards'); // Replace with your API endpoint
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
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
                <td>{guard.name}</td>
                <td>{guard.mobile}</td>
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
