import React from "react";
import { connect } from "react-redux";
import { previousMatches } from "../../../thunks/matcher";
import PreviousMatches from "./components";
import { selectPreviousMatches } from "../../../reducer";

const PreviousMatchesContainer = (props) => {
  return (
    <PreviousMatches
      previousMatchesList={props.previousMatchesList}
      previousMatches={props.previousMatches}
    />
  );
};

const mapStateToProps = (state) => ({
  previousMatchesList: selectPreviousMatches(state),
});

export default connect(mapStateToProps, { previousMatches })(
  PreviousMatchesContainer
);
