import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Tab, Tabs } from "react-bootstrap";
import Chat from "./Chat";
import About from "./About";

export class CurrentMeeting extends Component {
  endMeeting = () => {
    const username = this.props.username;
    this.props.endMeeting(username);
  };

  render() {
    const { commonTags, firstName, distance } = this.props;

    return (
      <Fragment>
        <div className="card w-50 text-white bg-secondary" data-test="meeting">
          <Tabs defaultActiveKey="about" id="uncontrolled-tab-example">
            <Tab eventKey="about" title="About me">
              <About {...this.props} />
            </Tab>
            <Tab eventKey="profile" title="Chat">
              <Chat {...this.props} />
            </Tab>
          </Tabs>
        </div>
      </Fragment>
    );
  }
}

export default connect()(CurrentMeeting);
