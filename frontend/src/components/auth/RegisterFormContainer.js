import React from "react";
import { connect } from "react-redux";
import { register } from "../../actions/thunks/auth";
import { createMessage } from "../../actions/action-creators/messages";
import RegisterForm from "./RegisterForm";

export default function RegisterFormContainer(props) {
  return (
    <RegisterForm
      isAuthenticated={props.isAuthenticated}
      register={props.register}
      createMessage={props.createMessage}
    />
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.getIn(["auth", "isAuthenticated"]),
});

export default connect(mapStateToProps, { register, createMessage })(
  RegisterFormContainer
);
