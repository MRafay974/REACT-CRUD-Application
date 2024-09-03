import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EditNurse from "./editNurse/EditNurse";
import Home from "./home/Home";
import EditPatient from "./editPatient/EditPatient";

export default function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/edit_nurse/:id" element={<EditNurse />}></Route>
          <Route path="/edit_patient/:id" element={<EditPatient />}></Route>
        </Routes>
      </Router>
    </div>
  );
}
