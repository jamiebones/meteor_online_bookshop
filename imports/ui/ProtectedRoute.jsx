import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({
  component: Component,
  authenticated,
  ...restProps
}) => {
  
  return (
    <Route
      render={(props) =>
        authenticated ? (
          <Component authenticated={authenticated} {...props} {...restProps} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;
