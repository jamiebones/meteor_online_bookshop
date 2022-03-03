import React from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
import { App } from "/imports/ui/App.jsx";

import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Switch } from "react-router-dom";

Meteor.startup(() => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,

    document.getElementById("react-target")
  );
});
