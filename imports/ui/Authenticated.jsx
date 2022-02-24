import React from "react";

const AuthenticatedComponent = ({ roles, user }) => {
  const { username, profile, email } = user || {};

  return (
    <div>
      <h1>Authenticated</h1>
      <p>Username: {username}</p>
      <p>Email: {email}</p>
      {profile && <p>Contact: {profile.phone}</p>}
      {profile && <p>Profile: {profile.address}</p>}
      <p>Roles: </p>
      {roles &&
        roles.length &&
        roles.map(({ role }) => {
           
          return <p key={role._id}>{role._id}</p>;
        })}
    </div>
  );
};

export default AuthenticatedComponent;
