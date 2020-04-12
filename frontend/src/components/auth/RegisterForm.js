import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../actions/auth";
import { Link, Redirect } from "react-router-dom";
import { createMessage, MESSAGE_ERROR } from "../../actions/messages";

export class RegisterForm extends Component {
  state = {
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    password_repeat: "",
    agree: "",
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    register: PropTypes.func.isRequired,
  };

  onChange = (e) =>
    this.setState({
      [e.target.name]: e.target.value,
    });

  onSubmit = (e) => {
    e.preventDefault();
    const {
      username,
      email,
      first_name,
      last_name,
      password,
      password_repeat,
    } = this.state;
    if (password !== password_repeat) {
      this.props.createMessage(MESSAGE_ERROR, "Passwords do not match");
      return;
    }
    const user = {
      username,
      email,
      first_name,
      last_name,
      password,
      password_repeat,
    };
    this.props.register(user);
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }

    const {
      username,
      email,
      first_name,
      last_name,
      password,
      password_repeat,
      agree,
    } = this.state;

    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Register</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <input
              placeholder="First Name"
              type="text"
              className="form-control"
              name="first_name"
              id="first_name"
              onChange={this.onChange}
              value={first_name}
            />
          </div>
          <div className="form-group">
            <input
              placeholder="Last Name"
              type="text"
              className="form-control"
              name="last_name"
              id="last_name"
              onChange={this.onChange}
              value={last_name}
            />
          </div>
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
              placeholder="Email"
              type="email"
              className="form-control"
              name="email"
              id="email"
              aria-describedby="emailHelp"
              onChange={this.onChange}
              value={email}
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
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
          <div className="form-group">
            <input
              placeholder="Repeat password"
              type="password"
              className="form-control"
              name="password_repeat"
              id="password_repeat"
              onChange={this.onChange}
              value={password_repeat}
            />
          </div>
          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              name="agree"
              id="agree"
              onChange={this.onChange}
              value={agree}
            />
            <label className="form-check-label" htmlFor="agree">
              I agree with Terms etc.
            </label>
          </div>
          <button type="submit" className="btn btn-outline-primary">
            Register!
          </button>
          <p>
            Already have an account?
            <Link to="/login" className="text-secondary">
              {" "}
              Login
            </Link>
          </p>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.getIn(["auth", "isAuthenticated"]),
});

export default connect(mapStateToProps, { register, createMessage })(
  RegisterForm
);
