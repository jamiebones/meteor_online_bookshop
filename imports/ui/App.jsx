import React, { useState, useEffect } from "react";
import { BookShop } from "./BookShop.jsx";
import { useTracker } from "meteor/react-meteor-data";
import { Roles } from "meteor/alanning:roles";
import { Meteor } from "meteor/meteor";
import Login from "./Login.jsx";
import SignUp from "./SignUp.jsx";
import AuthenticatedComponent from "./Authenticated.jsx";
import { Accounts } from "meteor/accounts-base";

import "./app.css";

export const App = () => {
  const [loggingIn, setLoggin] = useState(false);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [roles, setRoles] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);

  const handleLoginFunction = () => {
    console.log("login function here ran ");
    const loggingIn = Meteor.loggingIn();
    const user = Meteor.user();
    const userId = Meteor.userId();
    const roles = Meteor.roleAssignment
      .find({ "user._id": Meteor.userId() })
      .fetch();
    const authenticated = !!Meteor.userId();
    setLoggin(loggingIn);
    setUser(user);
    setUserId(userId);
    setRoles(roles);
    setAuthenticated(authenticated);
  };

  const handleLogoutFunction = () => {
    console.log("logout ran here");
    setLoggin(false);
    setUser(null);
    setUserId(null);
    setRoles([]);
    setAuthenticated(false);
  };

  useEffect(() => {
    Accounts.onLogin(() => {
      handleLoginFunction();
    });
    Accounts.onLogout(() => {
      handleLogoutFunction();
    });
  }, []);

  return (
    <div>
      <BookShop />
      <div className="login-container">
        <div className="login">
          <SignUp />
          <Login authenticated={authenticated} />
        </div>
        <div className="auth-section">
          <AuthenticatedComponent roles={roles} user={user} />
        </div>
      </div>
    </div>
  );
};
