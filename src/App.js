import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Product from "./pages/Product";
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
import DisplayDoctorSlot from "./pages/DisplayDoctorSlot";
import ManageUsers from "./pages/AdminPages/ManageUsers";
import ManageDoctors from "./pages/AdminPages/ManageDoctors";
import ManageUserContacts from "./pages/AdminPages/ManageUserContacts";
import AppoveAppointment from "./pages/AppoveAppointment";
import AppointmentUser from "./pages/AppointmentUser";
import ManageAppointment from "./pages/AdminPages/ManageAppointment";
import ContactSupport from "./pages/ContactSupport";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";


function AppContent() {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const role = localStorage.getItem("role");
  const doctorID = localStorage.getItem("doctorId");
  const userID = localStorage.getItem("userId");
  const location = useLocation();

  console.log("isAuthenticated:", isAuthenticated);
  console.log("role:", role);

  const shouldApplyPadding = location.pathname !== "/";

  return (
    <div style={{ paddingTop: shouldApplyPadding ? "64px" : "0" }}>
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
              <CustomerLayout>
                <Home />
              </CustomerLayout>
            ) : (
              <Login />
            )
          }
        />
        <Route path="/" element={<Landing />} />

        <Route
          path="/Contact"
          element={
            isAuthenticated && role == "customer" ? (
              <CustomerLayout>
                <Contact userId={userID} />
              </CustomerLayout>
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/About"
          element={
            isAuthenticated && role == "customer" ? (
              <CustomerLayout>
                <AboutUs />
              </CustomerLayout>
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/appointment"
          element={
            isAuthenticated && role == "customer" ? (
              <CustomerLayout>
                <DoctorList userId={userID}/>
              </CustomerLayout>
            ) : (
              <Login />
            )
          }
        />

        <Route
          path="/appointmentUser"
          element={
            isAuthenticated && role == "customer" ? (
              <CustomerLayout>
                <AppointmentUser userId={userID}/>
              </CustomerLayout>
            ) : (
              <Login />
            )
          }
        />

        <Route
          path="/forgotPassword"
          element={
                <ForgetPassword/>
          }
        />
        <Route
          path="/resetPassword"
          element={
                <ResetPassword/>
          }
        />

        {/* ******DOCTOR ROUTES******* */}
        <Route
          path="/doctor"
          element={
            isAuthenticated && (role === "doctor" || role === "groomer") ? (
              <DoctorLayout>
                <DoctorDetail doctorId={doctorID} />
              </DoctorLayout>
            ) : (
              <DoctorLogin />
            )
          }
        />
        <Route
          path="/slot"
          element={
            isAuthenticated && role === "doctor" ? (
              <DoctorLayout>
                <SelectAndAddSlots />
              </DoctorLayout>
            ) : (
              <DoctorLogin />
            )
          }
        />
        <Route
          path="/manageappointment"
          element={
            isAuthenticated && (role === "doctor" || role === "groomer") ? (
              <DoctorLayout>
                <DisplayDoctorSlot doctorId={doctorID} />
              </DoctorLayout>
            ) : (
              <DoctorLogin />
            )
          }
        />
        <Route
          path="/appoveAppointments"
          element={
            isAuthenticated && (role === "doctor" || role === "groomer") ? (
              <DoctorLayout>
                <AppoveAppointment doctorId={doctorID} />
              </DoctorLayout>
            ) : (
              <DoctorLogin />
            )
          }
        />

        <Route
          path="/contactSupport"
          element={
            isAuthenticated && (role === "doctor" || role === "groomer") ? (
              <DoctorLayout>
                <ContactSupport doctorId={doctorID} />
              </DoctorLayout>
            ) : (
              <DoctorLogin />
            )
          }
        />

        {/* Admin Components */}
        <Route
          path="/manageuser"
          element={
            isAuthenticated && role === "admin" ? (
              <AdminLayout>
                <ManageUsers />
              </AdminLayout>
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/managedoctor"
          element={
            isAuthenticated && role === "admin" ? (
              <AdminLayout>
                <ManageDoctors />
              </AdminLayout>
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/addProductAdmin"
          element={
            isAuthenticated && role === "admin" ? (
              <AdminLayout>
                <AddProduct />
              </AdminLayout>
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/addDoctorAdmin"
          element={
            isAuthenticated && role === "admin" ? (
              <AdminLayout>
                <AddDoctor />
              </AdminLayout>
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/addSlotAdmin"
          element={
            isAuthenticated && role === "admin" ? (
              <AdminLayout>
                <AddSlot />
              </AdminLayout>
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/contactformAdmin"
          element={
            isAuthenticated && role === "admin" ? (
              <AdminLayout>
                <ManageUserContacts />
              </AdminLayout>
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/manageAppointmentAdmin"
          element={
            isAuthenticated && role === "admin" ? (
              <AdminLayout>
                <ManageAppointment />
              </AdminLayout>
            ) : (
              <Login />
            )
          }
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
