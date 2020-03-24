import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addUser } from "../../actions/users";
import { Link } from "react-router-dom";

export class RegisterForm extends Component {
  state = {
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    password2: "",
    agree: ""
  };

  static propTypes = {
    addUser: PropTypes.func.isRequired
  };

  onChange = e =>
    this.setState({
      [e.target.name]: e.target.value
    });

  onSubmit = e => {
    e.preventDefault();
    const {
      username,
      email,
      first_name,
      last_name,
      password,
      password2
    } = this.state;
    const user = {
      username,
      email,
      first_name,
      last_name,
      password,
      password2
    };
    this.props.addUser(user);
  };

  render() {
    const {
      username,
      email,
      first_name,
      last_name,
      password,
      password2,
      agree
    } = this.state;

    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Register</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              className="form-control"
              name="first_name"
              id="first_name"
              onChange={this.onChange}
              value={first_name}
            />
          </div>
          <div className="form-group">
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              className="form-control"
              name="last_name"
              id="last_name"
              onChange={this.onChange}
              value={last_name}
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">User Name</label>
            <input
              type="text"
              className="form-control"
              name="username"
              id="username"
              onChange={this.onChange}
              value={username}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
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
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              id="password"
              onChange={this.onChange}
              value={password}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Repeat The Password</label>
            <input
              type="password"
              className="form-control"
              name="password2"
              id="password2"
              onChange={this.onChange}
              value={password2}
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
          <button type="submit" className="btn btn-primary">
            Register!
          </button>
          <p>
            Already have an account?<Link to="/login"> Login</Link>
          </p>
        </form>
      </div>
    );
  }
}

export default connect(null, { addUser })(RegisterForm);
