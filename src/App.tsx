import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddDoctor from "./components/AddDoctor";
import DoctorList from "./components/DoctorList";

const App: React.FC = () => {
  return (
    <Router>
      <nav style={{ padding: "15px", background: "#f0f0f0" }}>
        <Link to="/" style={{ marginRight: "20px" }}>Add Doctor</Link>
        <Link to="/doctors">View Doctors</Link>
      </nav>

      <Routes>
        <Route path="/" element={<AddDoctor />} />
        <Route path="/doctors" element={<DoctorList />} />
      </Routes>
    </Router>
  );
};

export default App;
