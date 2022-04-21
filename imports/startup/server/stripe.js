import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import Stripe from "stripe";
import BookSalesCollection from "../../api/bookSales/bookSales";

const stripe = Stripe(Meteor.settings.private.stripe_secret);

Meteor.methods({
  "stripe.initPayment": async (amount, salesDetails) => {
    //create an orderId we can link to this payment
    check(amount, Number);
    check(salesDetails, Object);
    salesDetails.dateOfPurchase = new Date();
    const orderId = BookSalesCollection.insert(salesDetails);
    const paymentIntents = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "usd",
      payment_method_types: ["card"],
      statement_descriptor: "Books purchase",
      metadata: {
        orderId: orderId,
      },
    });

    if (!paymentIntents?.client_secret) {
      throw new Meteor.Error("paymentIntent generation failed");
    }

    BookSalesCollection.update(
      { _id: orderId },
      {
        $set: { paymentIntent: paymentIntents.client_secret },
      }
    );

    return paymentIntents?.client_secret;
  },
  "stripe.completePayment": (status, clientSecret) => {
    //get the sales with the paymentIntent client_secret
    return BookSalesCollection.update(
      { paymentIntent: clientSecret },
      { $set: { paymentStatus: status } }
    );
  },
});
