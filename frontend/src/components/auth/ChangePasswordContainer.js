import React from "react";
import { connect } from "react-redux";
import { changePassword } from "../../actions/thunks/auth";
import { createMessage } from "../../actions/action-creators/messages";
import ChangePasswordForm from "./ChangePasswordForm";

function ChangePasswordContainer(props) {
  return (
    <ChangePasswordForm
      changePassword={props.changePassword}
      createMessage={props.createMessage}
      username={props.username}
    />
  );
}

const mapStateToProps = (state) => ({
  username: state.getIn(["auth", "user", "username"]),
});

export default connect(mapStateToProps, { changePassword, createMessage })(
  ChangePasswordContainer
);
