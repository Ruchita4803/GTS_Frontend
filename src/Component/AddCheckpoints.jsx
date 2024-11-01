import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import "./AddForm.css";
import { Url } from "../Api/Url";

const AddCheckpoints = ({ addCheckpointHandler, closeForm }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [qrGenerated, setQrGenerated] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        Url.addcheckpoints,
        {
          "checkpointName": title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        addCheckpointHandler({ id: response.data.id, title, description });
        setTitle("");
        setDescription("");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert("An error occurred while adding the checkpoint. Please try again.");
    }
  };

  const handleGenerateQR = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        Url.generate_qr,
        {
          location: title, // Send only the location
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setQrGenerated(true);
        alert("QR Code generated and saved successfully!");
      } else {
        alert("Failed to generate QR Code. Please try again.");
      }
    } catch (error) {
      alert(
        "An error occurred while generating the QR Code. Please try again."
      );
    }
  };

  return (
    <div className="add-container">
      <div className="form-header">
        <h2>Add New Checkpoint</h2>
        <FaTimes className="close-icon" onClick={closeForm} />
      </div>
      <div className="form-content">
        <form onSubmit={handleSubmit} className="left-form">
          <div className="form-group">
            <label htmlFor="title">Checkpoint Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit" className="add-button">
            Submit
          </button>
        </form>
        <div className="qr-code-section">
          <button
            className="add-button"
            onClick={handleGenerateQR}
            disabled={qrGenerated}
          >
            {qrGenerated ? "QR Code Generated" : "Generate QR"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCheckpoints;
