// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import WelcomePage from "./WelcomePage";
import LoginPage from "./LoginPage";
import CreateAccountPage from "./CreateAccountPage";
import Dashboard from "./Dashboard";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/createAccount" element={<CreateAccountPage />} />
        <Route path="/Dashboard" element={<Dashboard />} />

      </Routes>
    </Router>
  );
}

export default App;
