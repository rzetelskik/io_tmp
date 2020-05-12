import React, { Fragment, Component } from "react";
import ReactDOM from "react-dom";

class MessageList extends Component {
  render() {
    const messageList = this.props.messageList;
    const myFirstname = this.props.myFirstname;
    const myUsername = this.props.myUsername;
    const theirFirstname = this.props.theirFirstname;

    return (
      <Fragment>
        <div
          className="mh-100 card-body bg-light text-dark "
          id="scrollBox"
          style={{ height: "500px", overflow: "auto" }}
        >
          {messageList.map((message, index) => {
            let classStr =
              message.author === myUsername
                ? "alert alert-primary"
                : "alert alert-dark";
            return (
              <div className={classStr} role="alert">
                <strong>{message.author}</strong> <br /> {message.content}
              </div>
            );
          })}
        </div>
      </Fragment>
    );
  }
}

export default MessageList;
