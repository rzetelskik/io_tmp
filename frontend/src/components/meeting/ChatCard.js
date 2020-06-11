import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import ChatContainer from "./ChatContainer";

export class ChatCard extends Component {
  render() {
    const { firstName } = this.props;

    return (
      <Fragment>
        <ul className="list-group list-group-flush">
          <li className="list-group-item text-white bg-secondary">
            <h3 className="">{firstName}</h3>
          </li>

          <ChatContainer firstName={this.props.firstName} />
        </ul>
      </Fragment>
    );
  }
}

export default connect()(ChatCard);
