import React from "react";
import { Link } from "react-router-dom";

function Home() {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-box">
          <p className="hero-tag">Complaint Support Platform</p>
          <h1 className="hero-title">Resolve Now</h1>
          <p className="hero-subtitle">
            File issues, track progress, and stay updated until they are solved.
          </p>

          {!isLoggedIn ? (
            <div className="hero-buttons">
              <Link to="/register" className="btn btn-primary btn-lg">
                📝 Register
              </Link>
              <Link to="/login" className="btn btn-outline-light btn-lg">
                🔑 Login
              </Link>
            </div>
          ) : (
            <div className="hero-buttons">
              <Link to="/submit" className="btn btn-primary btn-lg">
                ⚠️ Submit Complaint
              </Link>
              <Link
                to="/my-complaints"
                className="btn btn-outline-light btn-lg"
              >
                📋 My Complaints
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="features-section">
        <h2 className="features-title">Why people use Resolve Now</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Fast Filing</h3>
            <p>Submit complaints quickly with a simple and clear process.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Track Status</h3>
            <p>
              See where your complaint stands from submission to resolution.
            </p>
          </div>
        </div>
      </section>

      <footer className="home-footer">
        <p>© 2026 Resolve Now • Better complaints, faster solutions.</p>
      </footer>
    </div>
  );
}

export default Home;
