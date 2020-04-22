import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (auth.get("isLoading")) {
        return <h2>Loading...</h2>;
      } else if (!auth.get("isAuthenticated")) {
        return <Redirect to="/login" />;
      } else {
        return <Component {...props} />;
      }
    }}
  />
);

const mapStateProps = (state) => ({
  auth: state.get("auth"),
});

export default connect(mapStateProps)(PrivateRoute);
