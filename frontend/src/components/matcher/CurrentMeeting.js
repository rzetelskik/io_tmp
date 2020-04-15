import React, { Component, Fragment } from "react";
import meeting from "../../data/images/meeting.png";
import { connect } from "react-redux";

export class CurrentMeeting extends Component {
  endMeeting = () => {
    const username = this.props.username;
    this.props.end_meeting(username);
  };

  render() {
    const { first_name, distance } = this.props;

    return (
      <Fragment>
        <div className="card w-50 text-white bg-secondary" data-test="meeting">
          <h3 className="card-header text-white bg-secondary">
            Your meeting with {first_name}
          </h3>
          <div className="card-body"></div>
          <img className="card-img-top bg-white" src={meeting} alt="meeting" />
          <div className="card-body"></div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item text-white bg-secondary"></li>
            <li className="list-group-item text-white bg-secondary">
              Distance: {Math.round(distance)} km
            </li>
            <li className="list-group-item text-white bg-secondary">Tags</li>
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
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  first_name: ownProps.first_name,
  distance: ownProps.distance,
  match_timestamp: ownProps.match_timestamp,
  end_meeting: ownProps.end_meeting,
});

export default connect(mapStateToProps)(CurrentMeeting);
