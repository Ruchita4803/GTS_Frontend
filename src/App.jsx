import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Header from "./Component/header";
import Sidebar from "./Component/Sidebar";
import Home from "./Component/Home";
import GuardSetup from "./Component/GuardSetup";
import CheckpointSetup from "./Component/CheckpointSetup";
import RouteSetup from "./Component/RouteSetup";
import PatrolSetup from "./Component/PatrolSetup";
import ScheduleSetup from "./Component/ScheduleSetup";
import Insightlog from "./Component/Insightlog";
import IncidentReport from "./Component/IncidentReport";
import MissedCheckpointReport from "./Component/MissedCheckpointReport";
import AbsentGuardReport from "./Component/AbsentGuardReport";
import Login from "./Component/Login";
import Signup from "./Component/SignUp";
import OTP from "./Component/OTP";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const[isOTPSent, setIsOTPSent]=useState(false); //Track OTP status
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleSignup = () => {
    setIsOTPSent(true);
  };

  const handleOTP=()=>{
    setIsAuthenticated(true);
  }

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <BrowserRouter>
      {isAuthenticated ? (
        <div className="grid-container">
          <Header OpenSidebar={OpenSidebar} />
          <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/guardSetup" element={<GuardSetup />} />
            <Route path="/checkpointSetup" element={<CheckpointSetup />} />
            <Route path="/routeSetup" element={<RouteSetup />} />
            <Route path="/patrolSetup" element={<PatrolSetup />} />
            <Route path="/scheduleSetup" element={<ScheduleSetup />} />
            <Route path="/insightlog" element={<Insightlog />} />
            <Route path="/incidentReport" element={<IncidentReport />} />
            <Route path="/missedCheckpointReport" element={<MissedCheckpointReport />} />
            <Route path="/absentGuardReport" element={<AbsentGuardReport />} />
          </Routes>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          {!isOTPSent?(
            <Route path="/signup" element={<Signup handleSignup={handleSignup}/>}/>
          ):(
            <Route path="/otp" element={<OTP handleOTP={handleOTP}/>}/>
          )}
          
          <Route path="*" element={<Navigate to={isOTPSent?"/otp":"/login"} />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
