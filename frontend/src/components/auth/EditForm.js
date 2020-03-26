import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { changePassword } from "../../actions/auth";
import { createMessage } from "../../actions/messages";

export class EditForm extends Component {
  state = {
    password1: "",
    password2: "",
    password3: ""
  };

  componentDidMount() {
    console.log(this.props);
  }

  static propTypes = {
    username: PropTypes.string.isRequired,
    changePassword: PropTypes.func.isRequired
  };

  onChange = e =>
    this.setState({
      [e.target.name]: e.target.value
    });

  onSubmit = e => {
    e.preventDefault();
    const { password1, password2, password3 } = this.state;
    if (password2 !== password3) {
      this.props.createMessage({ passwordNotMatch: "Passwords do not match" });
      return;
    }
    this.props.changePassword(password1, password2, password3);
  };

  render() {
    const { password1, password2, password3 } = this.state;
    return (
      <div className="card card-body mt-4 mb-4">
        <h2 className="mx-auto">Change Password</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              name="password1"
              id="password1"
              onChange={this.onChange}
              value={password1}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">New password</label>
            <input
              type="password"
              className="form-control"
              name="password2"
              id="password2"
              onChange={this.onChange}
              value={password2}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Repeat new password</label>
            <input
              type="password"
              className="form-control"
              name="password3"
              id="password3"
              onChange={this.onChange}
              value={password3}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Change
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  username: state.auth.user.username
});

export default connect(mapStateToProps, { changePassword, createMessage })(
  EditForm
);
