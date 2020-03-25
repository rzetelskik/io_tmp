import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

export class Header extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav mr-auto">
        <span className="navbar-text mr-3">
          <strong>{user ? `Welcome ${user.username}` : ""}</strong>
        </span>
        <tr>
          <th scope="col">
            <li className="nav-item active">
              <Link to="/panel/change_password" className="btn btn-dark btn-sm">
                change_password
              </Link>
            </li>
          </th>
        </tr>
        <li className="nav-item active">
          <button onClick={this.props.logout} className="btn btn-light">
            Logout
          </button>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav mr-auto">
        <tr>
          <th scope="col">
            <li className="nav-item active">
              <Link to="/register" className="btn btn-light">
                Register
              </Link>
            </li>
          </th>
          <th scope="col">
            <li className="nav-item active">
              <Link to="/login" className="btn btn-dark btn-sm">
                Login
              </Link>
            </li>
          </th>
        </tr>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
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

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Header);
