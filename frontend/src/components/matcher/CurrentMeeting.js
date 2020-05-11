import React, { Fragment, useState, useEffect } from "react";
import meeting from "../../data/images/meeting.png";
import { connect } from "react-redux";
import { getChatClientInstance } from "../../services/ChatClient";
import { createMessage, MESSAGE_ERROR } from "../../actions/messages";

function CurrentMeeting(props) {
  const [matchId, setMatchId] = useState(null);
  const [chatSocket, setChatSocket] = useState(null);

  useEffect(() => {
    console.log("elo zamontowane", props.matchId);
    if (props.matchId !== matchId) {
      console.log("new matchid: ", props.matchId);
      setMatchId(props.matchId);
      createChatConnection();
    } else {
      console.log("still the same matchid: ", matchId);
    }
    if (chatSocket && chatSocket.connected() === false) {
      establishChatConnection();
    }
  }, [props.matchId, matchId, chatSocket]);

  const createChatConnection = () => {
    setChatSocket(getChatClientInstance(props.matchId));
  };

  const establishChatConnection = () => {
    if (chatSocket.connect() === false) {
      props.createMessage(
        MESSAGE_ERROR,
        "unable to establish chat connection with server"
      );
    } else {
      chatSocket.waitForSocketConnection(() => {
        console.log("eldo mam chat");

        // chatSocket.addCallback(this);
      });
    }
  };

  const endMeeting = () => {
    const username = props.username;
    props.endMeeting(username);
  };

  const { commonTags, firstName, distance } = props;

  return (
    <Fragment>
      <div className="card w-50 text-white bg-secondary" data-test="meeting">
        <h3 className="card-header text-white bg-secondary">
          Your meeting with {firstName}
        </h3>
        <div className="card-body"></div>
        <img className="card-img-top bg-white" src={meeting} alt="meeting" />
        <div className="card-body"></div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item text-white bg-secondary"></li>
          <li className="list-group-item text-white bg-secondary">
            Distance: {Math.round(distance)} km
          </li>
          <li className="list-group-item text-white bg-secondary">
            Common tags:
            {commonTags.map((tagName, id) => {
              return (
                <Fragment key={id}>
                  {" "}
                  <span className="badge badge-primary">{tagName}</span>{" "}
                </Fragment>
              );
            })}
          </li>
        </ul>
        <div className="list-group-item text-white bg-secondary">
          <button onClick={endMeeting} type="button" className="btn btn-light">
            End meeting
          </button>
        </div>
      </div>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  matchId: state.getIn(["matcher", "currentMatch", "match_id"]),
});

export default connect(mapStateToProps, { createMessage })(CurrentMeeting);
