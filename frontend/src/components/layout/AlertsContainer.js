import React from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import Alerts from "./Alerts";

export function AlertsContainer(props) {
  return <Alerts errors={props.errors} message={props.message} />;
}

const mapStateToProps = (state) => ({
  errors: state.get("errors"),
  message: state.get("message"),
});

export default connect(mapStateToProps)(withAlert()(Alerts));
