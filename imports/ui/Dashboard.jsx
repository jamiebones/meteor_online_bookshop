import React from "react";

const Dashboard = ({ user, authenticated, ...rest }) => {
  return (
    <div>
      <h1>Dashboard</h1>
      Welcome , {user && user.username.toUpperCase()}
    </div>
  );
};

export default Dashboard;
