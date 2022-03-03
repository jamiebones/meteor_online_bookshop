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
    <div className="row">
      <div className="col-md-6 offset-3">
        {error && (
          <p style={{ color: "red", fontSize: 15 + "px", textAlign: "center" }}>
            {error}
          </p>
        )}
        <h1 className="text-info">SignUp</h1>
       <form onSubmit={signUpNewUser}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            value={username}
            placeholder="username"
            name="username"
            onChange={handleInputChange}
            className="form-control"
            id="username"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email <span className="text-danger">*</span>
          </label>
          <input
            value={email}
            type="email"
            placeholder="email"
            name="email"
            onChange={handleInputChange}
            id="email"
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password <span className="text-danger">*</span>
          </label>
          <input
            type="password"
            placeholder="password"
            value={password}
            name="password"
            onChange={handleInputChange}
            id="password"
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone number
          </label>
          <input
            value={phone}
            type="text"
            placeholder="phone number"
            name="phone"
            onChange={handleInputChange}
            id="phone"
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <textarea
            value={address}
            type="text"
            placeholder="address"
            name="address"
            onChange={handleInputChange}
            id="phone"
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-success">
          Sign up
        </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
