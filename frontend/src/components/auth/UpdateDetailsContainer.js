import React from "react";
import { connect } from "react-redux";
import { updateDetails } from "../../actions/thunks/auth";
import { createMessage } from "../../actions/action-creators/messages";
import UpdateDetailsForm from "./UpdateDetailsForm";

export function UpdateDetailsContainer(props) {
  return (
    <UpdateDetailsForm
      first_name={props.first_name}
      last_name={props.last_name}
      location_range={props.location_range}
      updateDetails={props.updateDetails}
      createMessage={props.createMessage}
    />
  );
}

const mapStateToProps = (state) => ({
  first_name: state.getIn(["auth", "user", "first_name"]),
  last_name: state.getIn(["auth", "user", "last_name"]),
  location_range: state.getIn(["auth", "user", "location_range"]).toString(),
});

export default connect(mapStateToProps, { updateDetails, createMessage })(
  UpdateDetailsForm
);
