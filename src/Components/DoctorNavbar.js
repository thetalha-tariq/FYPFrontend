import React from "react";
import { Link } from "react-router-dom";
import "../Style/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserLarge, faBell } from "@fortawesome/free-solid-svg-icons";

const DoctorNavbar = () => {
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
          <Link to="/manageappointment">Manage Appointment</Link>
        </li>
        <li>
          <Link to="/contactSupport">Contact Support</Link>
        </li>
      </ul>
      <div className="icon-container">
        <Link to="/notifications" className="notification-button">
          <FontAwesomeIcon icon={faBell} />
        </Link>
        <Link to="/" className="login-button">
          <FontAwesomeIcon icon={faUserLarge} />
        </Link>
      </div>
    </nav>
  );
};

export default DoctorNavbar;
