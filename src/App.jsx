import { useState } from "react";
import "./App.css";
import Header from "./Component/header";
import Sidebar from "./Component/Sidebar";
import Home from "./Component/Home";
import GuardSetup from "./Component/GuardSetup";
import CheckpointSetup from "./Component/CheckpointSetup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RouteSetup from "./Component/RouteSetup";
import PatrolSetup from "./Component/PatrolSetup";
import ScheduleSetup from "./Component/ScheduleSetup";
import Insightlog from "./Component/Insightlog";
import IncidentReport from "./Component/IncidentReport"
import MissedCheckpointReport from "./Component/MissedCheckpointReport"
import AbsentGuardReport from './Component/AbsentGuardReport'
function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <BrowserRouter>
      <div className="grid-container">
        <Header OpenSidebar={OpenSidebar} />
        <Sidebar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/guardSetup" element={<GuardSetup />} />
          <Route path="/checkpointSetup" element={<CheckpointSetup />} />
          <Route path="/routeSetup" element={<RouteSetup />} />
          <Route path="/patrolSetup" element={<PatrolSetup />} />
          <Route path="/scheduleSetup" element={<ScheduleSetup  />} />
          <Route path="/insightlog" element={<Insightlog  />} />
          <Route path="/incidentReport" element={<IncidentReport  />} />
          <Route path="/missedCheckpointReport" element={<MissedCheckpointReport  />} />
          <Route path="/absentGuardReport" element={<AbsentGuardReport  />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
