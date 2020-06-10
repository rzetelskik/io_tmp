import React from "react";
import { connect } from "react-redux";
import LoginForm from "./LoginForm";
import { login } from "../../actions/thunks/auth";

function LoginFormContainer(props) {
  return (
    <LoginForm login={props.login} isAuthenticated={props.isAuthenticated} />
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.getIn(["auth", "isAuthenticated"]),
});

export default connect(mapStateToProps, { login })(LoginFormContainer);
