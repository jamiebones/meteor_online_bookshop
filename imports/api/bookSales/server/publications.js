import { Meteor } from "meteor/meteor";
import BookSales from "../bookSales";


Meteor.publish("bookSales.sales", function allBooksSale() {
  return BookSales.find({ paymentStatus: "success" });
});
