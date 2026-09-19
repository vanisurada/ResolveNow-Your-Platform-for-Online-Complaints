import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

export default function Dashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [complaintStats, setComplaintStats] = useState({
    total: 0,
    pending: 0,
    resolved: 0,
  });
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const complaintsRes = await API.get("/api/complaints");
      const complaints = complaintsRes.data.complaints || [];

      setComplaints(complaints);

      const total = complaints.length;
      const pending = complaints.filter((c) => c.status === "Pending").length;
      const resolved = complaints.filter((c) => c.status === "Resolved").length;

      setComplaintStats({ total, pending, resolved });

      const storedUserData = localStorage.getItem("userData");
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
      }
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="dashboard-loading">
          <h4>Loading Dashboard...</h4>
        </div>
      </div>
    );
  }

  const userName = userData?.name || "User";

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <button className="dashboard-back" onClick={() => navigate("/")}>
          ← Back to Home
        </button>
      </div>

      <section className="dashboard-welcome">
        <h2>Welcome, {userName} 👋</h2>
        <p>Your complaint summary at a glance.</p>
      </section>

      <section className="dashboard-stats">
        <div className="dashboard-card">
          <h3>{complaintStats.total}</h3>
          <p>Total</p>
        </div>
        <div className="dashboard-card">
          <h3>{complaintStats.pending}</h3>
          <p>Pending</p>
        </div>
        <div className="dashboard-card">
          <h3>{complaintStats.resolved}</h3>
          <p>Resolved</p>
        </div>
      </section>

      <section className="dashboard-actions">
        <Link to="/submit" className="btn btn-primary dashboard-btn">
          Submit Complaint
        </Link>
        <Link
          to="/my-complaints"
          className="btn btn-outline-light dashboard-btn"
        >
          My Complaints
        </Link>
      </section>
    </div>
  );
}
