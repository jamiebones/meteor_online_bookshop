import React from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
import { App } from "/imports/ui/App.jsx";

import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from "react-router-dom";
import { StripeProvider } from "../imports/context/StripeContext.jsx";
import { AuthProvider } from "../imports/context/AuthContext";

Meteor.startup(() => {
  render(
    <AuthProvider>
      <StripeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StripeProvider>
    </AuthProvider>,

    document.getElementById("react-target")
  );
});
