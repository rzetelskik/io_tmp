import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PreviousChat from "./PreviousChat";

export class PreviousChatCard extends Component {
  render() {
    const { firstName, matchId } = this.props;

    return (
      <Fragment>
        <ul className="list-group list-group-flush">
          <li className="list-group-item text-white bg-secondary">
            <h3 className="">{firstName}</h3>
          </li>

          <PreviousChat matchId={matchId} firstName={firstName} />
        </ul>
      </Fragment>
    );
  }
}

export default connect()(PreviousChatCard);
