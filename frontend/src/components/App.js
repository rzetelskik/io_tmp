import React, { Component, Fragment } from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import Dashboard from "./user/Dashboard";
import Header from "./layout/Header";
import LoginForm from "./user/LoginForm";
import RegisterForm from "./user/RegisterForm";
import Alerts from "./layout/Alerts";
import PrivateRoute from "./common/PrivateRoute";

import { Provider } from "react-redux";
import store from "../store";
import { loadUser } from "../actions/auth";

// Alert options
const alertOptions = {
  timeout: 3000,
  position: "top center"
};

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <Fragment>
              <Header />
              <Alerts />
              <div className="container">
                <Switch>
                  <PrivateRoute exact path="/" component={Dashboard} />
                  <Route exact path="/register" component={RegisterForm} />
                  <Route exact path="/login" component={LoginForm} />
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
