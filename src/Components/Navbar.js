import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Style/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.clear();
      navigate("/");
    }
  };

  return (
    <nav className="navbar">
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
          <Link to="/appointment">Appointment System</Link>
        </li>
        <li>
          <Link to="/product">Pet Store</Link>
        </li>
        <li>
          <Link to="/communityforum">Pet Community Forum</Link>
        </li>
        <li>
          <Link to="/contact">Contact Us</Link>
        </li>
        <div className="relative ml-10">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="ml-10 text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center inline-flex items-center"
            type="button"
          >
            Manage Profile
            <svg
              className="w-2.5 h-2.5 ml-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          {/* Dropdown menu */}
          <div
            className={`absolute right-0 mt-2 z-20 ${
              dropdownOpen ? "" : "hidden"
            } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDefaultButton"
            >
              <li>
                <Link
                  to="/myProfile"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Your Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/my-orders"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  My Orders
                </Link>
              </li>
              <li>
                <Link
                  to="/appointmentUser"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  My Appointments
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </ul>
      <div className="login-container">
        <button className="login-button" onClick={handleLogout}>
          <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
