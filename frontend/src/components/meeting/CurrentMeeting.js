import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Tab, Tabs } from "react-bootstrap";
import ChatCard from "./ChatCard";
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
        <div className="card w-50 text-white bg-white" data-test="meeting">
          <Tabs defaultActiveKey="about">
            <Tab eventKey="about" title="About me">
              <About {...this.props} />
            </Tab>
            <Tab eventKey="profile" title="Chat">
              <ChatCard {...this.props} />
            </Tab>
          </Tabs>
        </div>
      </Fragment>
    );
  }
}

export default connect()(CurrentMeeting);
