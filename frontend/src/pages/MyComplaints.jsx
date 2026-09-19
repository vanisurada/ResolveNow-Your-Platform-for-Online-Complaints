import React, { useEffect, useState } from "react";
import API from "../api";
import { Link, useNavigate } from "react-router-dom";

export default function MyComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Check if user is logged in
    if (!token) {
      setError("Please login to view your complaints");
      setLoading(false);
      return;
    }

    // Fetch complaints if logged in
    API.get("/api/complaints")
      .then((res) => {
        const complaintsData = res.data.complaints || [];
        setComplaints(complaintsData);
        setError(""); // Clear any previous errors
        setLoading(false);
      })
      .catch((err) => {
        // Only show error if it's not a "no data" scenario
        if (err.response?.status === 401) {
          setError("Please login to view your complaints");
        } else if (err.response?.status === 404) {
          setComplaints([]); // No complaints found, this is not an error
          setError("");
        } else {
          setError(err.response?.data?.msg || "Error fetching complaints");
        }
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="card p-4 text-center">
        <p>Loading your complaints...</p>
      </div>
    );
  }

  // Show error message if user is not logged in or there's a real error
  if (error && error.includes("login")) {
    return (
      <div className="card p-4 text-center">
        <h4 className="text-danger">⚠️ {error}</h4>
        <p className="text-muted">
          Please log in to view and manage your complaints.
        </p>
        <Link to="/login" className="btn btn-primary mt-3">
          Go to Login
        </Link>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card p-4 text-center">
        <h4 className="text-danger">⚠️ Error</h4>
        <p className="text-muted">{error}</p>
        <button
          className="btn btn-primary mt-3"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  // Show message if no complaints
  if (complaints.length === 0) {
    return (
      <div className="card p-4 text-center">
        <h4>📋 You have no complaints on your account</h4>
        <p className="text-muted">
          This is your first complaint! Start by submitting one.
        </p>
        <Link to="/submit" className="btn btn-primary mt-3">
          Submit Your First Complaint
        </Link>
      </div>
    );
  }

  // Show complaints if they exist
  return (
    <div className="container mt-4">
      {/* Back Navigation */}
      <div style={{ marginBottom: "20px" }}>
        <Link
          to="/dashboard"
          style={{
            fontSize: "20px",
            textDecoration: "none",
            color: "#667eea",
          }}
          title="Go back to dashboard"
        >
          ← Back to Dashboard
        </Link>
      </div>
      <h3 className="mb-4">📝 My Complaints ({complaints.length})</h3>
      {complaints.map((c) => (
        <div key={c._id} className="card p-3 mb-3">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h5>
                {c.title}{" "}
                <span className="badge bg-info text-dark ms-2">
                  {c.status || "Pending"}
                </span>
              </h5>
              <p className="text-muted">{c.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
