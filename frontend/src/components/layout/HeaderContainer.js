import React from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/thunks/auth";
import Header from "./Header";

export function HeaderContainer(props) {
  return <Header logout={props.logout} auth={props.auth} />;
}

const mapStateToProps = (state) => ({
  auth: state.get("auth"),
});

export default connect(mapStateToProps, { logout })(HeaderContainer);
