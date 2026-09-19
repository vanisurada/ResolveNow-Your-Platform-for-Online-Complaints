import React, { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function SubmitComplaint() {
  const [form, setForm] = useState({ title: "", description: "" });
  const navigate = useNavigate();

  const handle = async (e) => {
    e.preventDefault();
    try {
      await API.post("/api/complaints", form);
      navigate("/my-complaints");
    } catch (err) {
      alert(err.response?.data?.msg || "Error");
    }
  };

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div className="card p-4" style={{ position: "relative" }}>
      <div style={{ marginBottom: "15px" }}>
        <Link
          to="/dashboard"
          style={{
            fontSize: "20px",
            textDecoration: "none",
            color: "#667eea",
            marginRight: "15px",
          }}
          title="Go back to dashboard"
        >
          ← Back to Dashboard
        </Link>
      </div>
      <button
        onClick={handleClose}
        style={{
          position: "absolute",
          top: "15px",
          right: "15px",
          background: "none",
          border: "none",
          fontSize: "28px",
          cursor: "pointer",
          color: "#666",
          padding: "0",
          width: "30px",
          height: "30px",
        }}
        title="Close"
      >
        ✕
      </button>
      <h3 style={{ marginTop: "5px" }}>Submit Complaint</h3>
      <form onSubmit={handle}>
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            Complaint Title
          </label>
          <input
            id="title"
            className="form-control"
            type="text"
            placeholder="Brief title of your complaint"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            className="form-control"
            placeholder="Provide detailed description of your complaint"
            rows="5"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
        </div>
        <button className="btn btn-primary w-100">Submit Complaint</button>
      </form>
    </div>
  );
}
