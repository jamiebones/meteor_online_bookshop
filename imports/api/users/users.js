import { Mongo } from "meteor/mongo";
import { SimpleSchema } from "simpl-schema";

export const UsersCollection = new Mongo.Collection("users");

UsersCollection.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

UsersCollection.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

const UsersSchema = new SimpleSchema({
  email: String,
  password: String,
  name: String,
  userType: String,
  phoneNumber: {
    type: String,
    required: false,
  },
});

UsersCollection.attachSchema(UsersSchema);

export default UsersCollection;
