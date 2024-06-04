import React from "react";
import { Route,Routes } from "react-router-dom"
import AdminDashboard from "./Pages/AdminDashboard";

function App() {
  return (
      <Routes>
        <Route path="/" element={<AdminDashboard/>}></Route>
      </Routes>
  );
}

export default App;
