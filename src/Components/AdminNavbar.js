import React from "react";
import { Link } from "react-router-dom";
import "../Style/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserLarge, faBell } from "@fortawesome/free-solid-svg-icons";

const AdminNavBar = () => {
  return (
    <nav className="col-span-12 md:col-span-10 overflow-auto bg-gray-100 navbar">
      <div className="brand">
        <span className="brand-text">PetMediConnect</span>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/manageuser">Manage Users</Link>
        </li>
        <li>
          <Link to="/managedoctor">Manage Doctors</Link>
        </li>
        <li>
          <Link to="/addDoctorAdmin">Add Doctor</Link>
        </li>
        <li>
          <Link to="/addSlotAdmin">Manage Slots</Link>
        </li>
        <li>
          <Link to="/addProductAdmin">Manage Products</Link>
        </li>
        <li>
          <Link to="/manageAppointmentAdmin">Appointment</Link>
        </li>
        <li>
          <Link to="/contactformAdmin">Contact Form Data</Link>
        </li>
      </ul>
      <div className="icon-container">
        
        <Link to="/" className="login-button">
          <FontAwesomeIcon icon={faUserLarge} />
        </Link>
      </div>
    </nav>
  );
};

export default AdminNavBar;
