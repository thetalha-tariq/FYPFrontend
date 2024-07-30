import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Style/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const AdminNavBar = () => {
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
      <div className="login-container" >
        <button className="login-button" onClick={handleLogout}>
          <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
      </div>
    </nav>
  );
};

export default AdminNavBar;
