import React, { Fragment } from "react";

function MessageList(props) {
  const messageList = props.messageList;
  return (
    <Fragment>
      <ul>
        {messageList.map((message, index) => {
          return <li>{message}</li>;
        })}
      </ul>
    </Fragment>
  );
}

export default MessageList;
