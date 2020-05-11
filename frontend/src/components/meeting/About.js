import React, { Component, Fragment } from "react";
import meeting from "../../data/images/meeting.png";
import { connect } from "react-redux";

export class CurrentMeeting extends Component {
  endMeeting = () => {
    const username = this.props.username;
    this.props.endMeeting(username);
  };

  render() {
    const { commonTags, firstName, distance } = this.props;

    return (
      <Fragment>
        <ul className="list-group list-group-flush">
          <li>
            <img
              className="card-img-top bg-white"
              src={meeting}
              alt="meeting"
            />
          </li>
          <li className="list-group-item text-white bg-secondary">
            <h3 className="">{firstName}</h3>
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
          <button
            onClick={this.endMeeting}
            type="button"
            className="btn btn-light"
          >
            End meeting
          </button>
        </div>
      </Fragment>
    );
  }
}

export default connect()(CurrentMeeting);
