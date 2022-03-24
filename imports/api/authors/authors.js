import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const AuthorsCollection = new Mongo.Collection("authors");

AuthorsCollection.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

AuthorsCollection.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

const AuthorsSchema = new SimpleSchema({
  firstname: {
    type: String,
    label: "first name of the author",
  },

  surname: {
    type: String,
    label: "the surname of the author",
  },

  contactNumber: {
    type: Array,
    label: "Array of author phone number",
  },

  "contactNumber.$": {
    type: String,
    label: "phone number of the author",
  },

  contactAddress: {
    type: String,
    label: "contact addresss of the author",
    optional: true,
  },

  emailAddress: {
    type: String,
    label: "email addresss of the author",
    optional: true,
  },
});

AuthorsCollection.attachSchema(AuthorsSchema);
export default AuthorsCollection;
