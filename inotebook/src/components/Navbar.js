import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  let navigate = useNavigate(); //using navigator to navigate the user to login page if he logs out incase
  const handleLogout = () => {
    localStorage.removeItem("token"); //here we need to remove the token from localStorage in order to prevent user from seeing notes without the token
    navigate("/login");
  };
  let location = useLocation(); // useLocation hook is used when a location pathname is changes then the it should highlight this location
  return (
    <nav className="navbar navbar-expand-lg bg-dark ">
      <div className="container-fluid">
        <Link className="navbar-brand text-white" to="/">
          InoteBook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item ">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "text-success" : "text-white"
                } `}
                to="/"
              >
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "text-success" : "text-white"
                } `}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>
          {
            !localStorage.getItem("token") ? ( // if user is not logged in then show him logina nd sign up buttons else logout buttons
              <form className="d-flex" role="search">
                <Link
                  className="btn btn-primary mx-1"
                  to="/login"
                  role="button"
                >
                  Login
                </Link>
                <Link
                  className="btn btn-primary mx-1"
                  to="/signup"
                  role="button"
                >
                  Signup
                </Link>
              </form>
            ) : (
              <Link onClick={handleLogout} className="btn btn-primary mx-1">
                Logout
              </Link>
            ) //if the user is already logged in then show him logout button
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
