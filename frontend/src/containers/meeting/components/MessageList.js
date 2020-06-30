import React, { Fragment } from "react";

const MessageList = props => {
  const messageList = this.props.messageList;
  const myUsername = this.props.myUsername;
  const theirFirstname = this.props.theirFirstName;

  let box = document.getElementById("scrollBox");
  let list = document.getElementById("messageList");
  if (box && list) {
    box.scroll({top: list.offsetHeight, behavior: "smooth"});
  }
  return (
      <Fragment>
        <div
            className="mh-100 card-body bg-light text-dark "
            id="scrollBox"
            style={{height: "500px", overflow: "auto"}}
        >
          <div id="messageList">
            {messageList.map((message, index) => {
              let classStr =
                  message.author === myUsername
                      ? "alert alert-primary"
                      : "alert alert-dark";
              let id = "singleMessage" + index;
              let author =
                  message.author === myUsername ? "You" : theirFirstname;
              return (
                  <div className={classStr} role="alert" key={id}>
                    <strong>{author}</strong> <br/> {message.content}
                  </div>
              );
            })}
          </div>
        </div>
      </Fragment>
  );
};

export default MessageList;
