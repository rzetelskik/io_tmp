import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default class Header extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  };

  render() {
    const isAuthenticated = this.props.auth.get("isAuthenticated");
    const user = this.props.auth.get("user");

    const authLinks = (
      <ul className="navbar-nav mr-auto" data-test="authenticated">
        <span className="navbar-text mr-3 btn-space">
          <strong>{user ? `Welcome ${user.get("first_name")}` : ""}</strong>
        </span>

        <li className="nav-item active">
          <Link to="/update-details" className="btn btn-dark btn-space">
            Edit profile
          </Link>
        </li>

        <li className="nav-item active">
          <Link to="/">
            <button
              onClick={this.props.logout}
              className="btn btn-light btn-space"
            >
              Logout
            </button>
          </Link>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav mr-auto" data-test="guest">
        <li className="nav-item active">
          <Link to="/register" className="btn btn-light btn-space">
            Register
          </Link>
        </li>
        <li className="nav-item active">
          <Link to="/login" className="btn btn-dark btn-space">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-primary"
        data-test="header"
      >
        <div className="container">
          <Link to="/" className="navbar-brand">
            <strong>ad hoc</strong>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="my-2 my-lg-0 collapse navbar-collapse"
            id="navbarSupportedContent"
          >
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}
