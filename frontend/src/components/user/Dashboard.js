import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Dashboard extends Component {
  static propTypes = {
    username: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired
  };

  state = {
    username: this.props.user.username,
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    password2: "",
    agree: ""
  };

  render() {
    return (
      <div className="container">
        <h1 className="mx-auto">Konfiguracja konta</h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  username: state.auth.user.username,
  user: state.auth.user
});

export default connect(mapStateToProps)(Dashboard);
