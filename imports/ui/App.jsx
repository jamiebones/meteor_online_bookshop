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
import { ShoppingProvider } from "../context/ShoppingContext.jsx";
import { StripeProvider, useStripeContext } from "../context/StripeContext.jsx";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(Meteor.settings.public.stripe_publishable);
import "./app.css";

export const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  const { user, roles } = useTracker(() => {
    const userId = Meteor.userId();
    const roles = Meteor.roleAssignment.find({ "user._id": userId }).fetch();
    const user = Meteor.user();
    return { user, roles };
  });

  useEffect(() => {
    if (user) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
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
            <Navbar authenticated={authenticated} roles={roles} />
            <Switch>
              <Route path="/" exact>
                <BookShop />
              </Route>

              <Route path="/make_payment" exact>
                <Elements stripe={stripePromise} options={options}>
                  <MakePayment user={user} authenticated={authenticated} />
                </Elements>
              </Route>

              <Route path="/display_cart">
                <ShoppingCart />
              </Route>

              <Route path="/init_payment">
                <InitPayment user={user} authenticated={authenticated}/>
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
                  authenticated={authenticated}
                />
              </Route>

              <ProtectedRoute path="/dashboard" authenticated={authenticated}>
                <Dashboard
                  authenticated={authenticated}
                  roles={roles}
                  user={user}
                />
              </ProtectedRoute>

              <Authorized
                exact
                path="/admin"
                authenticated={authenticated}
                roles={roles}
              >
                <AdminDashboard
                  authenticated={authenticated}
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
