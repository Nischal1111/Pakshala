import React, { useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../css/admindashboard.css";
import { userLogged } from "../components/Cookie";
import { lognotify } from "../components/Notify";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { IoFastFoodOutline } from "react-icons/io5";
import { MdBedroomParent, MdOutlineTableBar, MdEvent } from "react-icons/md";
import { FaBell } from "react-icons/fa";
import { CheckContext } from "../components/CheckBoxContext";
import { RoomReserveContext } from "../components/RoomReserveContext";
import { TableReserveContext } from "../components/TableContext";
import { EventContext } from "../components/EventContext";
import { TokenContext } from "../components/TokenContext";

const AdminDashboard = () => {
  const { orderDetails, getOrderDetails } = useContext(CheckContext);
  const { reserveDetails, getReserveDetails } = useContext(RoomReserveContext);
  const { tableReservations, fetchTableReservations } = useContext(TableReserveContext);
  const { eventBookings, fetchEventBookings } = useContext(EventContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useContext(TokenContext);

  useEffect(() => {
    if (
      !userLogged() &&
      location.pathname !== "/forgotpassword" &&
      location.pathname !== `/create-new-password/${token}`
    ) {
      navigate("/login");
    }
  }, [navigate, location.pathname, token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchEventBookings();
        await getReserveDetails();
        await getOrderDetails();
        await fetchTableReservations();
        if (userLogged() && localStorage.getItem("notify") === "true") {
          lognotify();
          localStorage.removeItem("notify");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Optionally, show an error message to the user
      }
    };
    fetchData();
  }, [fetchEventBookings, getReserveDetails, getOrderDetails, fetchTableReservations]);

  const MenuNotifications = orderDetails.filter(order => order.status === "Pending");
  const RoomNotifications = reserveDetails.filter(reserve => reserve.status === "Pending");
  const TableNotifications = tableReservations.filter(reservation => reservation.status === "Pending");
  const EventNotifications = eventBookings.filter(booking => booking.status === "Pending");

  return (
    <div>
      <ToastContainer />
      <Sidebar />
      <div className="admin-dashboard">
        <h1 className="dashboard-title">Dashboard for user reservations and bookings</h1>
        <section className="dashboard">
          <Link to="/menu-dash" className="link-dash">
            <div className="dashboard-card">
              <div style={{ display: "flex" }}>
                <IoFastFoodOutline className="dash-icon" />
                <p>Menu Orders</p>
              </div>
              <div style={{ position: "relative" }}>
                <FaBell className="dash-icon" />
                <div className="notification-bubble">
                  <p className="notification-text">{MenuNotifications.length}</p>
                </div>
              </div>
            </div>
          </Link>
          <Link to="/rooms-dash" className="link-dash">
            <div className="dashboard-card">
              <div style={{ display: "flex" }}>
                <MdBedroomParent className="dash-icon" />
                <p>Room Reservations</p>
              </div>
              <div style={{ position: "relative" }}>
                <FaBell className="dash-icon" />
                <div className="notification-bubble">
                  <p className="notification-text">{RoomNotifications.length}</p>
                </div>
              </div>
            </div>
          </Link>
          <Link to="/table-dash" className="link-dash">
            <div className="dashboard-card">
              <div style={{ display: "flex" }}>
                <MdOutlineTableBar className="dash-icon" />
                <p>Table Reservations</p>
              </div>
              <div style={{ position: "relative" }}>
                <FaBell className="dash-icon" />
                <div className="notification-bubble">
                  <p className="notification-text">{TableNotifications.length}</p>
                </div>
              </div>
            </div>
          </Link>
          <Link to="/event-dash" className="link-dash">
            <div className="dashboard-card">
              <div style={{ display: "flex" }}>
                <MdEvent className="dash-icon" />
                <p>Event Bookings</p>
              </div>
              <div style={{ position: "relative" }}>
                <FaBell className="dash-icon" />
                <div className="notification-bubble">
                  <p className="notification-text">{EventNotifications.length}</p>
                </div>
              </div>
            </div>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
