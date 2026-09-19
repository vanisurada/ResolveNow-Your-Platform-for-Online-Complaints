import React, { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handle = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/api/auth/login", form);
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
      <h3 style={{ marginTop: "10px" }}>Login</h3>
      <form onSubmit={handle}>
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
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            className="form-control"
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>
        <button className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
}
