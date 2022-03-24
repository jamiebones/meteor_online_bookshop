import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import AuthorCollection from "./authors.js";

Meteor.methods({
  "author.addAuthor": function addNewAuthor(author) {
    check(author, Object);
    return AuthorCollection.insert(author);
  },
});
