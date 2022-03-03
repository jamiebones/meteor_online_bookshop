import React from "react";
import { Meteor } from "meteor/meteor";

const Dashboard = ({ user, authenticated, ...rest  }) => {
  const logoutUser = () => {
    Meteor.logout(() => {
      console.log("i was logged out");
    });
  };
  return (
    <div>
      <h1>Dashboard</h1>
      Welcome , {user && user.username.toUpperCase()}

      {authenticated ? (
            <button onClick={logoutUser} className="btn btn-danger">
              Logout
            </button>
          ) : null}
    </div>
  );
};

export default Dashboard;
