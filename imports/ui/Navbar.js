import React from "react";
import { Link } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import { isAdmin } from "../utilities/utility";

const Navbar = ({ authenticated, roles }) => {
  const logoutUser = () => {
    Meteor.logout(() => {});
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Online Book Store
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/sign-up" className="nav-link">
                Sign Up
              </Link>
            </li>
            {authenticated ? (
              <React.Fragment>
                {isAdmin(roles) ? (
                  <li className="nav-item">
                    <Link to="/admin" className="nav-link">
                      Admin Dashboard
                    </Link>
                  </li>
                ) : (
                  <li className="nav-item">
                    <Link to="/dashboard" className="nav-link">
                      Dashboard
                    </Link>
                  </li>
                )}

                <li className="nav-item" onClick={logoutUser}>
                  <Link to="#" className="nav-link">
                    Log out
                  </Link>
                </li>
              </React.Fragment>
            ) : (
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
