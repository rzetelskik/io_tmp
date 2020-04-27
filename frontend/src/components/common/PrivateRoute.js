import React, { Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "../layout/Loading";

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (auth.get("isLoading")) {
        return (
          <Fragment>
            <div className="border-top my-5" data-test="loading"></div>
            <Loading />
          </Fragment>
        );
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
