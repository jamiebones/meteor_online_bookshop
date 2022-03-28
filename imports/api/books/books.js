import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";
import { Meteor } from "meteor/meteor"

const BooksCollection = new Mongo.Collection("books");

BooksCollection.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

BooksCollection.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});



const BooksSchema = new SimpleSchema({
  title: {
    type: String,
    label: "The title of the book",
  },

  description: {
    type: String,
    label: "A brief description about the book",
  },
  authors: {
    type: Array,
    label: "Array of book authors",
  },

  "authors.$": Object,

  "authors.$.authorId": {
    type: String,
    label: "Id of the author",
  },

  "authors.$.name": {
    type: String,
    label: "The name of the author",
  },

  coverImage: {
    type: String,
    label: "url for the book",
    optional: true,
  },

  bookurl: {
    type: String,
    label: "url for the book",
    optional: true,
  },

  price: {
    type: Number,
    label: "The price of the book",
  },
});

BooksCollection.attachSchema(BooksSchema);
export default BooksCollection;
