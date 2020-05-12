import React, { Component } from "react";

function MessageList(props) {
  useEffect(() => {
    console.log(props.chatMessages.toString());
  });

  let color;
  if (owner === "them") {
    color = "info";
  } else {
    color = "dark";
  }
  return;
  <div></div>;
}

const mapStateToProps = (state) => ({
  chatMessages: state.get("chat"),
});

export default connect(mapStateToProps)(MessageList);
