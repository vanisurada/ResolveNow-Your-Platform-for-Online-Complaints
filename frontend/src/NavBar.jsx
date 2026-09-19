import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => !!localStorage.getItem("token"),
  );
  const navigate = useNavigate();

  const updateLoginState = () => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  };

  useEffect(() => {
    window.addEventListener("storage", updateLoginState);
    window.addEventListener("userLoggedIn", updateLoginState);
    window.addEventListener("userLoggedOut", updateLoginState);

    return () => {
      window.removeEventListener("storage", updateLoginState);
      window.removeEventListener("userLoggedIn", updateLoginState);
      window.removeEventListener("userLoggedOut", updateLoginState);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("userLoggedOut"));
    navigate("/");
  };

  const publicLinks = [
    { to: "/", label: "🏠 Home" },
    { to: "/register", label: "📝 Register" },
    { to: "/login", label: "🔑 Login" },
  ];

  const privateLinks = [
    { to: "/dashboard", label: "📊 Dashboard" },
    { to: "/submit", label: "⚠️ Submit Complaint" },
    { to: "/my-complaints", label: "📋 My Complaints" },
  ];

  const links = isLoggedIn ? privateLinks : publicLinks;

  return (
    <nav className="navbar navbar-expand-lg nav-head sticky-top">
      <div className="container-fluid px-3 px-lg-4">
        <Link to="/" className="navbar-brand fs-3 fw-bold text-white me-4">
          <span className="brand-mark">🚀</span>
          <span>Resolve Now</span>
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll align-items-lg-center">
            {links.map((item) => (
              <li className="nav-item" key={item.to}>
                <Link to={item.to} className="nav-link">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="d-flex align-items-center mt-3 mt-lg-0">
            {isLoggedIn && (
              <button className="nav-logout-btn" onClick={handleLogout}>
                🚪 Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
