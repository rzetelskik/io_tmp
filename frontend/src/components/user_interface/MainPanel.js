import React, { Component, Fragment } from "react";
import { EditForm } from "../auth/EditForm";
import { HashRouter as Router, Switch } from "react-router-dom";
import PrivateRoute from "../common/PrivateRoute";

export class MainPanel extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <div>
            <h2>You are now logged in!</h2>
          </div>
          <div className="container">
            <Switch>
              <PrivateRoute
                exact
                path="/panel/change_password"
                component={EditForm}
              />
            </Switch>
          </div>
        </Fragment>
      </Router>
    );
  }
}

export default MainPanel;
