import React from "react";
import { connect } from "react-redux";
import Login from "./components";
import { login } from "../../../thunks/auth";
import { selectIsAuthenticated } from "../../../reducer";

const LoginContainer = (props) => {
  return <Login login={props.login} isAuthenticated={props.isAuthenticated} />;
};

const mapStateToProps = (state) => ({
  isAuthenticated: selectIsAuthenticated(state),
});

export default connect(mapStateToProps, { login })(LoginContainer);
