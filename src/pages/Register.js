import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function Register() {
  const navigate = useNavigate();
  const onSubmit = async (e, values) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/user/register", values);
      if (response.data.success) {
        toast.success(response.data.message, { duration: 1000 }); // Set duration to 1000 milliseconds (1 second)
        toast.success("Redirecting to Login Page");
        navigate("/login");
      } else {
        toast.error(response.data.message, { duration: 1000 }); // Set duration to 1000 milliseconds (1 second)
      }
    } catch (error) {
      toast.error("Something went wrong", { duration: 1000 }); // Set duration to 1000 milliseconds (1 second)
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Registration Form</h2>
      <form onSubmit={(e) => onSubmit(e, formData)}>
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="name"
            style={{ fontWeight: "bold", display: "block" }}
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              boxSizing: "border-box",
            }}
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="email"
            style={{ fontWeight: "bold", display: "block" }}
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              boxSizing: "border-box",
            }}
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="password"
            style={{ fontWeight: "bold", display: "block" }}
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              boxSizing: "border-box",
            }}
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <input
          type="submit"
          value="Register"
          style={{
            width: "100%",
            padding: "10px",
            border: "none",
            backgroundColor: "#007bff",
            color: "#fff",
            cursor: "pointer",
            borderRadius: "5px",
            transition: "background-color 0.3s",
          }}
        />
        <Link to="/login">Click Here To Login </Link>
      </form>
    </div>
  );
}

export default Register;
