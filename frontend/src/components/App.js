import React, { Component, Fragment } from "react";
import Dashboard from "./user/Dashboard";

import { Provider } from "react-redux";
import store from "../store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Fragment>
          <h1>
            Tu był bardzo wulgarny napisa, ale musiałem go zmienić, bo
            wyświetlam wszystko na telewizorze
          </h1>
          <Dashboard />
        </Fragment>
      </Provider>
    );
  }
}

export default App;
