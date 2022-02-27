import React, { useState } from "react";
import { Meteor } from "meteor/meteor";

const Login = ({ authenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const loginUser = (e) => {
    e.preventDefault();
    Meteor.loginWithPassword(
      email.trim(),
      password,
      (err) => {
        if (err) {
          alert(err.reason);
        } else {
          alert("Login successful");
          setPassword("");
          setUsername("");
        }
      }
    );
  };

  const logoutUser = () => {
    Meteor.logout(() => {
      console.log("i was logged out");
    });
  };
  return (
    <React.Fragment>
      <div className="login-div">
        {!authenticated && (
          <div>
            <h1>Login</h1>

            <div className="div-input">
              <span>Username </span>
              <input
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="div-input">
              <span>Email </span>
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="div-input">
              <span>Password</span>{" "}
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button onClick={loginUser}>Login</button>
          </div>
        )}
        {authenticated ? <button onClick={logoutUser}>Logout</button> : null}
      </div>
    </React.Fragment>
  );
};

export default Login;
