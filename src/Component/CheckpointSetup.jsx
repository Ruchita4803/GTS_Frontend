import React, { useState, useEffect } from 'react';
import './SetupTable.css';
import { FaEdit } from 'react-icons/fa';
import axios from 'axios';
import { BsFillTrashFill } from 'react-icons/bs';
import AddCheckpoints from './AddCheckpoints';

const CheckpointSetup = () => {
  const [checkpoints, setCheckpoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');


  //Fetch checkpoints
  useEffect(() => {
    const fetchCheckpoints = async () => {
      try {
        const response = await axios.get('/api/checkpoints');
        setCheckpoints(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCheckpoints();
  }, []);

  if (loading) return <div className='display-msg'>Loading...</div>;
  if (error) return <div className='display-msg'>Error: {error}</div>;


  //Add Checkpoints
  const addCheckpointHandler = (checkpoint) => {
    setCheckpoints([...checkpoints, checkpoint]);
    setShowAddForm(false);
  };

  //Edit Checkpoints
  const startEditingHandler = (checkpoint) => {
    setEditingId(checkpoint.id);
    setEditedTitle(checkpoint.title);
    setEditedDescription(checkpoint.description);
  };

  const saveEditHandler = async (id) => {
    try {
      const response = await axios.put('/api/checkpoints', {
        checkpointId: id,
        checkpointName: editedTitle,
        description: editedDescription,
      });
      if (response.data.success) {
        setCheckpoints(
          checkpoints.map((checkpoint) =>
            checkpoint.id === id ? { ...checkpoint, title: editedTitle, description: editedDescription } : checkpoint
          )
        );
        setEditingId(null);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert('An error occurred while updating the checkpoint. Please try again.');
    }
  };

  const deleteCheckpointHandler = async (id) => {
    try {
      const response = await axios.delete('/api/checkpoints', { data: { checkpointId: id } });
      if (response.data.success) {
        setCheckpoints(checkpoints.filter((checkpoint) => checkpoint.id !== id));
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert('An error occurred while deleting the checkpoint. Please try again.');
    }
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
                    <td>
                      {editingId === checkpoint.id ? (
                        <input
                          type="text"
                          value={editedTitle}
                          onChange={(e) => setEditedTitle(e.target.value)}
                        />
                      ) : (
                        checkpoint.title
                      )}
                    </td>
                    <td>
                      {editingId === checkpoint.id ? (
                        <input
                          type="text"
                          value={editedDescription}
                          onChange={(e) => setEditedDescription(e.target.value)}
                        />
                      ) : (
                        checkpoint.description
                      )}
                    </td>
                    <td>
                      {editingId === checkpoint.id ? (
                        <>
                          <button className="editsavebutton" onClick={() => saveEditHandler(checkpoint.id)}>Save</button>
                          <button className="editcancelbutton" onClick={() => setEditingId(null)}>Cancel</button>
                        </>
                      ) : (
                        <>
                          <FaEdit className="icon" onClick={() => startEditingHandler(checkpoint)} />
                          <BsFillTrashFill className="icon icon-trash" onClick={() => deleteCheckpointHandler(checkpoint.id)} />
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

export default CheckpointSetup;


