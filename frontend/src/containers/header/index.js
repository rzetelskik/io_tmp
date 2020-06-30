import React from "react";
import { connect } from "react-redux";
import { logout } from "../../thunks/auth";
import Header from "./components";

const HeaderContainer = (props) => {
  return <Header logout={props.logout} auth={props.auth} />;
};

const mapStateToProps = (state) => ({
  auth: state.get("auth"),
});

export default connect(mapStateToProps, { logout })(HeaderContainer);
