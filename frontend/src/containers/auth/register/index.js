import React from "react";
import { connect } from "react-redux";
import { register } from "../../../thunks/auth";
import { createMessage } from "../../meeting/actions";
import Register from "./components/index";
import { selectIsAuthenticated } from "../../../reducer";

const RegisterContainer = (props) => {
  return (
    <Register
      isAuthenticated={props.isAuthenticated}
      register={props.register}
      createMessage={props.createMessage}
    />
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: selectIsAuthenticated(state),
});

export default connect(mapStateToProps, { register, createMessage })(
  RegisterContainer
);
