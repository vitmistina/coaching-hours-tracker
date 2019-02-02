import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import EditMeeting from "./EditMeeting";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/meeting/:id" component={EditMeeting} />
    </Switch>
  </BrowserRouter>
);

export default Router;
