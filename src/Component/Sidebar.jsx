import React, { useState } from "react";
import {
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
 
} from "react-icons/bs";

import { FaUserShield } from "react-icons/fa";
import { Link } from "react-router-dom";

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  //Dropdown for Setup
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
 
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  // End of Dropdown for Setup

  // Dropdown for Report
  const [showReportDropdown, setShowReportDropdown] = useState(false);


 

  const toggleReportDropdown = () => {
    setShowReportDropdown(!showReportDropdown);
  };
  // end of dropdown for report

  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <FaUserShield className="icon_header" />
          PatrolMaster360
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <Link to="/">
            <BsGrid1X2Fill className="icon" /> Dashboard
          </Link>
        </li>
        <li className="sidebar-list-item" onClick={toggleDropdown}>
          <div className="dropdown-toggle">
            <BsFillArchiveFill className="icon" />
            Setup
          </div>
          {showDropdown && (
            <ul className="dropdown-menu">
              <li className="sidebar-list-item">
                <Link to="/guardSetup">Guard</Link>
              </li>
              <li className="sidebar-list-item">
                <Link to="/checkpointSetup">Checkpoints</Link>
              </li>
              <li className="sidebar-list-item">
                <Link to="/routeSetup">Routes</Link>
              </li>
              <li className="sidebar-list-item">
                <Link to="/patrolSetup">Patrols</Link>
              </li>
              
            </ul>
          )}
        </li>
        <li className="sidebar-list-item">
          <Link to="/scheduleSetup">
            <BsFillGrid3X3GapFill className="icon" />
            Schedule
          </Link>
        </li>
        <li className="sidebar-list-item">
        <Link to="/insightlog">
            <BsPeopleFill className="icon" /> Insight Log
            </Link>
        </li>
        <li className="sidebar-list-item" onClick={toggleReportDropdown}>
          <div className="dropdown-toggle">
            <BsFillArchiveFill className="icon" />
            Report
          </div>
          {showReportDropdown && (
            <ul className="dropdown-menu">
              <li className="sidebar-list-item">
              <Link to="/incidentReport">Incident </Link>
              </li>
              <li className="sidebar-list-item">
              <Link to="/absentGuardReport">Absent Guards</Link>
              </li>
              <li className="sidebar-list-item">
              <Link to="/missedCheckpointReport">Missed Checkpoints </Link>
              </li>
            </ul>
          )}
        </li>

      
      </ul>
      {selectedOption && (
        <div className="selected-option">You selected: {selectedOption}</div>
      )}
    </aside>
  );
}

export default Sidebar;
