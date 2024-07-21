import React from "react";
import { Link } from "react-router-dom";
import "../Style/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserLarge } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <nav className="col-span-12 md:col-span-10   overflow-auto bg-gray-100 navbar">
      <div className="brand">
        <span className="brand-text">PetMediConnect</span>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/services">Services</Link>
        </li>
        <li>
          <Link to="/appointment">Make Appointment</Link>
        </li>
        <li>
          <Link to="/product">Products</Link>
        </li>
        <li>
          <Link to="/contact">Contact Us</Link>
        </li>
      </ul>
      <div className="login-container">
        <Link to="/" className="login-button"><FontAwesomeIcon icon={faUserLarge} /></Link>
      </div>
    </nav>
  );
};

export default Navbar;
