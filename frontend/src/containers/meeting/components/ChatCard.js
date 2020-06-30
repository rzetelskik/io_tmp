import React, { Fragment } from "react";
import { connect } from "react-redux";
import ChatContainer from "../index";

const ChatCard = props => {
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
};

export default connect()(ChatCard);
