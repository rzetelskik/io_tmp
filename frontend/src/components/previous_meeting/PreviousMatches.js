import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { previousMatches } from "../../actions/matcher";
import PreviousMatchesList from "./PreviousMatchesList";
import Loading from "../layout/Loading";

function PreviousMatches(props) {
  const [matchesLoading, setMatchesLoading] = useState([false, false]);
  useEffect(() => {
    if (!matchesLoading[0]) {
      props.previousMatches();
      setMatchesLoading([true, false]);
    }
    if (!matchesLoading[1] && props.previousMatchesList) {
      setMatchesLoading([true, true]);
    }
  }, [matchesLoading, props]);

  const showMatches = matchesLoading[0] && matchesLoading[1];

  return (
    <div>
      <div className="border-top my-5" data-test="loading"></div>
      {showMatches ? (
        <PreviousMatchesList list={props.previousMatchesList} />
      ) : (
        <Loading />
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  previousMatchesList: state.getIn(["matcher", "previousMatches"]),
});

export default connect(mapStateToProps, { previousMatches })(PreviousMatches);
