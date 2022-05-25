import { Meteor } from "meteor/meteor";
import BookSalesCollection from "./bookSales";

Meteor.methods({
  "bookSales.groupSales": function () {
    let query = { paymentStatus: "success" };
    let group = {
      _id: {
        email: "$buyer.email",
      },
      total: { $sum: "$totalSum" },
    };
    const pipeline = [
      {
        $match: query,
      },
      {
        $group: group,
      },

      {
        $sort: { _id: -1 },
      },
    ];

    return BookSalesCollection.aggregate(pipeline);
  },
  "bookSales.highestSelling": function () {
    const pipeline = [
      {
        $match: { paymentStatus: "success" },
      },
      { $unwind: "$booksBought" },

      {
        $group: {
          _id: "$booksBought.title",
          total: {
            $sum: {
              $multiply: ["$booksBought.quantity", "$booksBought.price"],
            },
          },
        },
      },
      {
        $sort: { "_id.total": -1 },
      },
    ];

    return BookSalesCollection.aggregate(pipeline);
  },
});
