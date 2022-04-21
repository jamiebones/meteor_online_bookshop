import React from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
import { App } from "/imports/ui/App.jsx";

import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from "react-router-dom";
import { StripeProvider } from "../imports/context/StripeContext.jsx";

Meteor.startup(() => {
  render(
    <StripeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StripeProvider>,

    document.getElementById("react-target")
  );
});
