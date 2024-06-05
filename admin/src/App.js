import React from "react";
import { Route,Routes } from "react-router-dom"
import AdminDashboard from "./Pages/AdminDashboard";
import Menu from "./Pages/Menu";
import Rooms from "./Pages/Rooms";
import Tables from "./Pages/Tables";
import Events from "./Pages/Events";
import Offer from "./Pages/Offer";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <>
    <Sidebar/>
      <Routes>
        <Route path="/" element={<AdminDashboard/>}></Route>
        <Route path="/menu" element={<Menu/>}></Route>
        <Route path="/rooms" element={<Rooms/>}></Route>
        <Route path="/tables" element={<Tables/>}></Route>
        <Route path="/events" element={<Events/>}></Route>
        <Route path="/offers" element={<Offer/>}></Route>
      </Routes>
    </>
  );
}

export default App;
