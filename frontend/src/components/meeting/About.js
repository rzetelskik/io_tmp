import React, { useEffect, Fragment } from "react";
import meeting from "../../data/images/meeting.png";
import { connect } from "react-redux";

function About(props) {
  const endMeeting = () => {
    const username = props.username;
    props.endMeeting(username);
  };

  const { commonTags, firstName, distance } = props;

  useEffect(() => {
    console.log(props.chatMessages.toString());
  });

  return (
    <Fragment>
      <ul className="list-group list-group-flush">
        <li className="list-group-item text-white bg-secondary">
          <h3 className="">{firstName}</h3>
        </li>
        <li>
          <img className="card-img-top bg-white" src={meeting} alt="meeting" />
        </li>
        <li className="list-group-item text-white bg-secondary">
          Distance: {Math.round(distance)} km
        </li>
        <li className="list-group-item text-white bg-secondary">
          Common tags:
          {commonTags.map((tagName, id) => {
            return (
              <Fragment>
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
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  chatMessages: state.get("chat"),
});

export default connect(mapStateToProps)(About);
