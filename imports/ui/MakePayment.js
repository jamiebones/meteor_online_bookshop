import React, { useState } from "react";
import {
    useStripe,
    useElements,
    PaymentElement,
  } from "@stripe/react-stripe-js";
  import { Meteor } from "meteor/meteor"

const MakePayment = () => {
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerName, setCustomerName] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      //Disable the submission until stripe is loaded
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: Meteor.absoluteUrl("/complete"),
      },
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(error.message);
      localStorage.removeItem("client_secret");
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };


  
  return (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <h1>Make Payment</h1>
        <form onSubmit={handleSubmit}>
          <div className="cardElement">
             <PaymentElement/>
          </div>
          <button type="submit" className="btn btn-success" disabled={!stripe}>
            PAY
          </button>
        </form>
      </div>
    </div>
  );
};

export default MakePayment;
