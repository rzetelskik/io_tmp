import React from "react";
import { connect } from "react-redux";
import PreviousMeetingCard from "./components";
import { selectPreviousMatches } from "../../../reducer";

const PreviousMeetingCardContainer = (props) => {
  return (
    <PreviousMeetingCard
      show={props.show}
      onHide={props.onHide}
      previousMatchesList={props.previousMatchesList}
    />
  );
};

const mapStateToProps = (state) => ({
  previousMatchesList: selectPreviousMatches(state),
});

export default connect(mapStateToProps)(PreviousMeetingCardContainer);
