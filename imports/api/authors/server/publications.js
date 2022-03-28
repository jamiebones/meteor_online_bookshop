import { Meteor } from "meteor/meteor";
import { check, Match } from "meteor/check";
import AuthorsCollection from "../authors";

Meteor.publish("authors.findAuthor", function findAuthorByName(search) {
  check(search, Match.OneOf(String, null, undefined));
  let regex = new RegExp(search, "i");
  return AuthorsCollection.find({ firstname: regex });
});
