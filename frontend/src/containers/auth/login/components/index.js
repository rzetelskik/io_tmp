import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";

export default class Login extends Component {
  state = {
    username: "",
    password: "",
  };

  static propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  onChange = (e) =>
    this.setState({
      [e.target.name]: e.target.value,
    });

  onSubmit = (e) => {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password);
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect data-test="redirect" to="/" />;
    }
    const { username, password } = this.state;

    return (
      <div className="card card-body mt-4 mb-4" data-test="login-form">
        <h2>Login</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <input
              placeholder="Username"
              type="text"
              className="form-control"
              name="username"
              id="username"
              onChange={this.onChange}
              value={username}
            />
          </div>

          <div className="form-group">
            <input
              placeholder="Password"
              type="password"
              className="form-control"
              name="password"
              id="password"
              onChange={this.onChange}
              value={password}
            />
          </div>

          <button type="submit" className="btn btn-outline-primary">
            Login!
          </button>
          <p>
            Don't have an account?
            <Link to="/register" className="text-secondary">
              {" "}
              Register
            </Link>
          </p>
        </form>
      </div>
    );
  }
}
