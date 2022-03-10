import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAdmin } from "../utilities/utility";

const Authorized = ({ children, authenticated, roles, ...restProps }) => {
  if (!authenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <Route
      {...restProps}
      render={() =>
        isAdmin(roles) ? children : <Redirect to="not_authorized" />
      }
    />
  );
};

export default Authorized;
