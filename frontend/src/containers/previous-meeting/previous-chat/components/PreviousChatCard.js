import React, { Fragment } from "react";
import PreviousChatContainer from "../index";

const PreviousChatCard = props => {
  const {firstName, matchId} = this.props;

  return (
      <Fragment>
        <ul className="list-group list-group-flush">
          <li className="list-group-item text-white bg-secondary">
            <h3 className="">{firstName}</h3>
          </li>

          <PreviousChatContainer matchId={matchId} firstName={firstName}/>
        </ul>
      </Fragment>
  );
};

export default PreviousChatCard;
