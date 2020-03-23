import React, { Component } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Users from "./Users";

export class Dashboard extends Component {
  render() {
    return (
      <div className="container">
        <LoginForm />
        <RegisterForm />
        <Users />
      </div>
    );
  }
}

export default Dashboard;
