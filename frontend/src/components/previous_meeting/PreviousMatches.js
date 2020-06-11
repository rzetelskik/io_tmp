import React, { useState, useEffect } from "react";
import PreviousMatchesList from "./PreviousMatchesList";

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
      {showMatches ? (
        <PreviousMatchesList list={props.previousMatchesList} />
      ) : (
        "LOADING"
      )}
    </div>
  );
}

export default PreviousMatches;
