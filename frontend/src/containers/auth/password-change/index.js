import React from "react";
import { connect } from "react-redux";
import { changePassword } from "../../../thunks/auth";
import { createMessage } from "../../meeting/actions";
import PasswordChange from "./components";

const PasswordChangeContainer = (props) => {
  return (
      <PasswordChange
          changePassword={props.changePassword}
          createMessage={props.createMessage}
          username={props.username}
      />
  );
};

const mapStateToProps = (state) => ({
  username: state.getIn(["auth", "user", "username"]),
});

export default connect(mapStateToProps, { changePassword, createMessage })(
    PasswordChangeContainer
);
