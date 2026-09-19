import React, { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });
  const navigate = useNavigate();

  const handle = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/api/auth/register", form);
      localStorage.setItem("token", res.data.token);
      if (res.data.user) {
        localStorage.setItem("userData", JSON.stringify(res.data.user));
      }
      window.dispatchEvent(new Event("userLoggedIn"));
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.msg || "Error");
    }
  };

  return (
    <div className="card p-4">
      <Link
        to="/"
        style={{
          fontSize: "24px",
          textDecoration: "none",
          color: "#667eea",
          marginBottom: "15px",
          display: "inline-block",
        }}
        title="Go back to home"
      >
        ← Back to Home
      </Link>
      <h3 style={{ marginTop: "10px" }}>Sign Up</h3>
      <form onSubmit={handle}>
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Full Name
          </label>
          <input
            id="name"
            className="form-control"
            type="text"
            placeholder="Enter your full name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            id="email"
            className="form-control"
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobile" className="form-label">
            Mobile Number
          </label>
          <input
            id="mobile"
            className="form-control"
            type="tel"
            placeholder="Enter your mobile number"
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            className="form-control"
            type="password"
            placeholder="Enter a strong password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>
        <button className="btn btn-primary w-100">Register</button>
      </form>
    </div>
  );
}
