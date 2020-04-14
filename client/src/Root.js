import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import App from "./App";
import Login from "./components/Login/Login";
import { getSession } from "./auth";
// You can use the getSession function above to determine if the user is logged in or not

const Root = () => (
  <Router>
    <Switch>
      <Route path="/login" exact component={Login} />
      <Route
        path="/"
        render={() =>
          getSession() ? <App /> : <Redirect from="/" to="/login" exact />
        }
      />
    </Switch>
  </Router>
);

export default Root;
