import React, { Fragment } from "react";
import meeting from "../../data/images/meeting.png";
import { connect } from "react-redux";

function CurrentMeeting(props) {
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

export default connect()(CurrentMeeting);
