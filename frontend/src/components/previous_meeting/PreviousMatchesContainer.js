import React from "react";
import { connect } from "react-redux";
import { previousMatches } from "../../actions/thunks/matcher";
import PreviousMatches from "./PreviousMatches";

export function PreviousMatchesContainer(props) {
  return (
    <PreviousMatches
      previousMatchesList={props.previousMatchesList}
      previousMatches={props.previousMatches}
    />
  );
}

const mapStateToProps = (state) => ({
  previousMatchesList: state.getIn(["matcher", "previousMatches"]),
});

export default connect(mapStateToProps, { previousMatches })(
  PreviousMatchesContainer
);
