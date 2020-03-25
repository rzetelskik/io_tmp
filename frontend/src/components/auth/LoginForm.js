import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { login } from "../../actions/auth";

export class LoginForm extends Component {
  state = {
    username: "",
    password: ""
  };

  static propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };

  onChange = e =>
    this.setState({
      [e.target.name]: e.target.value
    });

  onSubmit = e => {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password);
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/panel" />;
    }
    const { username, password } = this.state;

    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Login</h2>
        <form onSubmit={this.onSubmit}>
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

          <button type="submit" className="btn btn-primary">
            Login!
          </button>
          <p>
            Don't have an account?
            <Link to="/register"> Register</Link>
          </p>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(LoginForm);
