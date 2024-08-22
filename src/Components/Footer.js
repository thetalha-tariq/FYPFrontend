import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-yellow-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3">
            <h2 className="text-2xl font-bold">About Us</h2>
            <p className="mt-4">
              We are committed to providing the best services<br></br> for your pets, ensuring their health and happiness.
            </p>
          </div>
          <div className="w-full md:w-1/3">
            <h2 className="text-2xl font-bold">Quick Links</h2>
            <ul className="mt-4">
              <li className="mb-2">
                <a href="/about" className="hover:underline">About Us</a>
              </li>
              <li className="mb-2">
                <a href="/appointment" className="hover:underline">Make Appointment</a>
              </li>
              <li className="mb-2">
                <a href="/product" className="hover:underline">Products</a>
              </li>
              <li className="mb-2">
                <a href="/contact" className="hover:underline">Contact Us</a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h2 className="text-2xl font-bold">Follow Us</h2>
            <div className="flex mt-4 space-x-4">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500">
                <FontAwesomeIcon icon={faFacebookF} size="2x" />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500">
                <FontAwesomeIcon icon={faTwitter} size="2x" />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500">
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500">
                <FontAwesomeIcon icon={faLinkedinIn} size="2x" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; {new Date().getFullYear()} Pet MediConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;