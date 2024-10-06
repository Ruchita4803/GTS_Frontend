import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import Home from "./pages/Home";
import GuardSetup from "./Component/GuardSetup";
import CheckpointSetup from "./Component/CheckpointSetup";
import RouteSetup from "./Component/RouteSetup";
import PatrolSetup from "./Component/PatrolSetup";
import ScheduleSetup from "./Component/ScheduleSetup";
import Insightlog from "./Component/Insightlog";
import IncidentReport from "./Component/IncidentReport";
import MissedCheckpointReport from "./Component/MissedCheckpointReport";
import AbsentGuardReport from "./Component/AbsentGuardReport";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import OTP from "./Component/OTP";
import LogOut from "./Component/LogOut";
import Layout from "./pages/Layout";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOTPSent, setIsOTPSent] = useState(false); // Track OTP status
  const [userData, setUserData] = useState(null); // Store user data
  
  const handleSignup = (data) => {
    setUserData(data);
    setIsOTPSent(true);
  };

  const handleOTP = () => {
    setIsAuthenticated(true);
    setIsOTPSent(false);
    setUserData(null);
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup handleSignup={handleSignup} />} />
        <Route exact path="/otp" element={<OTP handleOTP={handleOTP} userData={userData}/>} />
        <Route exact path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/setup">
            <Route path="guard" element={<GuardSetup />} />
            <Route path="checkpoint" element={<CheckpointSetup />} />
            <Route path="route" element={<RouteSetup />} />
            <Route path="patrol" element={<PatrolSetup />} />
           
          </Route>
          <Route path="/schedule" element={<ScheduleSetup />} />
          <Route path="/insightlog" element={<Insightlog />} />

          <Route path="/report">
          <Route path="incident" element={<IncidentReport />} />
          <Route
            path="missedCheckpoint"
            element={<MissedCheckpointReport />}
          />
          <Route path="absentGuard" element={<AbsentGuardReport />} />
          </Route>
          
        </Route>

        <Route path="/logout" element={<LogOut />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
