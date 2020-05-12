import React, { Fragment } from "react";

function MessageList(props) {
  const messageList = props.messageList;
  const myFirstname = props.myFirstname;
  const myUsername = props.myUsername;
  const theirFirstname = props.theirFirstname;
  return (
    <Fragment>
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
    </Fragment>
  );
}

export default MessageList;
