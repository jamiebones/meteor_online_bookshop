import React, { useState } from "react";
import { Meteor } from "meteor/meteor";

const AddAuthor = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneArray, setPhoneArray] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    switch (name) {
      case "authorName":
        setName(value);
        break;

      case "authorEmail":
        setEmail(value);
        break;

      case "authorAddress":
        setAddress(value);
        break;

      case "authorNumber":
        setPhoneNumber(+value);
        break;
    }
  };

  const addPhoneToArray = () => {
    setPhoneArray([...phoneArray, "0" + phoneNumber]);
    setPhoneNumber("");
  };

  const removePhoneFromArray = (index) => {
    const newArray = phoneArray.filter((phone, i) => i !== index);
    setPhoneArray(newArray);
  };

  const submitAuthorDetails = (e) => {
    e.preventDefault();
    if (!name || !email || !address || phoneArray.length == 0) {
      alert("Please fill all the details");
    }
    const firstname = name.split(" ")[0];
    const surname = name.split(" ")[1];
    let author = {
      firstname,
      surname,
      emailAddress: email,
      contactNumber: phoneArray,
      contactAddress: address,
    };
    Meteor.call("author.addAuthor", author, (err, data) => {
      if (!err) {
        alert(`Author details with id: ${data} added successfully`);
        setName("");
        setEmail("");
        setAddress("");
        setPhoneNumber("");
        setPhoneArray([]);
      } else {
        alert(err.reason);
      }
    });
  };

  return (
    <div>
      <h2>Add Author</h2>
      <form onSubmit={submitAuthorDetails}>
        <div className="mb-3">
          <label className="form-label">Author name</label>
          <input
            type="text"
            className="form-control"
            name="authorName"
            onChange={handleInputChange}
            value={name}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="authorEmail"
            onChange={handleInputChange}
            value={email}
          />
        </div>

        <label className="form-label">Phone</label>
        <div className="input-group mb-3">
          <input
            type="number"
            className="form-control"
            name="authorNumber"
            onChange={handleInputChange}
            value={phoneNumber}
          />
          <span className="input-group-text" onClick={addPhoneToArray}>
            +
          </span>
        </div>

        <div className="mb-3">
          {phoneArray.length > 0 &&
            phoneArray.map((phone, index) => {
              return (
                <span
                  className="phone-span"
                  onClick={() => removePhoneFromArray(index)}
                  key={index}
                >
                  {phone} <span className="remove">&#10060;</span>
                </span>
              );
            })}
        </div>

        <div className="mb-3">
          <label className="form-label">Contact address</label>
          <textarea
            rows="3"
            type="text"
            className="form-control"
            name="authorAddress"
            onChange={handleInputChange}
            value={address}
          />
        </div>

        <div className="mb-3 text-center">
          <button type="submit" className="btn btn-success">
            Save author data
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAuthor;
