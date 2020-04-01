import React from "react";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import PrivateRoute from "../common/PrivateRoute";
import EditForm from "../auth/ChangePasswordForm";
import Matcher from "../matcher/Matcher";

export default function MainPanel() {
  let match = useRouteMatch();
  return (
    <div>
      <Switch>
        <PrivateRoute
          path={`${match.path}change_password`}
          component={EditForm}
        />
        <PrivateRoute path={`${match.path}matcher`} component={Matcher} />
        <Route path={match.path}>
          <div className="border-top my-5"></div>
          <div className="container ">
            <div className="row">
              <div className="col-lg">
                <div className="jumbotron card">
                  <div className="card-header">
                    <h1>Match!</h1>
                  </div>
                  <div className="card-body">
                    <h4 className="card-title">
                      Match with people you share interests with
                    </h4>
                    <p className="card-text">
                      Click on the button and start looking for people around
                      you! Maybe one of them is your plan for today?
                    </p>
                    <Link to="/matcher" className="btn btn-primary btn-lg">
                      <i className="fas fa-clone left"></i> Find people nearby!
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg">
                <div className="jumbotron card">
                  <div className="card-header">
                    <h1>Need to update?</h1>
                  </div>
                  <div className="card-body">
                    <h4 className="card-title">
                      Change your name, email or password
                    </h4>
                    <Link
                      to="/update-details"
                      className="btn btn-secondary btn-lg"
                    >
                      <i className="fas fa-clone left"></i> Edit profile!
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Route>
      </Switch>
    </div>
  );
}
