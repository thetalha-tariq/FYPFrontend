import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="brand">
        <span className="brand-text">PetMediConnect</span>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link> 
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
      <Link to="/login" className="login-button">Login</Link> 
  </div>
    </nav>
  );
};

export default Navbar;
