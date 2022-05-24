import React, { useState, useEffect } from "react";

import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { Switch, Route, Redirect } from "react-router-dom";

import { Accounts } from "meteor/accounts-base";

import BookShop from "./BookShop.jsx";
import SignUp from "./SignUp.jsx";
import Login from "./Login.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Dashboard from "./Dashboard.jsx";
import Authorized from "./Authorized.jsx";
import NotAuthorized from "./NotAuthorized.jsx";
import AdminDashboard from "./AdminDashboard.jsx";
import Navbar from "./Navbar.js";
import ShoppingCart from "./ShoppingCart.jsx";
import MakePayment from "./MakePayment.js";
import InitPayment from "./InitPayment.jsx";
import CheckPaymentStatus from "./CheckPaymentStatus";
import { ShoppingProvider } from "../context/ShoppingContext.jsx";
import { StripeProvider, useStripeContext } from "../context/StripeContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(Meteor.settings.public.stripe_publishable);
import "./app.css";

export const App = () => {
  const { auth, setAuth } = useAuth();

  const { user, roles } = useTracker(() => {
    const userId = Meteor.userId();
    const roles = Meteor.roleAssignment.find({ "user._id": userId }).fetch();
    const user = Meteor.user();
    return { user, roles };
  });

  useEffect(() => {
    if (user) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  });

  useEffect(() => {
    const url = window.location.pathname;
    let verificationToken = url.split("/")[2];
    if (verificationToken) {
      Accounts.verifyEmail(verificationToken, (err) => {
        if (err) {
          alert(err.reason);
        } else {
          alert("email verified");
        }
      });
    }
  }, []);

  const { clientSecret } = useStripeContext();
  let clientSecretFromStorage;
  if (!clientSecret) {
    //get it from the localstorage
    clientSecretFromStorage = localStorage.getItem("client_secret");
  }

  const options = {
    clientSecret: clientSecret ? clientSecret : clientSecretFromStorage,
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <ShoppingProvider>
            <Navbar authenticated={auth} roles={roles} />
            <Switch>
              <Route path="/" exact>
                <BookShop />
              </Route>

              <Route path="/make_payment" exact>
                <Elements stripe={stripePromise} options={options}>
                  <MakePayment user={user} authenticated={auth} />
                </Elements>
              </Route>

              <Route path="/complete" exact>
                <Elements stripe={stripePromise} options={options}>
                  <CheckPaymentStatus />
                </Elements>
              </Route>

              <Route path="/display_cart">
                <ShoppingCart />
              </Route>

              <Route path="/init_payment">
                <InitPayment user={user} authenticated={auth} />
              </Route>

              <Route path="/sign-up" exact>
                <SignUp />
              </Route>

              <Route path="/not_authorized" exact>
                <NotAuthorized />
              </Route>

              <Route path="/login" exact>
                <Login
                  user={user}
                  roles={roles}
                  authenticated={auth}
                />
              </Route>

              <ProtectedRoute path="/dashboard" authenticated={auth}>
                <Dashboard
                  authenticated={auth}
                  roles={roles}
                  user={user}
                />
              </ProtectedRoute>

              <Authorized
                exact
                path="/admin"
                authenticated={auth}
                roles={roles}
              >
                <AdminDashboard
                  authenticated={auth}
                  user={user}
                  roles={roles}
                />
              </Authorized>
            </Switch>
          </ShoppingProvider>
        </div>
      </div>
    </div>
  );
};
