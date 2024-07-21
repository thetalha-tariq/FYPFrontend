import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Product from "./pages/Product";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Contact from "./Components/Contacts";
import AboutUs from "./pages/AboutUs";
import DoctorDetail from "./pages/DoctorDetail";
import SelectAndAddSlots from "./pages/SelectAndAddSlot";
import DoctorList from "./pages/DoctorList";
import AddProduct from "./pages/AdminPages/AddProduct";
import AddDoctor from "./pages/AdminPages/AddDoctor";
import AddSlot from "./pages/AdminPages/AddSlot";
import DoctorLogin from "./pages/DoctorLogin";
import Landing from "./pages/Landing";
import { CustomerLayout } from "./Layouts/CustomerLayout";
import { DoctorLayout } from "./Layouts/DoctorLayout";
import { AdminLayout } from "./Layouts/AdminLayout";


function App() {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const role = localStorage.getItem("role");
  const doctorID = localStorage.getItem("doctorId");

  console.log("isAuthenticated:", isAuthenticated);
  console.log("role:", role);

  return (
    <BrowserRouter>
      <div style={{ paddingTop: "64px" }}>
        {" "}
        {/* Adjust based on Navbar height */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/doctorLogin" element={<DoctorLogin />} />

            {/* ******USER ROUTES******* */}
          <Route
            path="/product"
            element={
              isAuthenticated && role === "customer" ? (
                <CustomerLayout>
                  <Product />
                </CustomerLayout>
              ) : (
                <Login />
              )
            } 
          />
      
          <Route
            path="/home"
            element={
              isAuthenticated && role == "customer" ? (
                < CustomerLayout>
                  <Home />
                </ CustomerLayout>
              ) : (
                <Login />
              )
            } 
          />
          <Route path="/" element={<Landing />} />

          <Route path="/Contact" element={
              isAuthenticated && role == "customer" ? (
                < CustomerLayout>
                  <Contact />
                </ CustomerLayout>
              ) : (
                <Login />
              )
            } />
          <Route path="/About" element={
              isAuthenticated && role == "customer" ? (
                < CustomerLayout>
                  <AboutUs />
                </ CustomerLayout>
              ) : (
                <Login />
              )
            } />
          <Route path="/appointment" element={
              isAuthenticated && role == "customer" ? (
                < CustomerLayout>
                  <DoctorList />
                </ CustomerLayout>
              ) : (
                <Login />
              )
            }  />


            {/* ******DOCTOR ROUTES******* */}
          <Route
            path="/Doctor"
            element={
              isAuthenticated && role === "doctor" ? (
                <DoctorLayout>
                <DoctorDetail doctorId={doctorID} />
                </DoctorLayout>
              ) : (
                <DoctorLogin />
              )
            } 
          />
          <Route path="/slot" element={
              isAuthenticated && role === "doctor" ? (
                <DoctorLayout>
                <SelectAndAddSlots />
                </DoctorLayout>
              ) : (
                <DoctorLogin />
              )
            }  />
          

          {/* Admin Components */}
          <Route path="/addProductAdmin" element={
              isAuthenticated && role === "admin" ? (
                <AdminLayout>
                <AddProduct />
                </AdminLayout>
              ) : (
                <Login />
              )
            }  />
          <Route path="/addDoctorAdmin" element={
              isAuthenticated && role === "admin" ? (
                <AdminLayout>
                <AddDoctor />
                </AdminLayout>
              ) : (
                <Login />
              )
            } />
          <Route path="/addSlotAdmin" element={
              isAuthenticated && role === "admin" ? (
                <AdminLayout>
                <AddSlot />
                </AdminLayout>
              ) : (
                <Login />
              )
            } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
