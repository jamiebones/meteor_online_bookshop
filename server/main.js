import "../imports/startup/server";

import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";
import { Roles } from "meteor/alanning:roles";
import AuthorsCollection from "../imports/api/authors/authors";

Meteor.startup(() => {
  // code to run on server at startup
  const users = [
    {
      name: "Normal User",
      username: "jamieOne",
      password: "password",
      roles: ["user", "shopper"],
    },
    {
      name: "Admin User",
      username: "jamieTwo",
      password: "password",
      roles: ["admin", "owner"],
    },
  ];

  const authors = [
    {
      firstname: "forest",
      surname: "Whitstone",
      contactNumber: [99898998686868, 99898998686868],
      contactAddress: "The bellview avenue",
      emailAddress: "forest@abc.com",
    },
    {
      firstname: "samson",
      surname: "Jones",
      contactNumber: [8474747478, 35363636336],
      contactAddress: "East west avenue bridge",
      emailAddress: "samson@oscar.com",
    },
    {
      firstname: "franka",
      surname: "Bell",
      contactNumber: [2345653435, 656337333],
      contactAddress: "The dome center Bolly junction estate",
      emailAddress: "samson@oscar.com",
    },
  ];

  if ( AuthorsCollection.find().count() === 0 ) {
    authors.forEach( (author) => {
      AuthorsCollection.insert(author);
    });
  }



  users.forEach((user) => {
    //check if the user exists
    let id;
    if (!Accounts.findUserByUsername(user.username)) {
      id = Accounts.createUser({
        username: user.username,
        password: user.password,
      });
      if (Meteor.roleAssignment.find({ "user._id": id }).count() === 0) {
        user.roles.forEach(function (role) {
          Roles.createRole(role, { unlessExists: true });
        });
        Roles.addUsersToRoles(id, user.roles);
      }
    }
  });
});
