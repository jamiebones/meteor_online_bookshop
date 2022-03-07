import React, { useState, useEffect } from "react";

import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { Switch, Route, Redirect } from "react-router-dom";

import { Accounts } from "meteor/accounts-base";

import BookShop from "./BookShop.jsx";
import SignUp from "./SignUp.jsx";
import Login from "./Login.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Dashboard from "./Dashboard.jsx";
import Authorized from "./Authorized.jsx";
import NotAuthorized from "./NotAuthorized.jsx";
import AdminDashboard from "./AdminDashboard.jsx";
import Navbar from "./Navbar.js";
import "./app.css";

export const App = () => {
  const [user, setUser] = useState(null);
  const { userId, roles, loggingIn, authenticated } = useTracker(() => {
    const userId = Meteor.userId();
    const roles = Meteor.roleAssignment
      .find({ "user._id": Meteor.userId() })
      .fetch();
    const authenticated = !!userId;
    const loggingIn = Meteor.loggingIn();
    return { userId, roles, authenticated, loggingIn };
  }, [user]);

  const handleLoginFunction = () => {
    setUser(Meteor.user());
  };

  const handleLogoutFunction = () => {
    setUser(Meteor.user());
  };

  useEffect(() => {
    Accounts.onLogin(() => {
      handleLoginFunction();
    });
    Accounts.onLogout(() => {
      handleLogoutFunction();
    });

    const url = window.location.pathname;
    let verificationToken = url.split("/")[2];
    if (verificationToken) {
      Accounts.verifyEmail(verificationToken, (err) => {
        if (err) {
          alert(err.reason);
        } else {
          alert("email verified");
        }
      });
    }
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <Navbar authenticated={authenticated} />
          <Switch>
            <Route path="/" exact component={BookShop} />
            <Route path="/sign-up" exact component={SignUp} />
            <Route path="/not_authorized" exact component={NotAuthorized} />

            <Route path="/admin" exact component={AdminDashboard} />

            <Route
              path="/login"
              exact
              render={(props) => {
                if (!authenticated) {
                  return (
                    <Login
                      {...props}
                      exact
                      loggingIn={loggingIn}
                      user={user}
                      userId={userId}
                      roles={roles}
                      authenticated={authenticated}
                    />
                  );
                } else {
                  return <Redirect to="/" />;
                }
              }}
            />

            <ProtectedRoute
              authenticated={authenticated}
              user={user}
              userId={userId}
              loggingIn={loggingIn}
              roles={roles}
              path="/dashboard"
              exact
              component={Dashboard}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
};
