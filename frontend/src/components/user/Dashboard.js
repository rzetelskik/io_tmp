import React, { Component } from "react";
import { connect } from "react-redux";

export class Dashboard extends Component {
  render() {
    return (
      <div className="container">
        <h1>Jeśli to widzisz, jesteś zalogowany</h1>
        <p>Twój token: {this.props.token}</p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.token
});

export default connect(mapStateToProps)(Dashboard);
