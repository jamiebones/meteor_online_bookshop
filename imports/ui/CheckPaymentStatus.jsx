import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useStripe } from "@stripe/react-stripe-js";

export default CheckPaymentStatus = () => {
  const [message, showMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const stripe = useStripe();

  async function checkStatus() {
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      //redirect back to buy page
      history.push("/");
      return;
    }

      const { paymentIntent } = await stripe.retrievePaymentIntent(
        clientSecret
      );
      setLoading(false);
      console.log("payment intent",paymentIntent);
      let status;
      switch (paymentIntent.status) {
        case "succeeded":
          showMessage("Payment succeeded!");
          status = "success";
          //update the database here
          break;
        case "processing":
          showMessage("Your payment is processing.");
          status = "processing";
          break;
        case "requires_payment_method":
          status = "not successful";
          showMessage("Your payment was not successful, please try again.");
          break;
        default:
          status = "not successful";
          showMessage("Something went wrong.");
          break;
      }
      //delete the client secret from local storage
      //localStorage.removeItem("client_secret");
      Meteor.call("stripe.completePayment", status, clientSecret);
    
  }

  useEffect(() => {
    if (stripe) {
      checkStatus();
    }
  }, [stripe]);

  return (
    <div>
        {loading && <h1>Loading......</h1>}
      <h1>{message}</h1>
    </div>
  );
};
