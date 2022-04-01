import { Meteor } from "meteor/meteor";
import BookCollection from "../books";

Meteor.publish("books.allBooks", function allBooks() {
  //return all books in the collection where the coverImage and bookurl exist and not null
  return BookCollection.find({
    coverImage: { $exists: true, $ne: null },
    bookurl: { $exists: true, $ne: null },
  });
});
