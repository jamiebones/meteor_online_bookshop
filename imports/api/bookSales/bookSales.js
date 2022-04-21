import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const BookSalesCollection = new Mongo.Collection("booksales");
BookSalesCollection.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

BookSalesCollection.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

const BookSalesSchema = new SimpleSchema({
  buyer: Object,
  "buyer.name": String,
  "buyer.email": String,
  dateOfPurchase: Date,
  booksBought: {
    type: Array,
    label: "Books bought",
  },

  "booksBought.$": Object,
  "booksBought.$.bookId": {
    type: String,
  },

  "booksBought.$.title": {
    type: String,
  },
  "booksBought.$.price": {
    type: Number,
  },
  "booksBought.$.quantity": {
    type: Number,
  },
  totalSum: Number,
  paymentStatus: {
    type: String,
    allowedValues: [
      "success",
      "processing",
      "not successful",
      "payment initiated",
    ],
  },
  paymentIntent: {
    type: String,
    required: false,
  },
});

BookSalesCollection.attachSchema(BookSalesSchema);

export default BookSalesCollection;
