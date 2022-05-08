import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { useCart } from "../context/ShoppingContext";
import { useStripeContext } from "../context/StripeContext";
import { useHistory } from "react-router-dom";

const InitPayment = ({ authenticated, user }) => {
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerName, setCustomerName] = useState("");
  const { cart } = useCart();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { setClientSecret } = useStripeContext();

  const sumItems = (cart) => {
    return cart.reduce((acc, item) => acc + item.quantity * item.price, 0);
  };

  const handlePaymentCheckout = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      //build up the object we are going to send to the initpayment

      let buyerDetails = {};
      if (authenticated) {
        buyerDetails.buyer = {
          email: user?.emails[0]?.address || "jamiebones147@gmail.com",
          name: user.username,
        };
      } else {
        if (!customerEmail || !customerName) {
          setErrorMessage("Please enter your email and name");
          setLoading(false);
          return;
        }
        buyerDetails.buyer = {
          email: customerEmail,
          name: customerName,
        };
      }
      //loop through the cart and build up the items array
      let booksBoughtArray = [];
      for (let i = 0; i < cart.length; i++) {
        const { _id, title, quantity, price } = cart[i];
        const bookObject = {
          bookId: _id,
          title: title,
          quantity: quantity,
          price: price,
        };
        booksBoughtArray.push(bookObject);
      }
      buyerDetails.booksBought = booksBoughtArray;
      buyerDetails.totalSum = sumItems(cart);
      buyerDetails.dateOfPurchase = new Date();
      buyerDetails.paymentStatus = "payment initiated";
      let amount = sumItems(cart) + 2;
      const result = await new Promise((resolve, reject) =>
        Meteor.call(
          "stripe.initPayment",
          amount,
          buyerDetails,
          (error, result) => {
            if (error) {
              setErrorMessage(error.message);
              console.log("error", error);
              reject(error);
            }
            resolve(result);
          }
        )
      );
      setLoading(false);
      setClientSecret(result);
      localStorage.setItem("client_secret", result);
      history.push("/make_payment");
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <div className="payment-div">
          <h1>Initiate Stripe Payment</h1>

          <p>{errorMessage}</p>
          <form onSubmit={handlePaymentCheckout}>
            {!authenticated && (
              <React.Fragment>
                <div className="mb-3">
                  <label className="form-label">
                    Customer Name <span className="text-danger">*</span>
                  </label>
                  <input
                    value={customerName}
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Customer Email <span className="text-danger">*</span>
                  </label>
                  <input
                    value={customerEmail}
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="form-control"
                  />
                </div>
              </React.Fragment>
            )}

            <div className="mb-3">
              <label className="form-label">
                Amount:{" "}
                <span style={{ fontSize: "20px", color: "blue" }}>
                  ${sumItems(cart) + 2}
                </span>
              </label>
            </div>

            <div className="mb-3">
              <label className="form-label">Shipping address</label>
              <textarea
                className="form-control"
                placeholder="Shipping address"
                rows={4}
              ></textarea>
            </div>

            {cart.length > 0 && (
              <button type="submit" className="btn btn-danger">
                {!loading ? (
                  "Initiate Stripe payment"
                ) : (
                  <i className="fas fa-spinner"></i>
                )}
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default InitPayment;
