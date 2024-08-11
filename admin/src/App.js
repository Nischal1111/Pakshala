import React, { useState, useEffect, useContext } from "react";
import { Route, Routes, useLocation, Navigate, useNavigate } from "react-router-dom";
import AdminDashboard from "./Pages/AdminDashboard";
import Menu from "./Pages/Menu";
import Rooms from "./Pages/Rooms";
import Tables from "./Pages/Tables";
import Events from "./Pages/Events";
import Offer from "./Pages/Offer";
import Sidebar from "./components/Sidebar";
import Login from "./Pages/Login";
import MenuDash from "./components/MenuDash";
import RoomsDash from "./components/RoomsDash";
import TablesDash from "./components/TablesDash";
import EventDash from "./components/EventDash";
import ForgotPassword from "./Pages/ForgotPassword";
import OTP from "./Pages/OTP";
import { TokenContext } from "./components/TokenContext";
import { userLogged } from "./components/Cookie";

function App() {
  const { token } = useContext(TokenContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(userLogged());

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = userLogged();
      if (authStatus !== isAuthenticated) {
        console.log("Authentication status changed:", authStatus);
        setIsAuthenticated(authStatus);
      }
    };

    checkAuth();
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated && 
        location.pathname !== "/login" && 
        location.pathname !== "/forgotpassword" && 
        !location.pathname.startsWith("/create-new-password/")) {
      console.log("Redirecting to login from:", location.pathname);
      navigate("/login");
    }
  }, [location, isAuthenticated, navigate]);

  const hideSidebar = ["/login", "/forgotpassword", `/create-new-password/${token}`].includes(location.pathname);

  return (
    <>
      {!hideSidebar && isAuthenticated && <Sidebar />}
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <AdminDashboard /> : <Navigate to="/login" />}
        />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/create-new-password/:token" element={<OTP />} />
        <Route 
          path="/menu-dash" 
          element={isAuthenticated ? <MenuDash /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/rooms-dash" 
          element={isAuthenticated ? <RoomsDash /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/table-dash" 
          element={isAuthenticated ? <TablesDash /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/event-dash" 
          element={isAuthenticated ? <EventDash /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/menu" 
          element={isAuthenticated ? <Menu /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/rooms" 
          element={isAuthenticated ? <Rooms /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/tables" 
          element={isAuthenticated ? <Tables /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/events" 
          element={isAuthenticated ? <Events /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/offers" 
          element={isAuthenticated ? <Offer /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/login" 
          element={
            <Login 
              setIsAuthenticated={setIsAuthenticated} 
              isAuthenticated={isAuthenticated}
            />
          } 
        />
      </Routes>
    </>
  );
}

export default App;
