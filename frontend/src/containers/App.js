import React, { Component, Fragment } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import HeaderContainer from "./header";
import LoginFormContainer from "./auth/login";
import RegisterForm from "./auth/register/components";
import Alerts from "../components/layout/Alerts";
import PrivateRoute from "../components/common/PrivateRoute";

import { Provider } from "react-redux";
import store from "../store";
import { loadUser } from "../thunks/auth";
import MainPanelContainer from "./main-panel";
import UpdateDetailsContainer from "./auth/details-update";
import ChangePasswordContainer from "./auth/password-change";

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
              <Alerts />
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
                  <PrivateRoute path="/" component={MainPanelContainer} />
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
