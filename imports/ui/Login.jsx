import React, { useState, useEffect } from "react";
import { Meteor } from "meteor/meteor";
import { useHistory } from "react-router-dom";
import { isAdmin } from "../utilities/utility";
import { useAuth } from "../context/AuthContext"

const Login = ({ authenticated, roles }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { auth, setAuth } = useAuth();
  
  let history = useHistory();

  useEffect(() => {
    if (auth) {
      if (isAdmin(roles)) {
        history.push("/admin");
      } else {
        history.push("/dashboard");
      }
    }
  }, [auth]);

  const loginUser = async (e) => {
    e.preventDefault();
    const div = document.getElementById("message");
    Meteor.loginWithPassword(
      username ? username : email.trim(),
      password,
      (err) => {
        if (err) {
          div.innerHTML = err.reason;
          setAuth(false);
        } else {
          div.innerHTML = "Login successful";
          setAuth(true);
        }
      }
    );
  };

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-md-6 offset-3">
          <div>
            <h1>Login</h1>
            <div id="message"></div>
            <form onSubmit={loginUser}>
              <div className="mb-3">
                <label className="form-label">
                  Username <span className="text-danger">*</span>
                </label>
                <input
                  value={username}
                  type="text"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Email <span className="text-danger">*</span>
                </label>
                <input
                  value={email}
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Password <span className="text-danger">*</span>
                </label>
                <input
                  value={password}
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                />
              </div>

              <button type="submit" className="btn btn-success">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
