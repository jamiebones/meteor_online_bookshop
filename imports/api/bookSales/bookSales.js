import { Mongo } from "meteor/mongo";
import { SimpleSchema } from "simpl-schema";

export const BookSalesCollection = new Mongo.Collection("booksales");
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
  buyer: {
    name: String,
    email: String,
    phone: {
      type: String,
      required: false,
    },
  },
  dateofPurchase: Date,
  orderId: String,
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
  purchaseCompleted: {
    type: Boolean,
    defaultValue: false,
  }
  
});

BookSalesCollection.attachSchema(BookSalesSchema);

export default BookSalesCollection;
