import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Tab, Tabs } from "react-bootstrap";
import ChatCard from "./ChatCard";
import About from "./About";

export class CurrentMeeting extends Component {
  render() {
    return (
      <Fragment>
        <div className="card text-white bg-white" data-test="meeting">
          <Tabs defaultActiveKey="about">
            <Tab eventKey="about" title="About your match">
              <About {...this.props} />
            </Tab>
            <Tab eventKey="profile" title="Chat">
              <ChatCard firstName={this.props.firstName} />
            </Tab>
          </Tabs>
        </div>
      </Fragment>
    );
  }
}

export default connect()(CurrentMeeting);
