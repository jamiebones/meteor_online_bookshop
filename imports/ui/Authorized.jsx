import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAdmin } from "../utilities/utility";

const Authorized = ({
  component: Component,
  authenticated,
  roles,
  ...restProps
}) => {
  if (!authenticated) {
    return (
      <Route
        {...restProps}
        render={(props) =>
          authenticated ? <Component {...props} /> : <Redirect to="/login" />
        }
      />
    );
  }
  return (
    <Route
      {...restProps}
      render={(props) =>
        isAdmin(roles) ? (
          <Component
            authenticated={authenticated}
            roles={roles}
            {...props}
            {...restProps}
          />
        ) : (
          <Redirect to="/not_authorized" />
        )
      }
    />
  );
};

export default Authorized;
