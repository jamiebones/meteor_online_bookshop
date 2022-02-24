import React, { useState } from "react";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    switch (name) {
      case "username":
        setUsername(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "phone":
        setPhone(value);
        break;
      case "address":
        setAddress(value);
        break;
      default:
        break;
    }
  };

  const signUpNewUser = (e) => {
    const user = {
      username: username,
      password: password,
      email: email,
      profile: {
        phone: phone,
        address: address,
      },
    };
    e.preventDefault();
    Meteor.call("users.createNewUser", user, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        alert("account sign up successful");
        setError("");
        setUsername("");
        setPassword("");
        setEmail("");
        setPhone("");
        setAddress("");
      }
    });
  };

  return (
    <div>
      {error && (
        <p style={{ color: "red", fontSize: 15 + "px", textAlign: "center" }}>
          {error}
        </p>
      )}
      <h1>SignUp</h1>

      <div className="div-input">
        <span>username *</span>

        <input
          type="text"
          value={username}
          placeholder="username"
          name="username"
          onChange={handleInputChange}
        />
      </div>

      <div className="div-input">
        <span>email *</span>
        <input
        value={email}
          type="email"
          placeholder="email"
          name="email"
          onChange={handleInputChange}
        />
      </div>

      <div className="div-input">
        <span>password *</span>
        <input
          type="password"
          placeholder="password"
          value={password}
          name="password"
          onChange={handleInputChange}
        />
      </div>

      <div className="div-input">
        <span>phone number </span>
        <input
        value={phone}
          type="text"
          placeholder="phone number"
          name="phone"
          onChange={handleInputChange}
        />
      </div>

      <div className="div-input">
        <span>address </span>
        <input
        value={address}
          type="text"
          placeholder="address"
          name="address"
          onChange={handleInputChange}
        />
      </div>

      <button onClick={signUpNewUser}>Sign up</button>
    </div>
  );
};

export default SignUp;
