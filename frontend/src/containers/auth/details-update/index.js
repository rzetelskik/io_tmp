import React from "react";
import { connect } from "react-redux";
import { updateDetails } from "../../../thunks/auth";
import { createMessage } from "../../meeting/actions";
import DetailsUpdate from "./components";
import { selectUser } from "../../../reducer";

const DetailsUpdateContainer = (props) => {
  return (
    <DetailsUpdate
      first_name={props.first_name}
      last_name={props.last_name}
      location_range={props.location_range}
      updateDetails={props.updateDetails}
      createMessage={props.createMessage}
    />
  );
};

const mapStateToProps = (state) => ({
  first_name: selectUser(state).get("first_name"),
  last_name: selectUser(state).get("last_name"),
  location_range: selectUser(state).get("location_range").toString(),
});

export default connect(mapStateToProps, { updateDetails, createMessage })(
  DetailsUpdateContainer
);
