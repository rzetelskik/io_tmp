import React, { Component, Fragment } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Users from "./Users";

export class Dashboard extends Component {
  render() {
    return (
      <div className="container">
        <Fragment>
          <LoginForm />
          <RegisterForm />
          <Users />
        </Fragment>
      </div>
    );
  }
}

export default Dashboard;
