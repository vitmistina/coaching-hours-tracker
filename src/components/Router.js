import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import EditMeeting from "./EditMeeting";
import Tracker from "./Tracker";
import Balancer from "./Balancer";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/meeting/:id" component={EditMeeting} />
      <Route exact path="/tracker" component={Tracker} />
      <Route exact path="/balancer" component={Balancer} />
    </Switch>
  </BrowserRouter>
);

export default Router;
