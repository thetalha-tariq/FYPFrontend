import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Style/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faBell } from "@fortawesome/free-solid-svg-icons";

const DoctorNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.clear();
      alert("Successfully logged out :(");
      navigate("/"); 
    }
  };

  return (
    <nav className="col-span-12 md:col-span-10 overflow-auto bg-gray-100 navbar">
      <div className="brand">
        <span className="brand-text">PetMediConnect</span>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/doctor">Manage Profile</Link>
        </li>
        <li>
          <Link to="/manageappointment">Manage Appointments</Link>
        </li>
        <li>
          <Link to="/appoveAppointments">Approve Appointments</Link>
        </li>
        <li>
          <Link to="/contactSupport">Contact Support</Link>
        </li>
      </ul>
      <div className="icon-container">
        {/* <Link to="/notifications" className="notification-button">
          <FontAwesomeIcon icon={faBell} />
        </Link> */}
        <div className="login-container" >
        <button className="login-button" onClick={handleLogout}>
          <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
      </div>
      </div>
    </nav>
  );
};

export default DoctorNavbar;
