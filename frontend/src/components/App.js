import React, { Component, Fragment } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import HeaderContainer from "./layout/HeaderContainer";
import LoginFormContainer from "./auth/LoginFormContainer";
import RegisterForm from "./auth/RegisterForm";
import AlertsContainer from "./layout/AlertsContainer";
import PrivateRoute from "./common/PrivateRoute";

import { Provider } from "react-redux";
import store from "../store";
import { loadUser } from "../actions/thunks/auth";
import MainPanel from "./user_interface/MainPanel";
import UpdateDetailsContainer from "./auth/UpdateDetailsContainer";
import ChangePasswordContainer from "./auth/ChangePasswordContainer";

// Alert options
const alertOptions = {
  timeout: 3000,
  position: "top center",
};

class App extends Component {
  constructor(props) {
    super(props);
    store.dispatch(loadUser());
  }

  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <Fragment>
              <HeaderContainer />
              <AlertsContainer />
              <div className="container" data-test="app">
                <Switch>
                  <Route exact path="/register" component={RegisterForm} />
                  <Route exact path="/login" component={LoginFormContainer} />
                  <PrivateRoute
                    exact
                    path="/update-details"
                    component={UpdateDetailsContainer}
                  />
                  <PrivateRoute
                    exact
                    path="/change-password"
                    component={ChangePasswordContainer}
                  />
                  <PrivateRoute path="/" component={MainPanel} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

export default App;
