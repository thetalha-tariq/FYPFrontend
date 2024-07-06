import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Product from "./pages/Product";
import Navbar from "./Components/Navbar";
import CreatePage from "../src/pages/CreatePage"
import Footer from "./Components/Footer";
import Contact from "./Components/Contacts";
import AboutUs from "./pages/AboutUs";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Toaster position="top-center" reverseOrder={false} />
      <div style={{ paddingTop: '64px' }}> {/* Adjust based on Navbar height */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product" element={<Product />} />
          <Route path="/" element={<Home />} />
          <Route path="/createpage" element={<CreatePage />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/About" element={<AboutUs />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
