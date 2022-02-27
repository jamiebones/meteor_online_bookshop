import { Meteor } from "meteor/meteor";
import { Roles } from "meteor/alanning:roles";
import { Accounts } from "meteor/accounts-base";

Meteor.methods({
  "users.createNewUser": function (user) {
    const { username, password, profile, email } = user;
    //check if the user exists
    const userExist = Meteor.users.findOne({
      username: username,
      email: email,
    });
    if (userExist) {
      throw new Meteor.Error("User already exists");
    }
    const id = Accounts.createUser({
      email,
      password,
      username,
      profile,
    });
    Roles.addUsersToRoles(id, ["user", "shopper"]);
    Accounts.sendVerificationEmail(id);
    return id;
  },
});
