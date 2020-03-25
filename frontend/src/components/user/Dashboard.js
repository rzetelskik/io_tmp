import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Dashboard extends Component {
  static propTypes = {
    username: PropTypes.string.isRequired
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
  username: state.auth.user.username
});

export default connect(mapStateToProps)(Dashboard);
