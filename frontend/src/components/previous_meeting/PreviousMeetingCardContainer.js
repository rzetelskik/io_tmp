import React from "react";
import { connect } from "react-redux";
import PreviousMeetingCard from "./PreviousMeetingCard";

export function PreviousMeetingCardContainer(props) {
  return (
    <PreviousMeetingCard
      show={props.show}
      onHide={props.onHide}
      previousMatchesList={props.previousMatchesList}
    />
  );
}

const mapStateToProps = (state) => ({
  previousMatchesList: state.getIn(["matcher", "previousMatches"]),
});

export default connect(mapStateToProps)(PreviousMeetingCardContainer);
