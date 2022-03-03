import React from "react";
import { Route, Redirect } from "react-router-dom";

const isAdmin = (roles) => {
  debugger;
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].role._id === "admin") {
      return true;
    }
  }
  return false;
};

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
