import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.sass";

import StationList from "./components/Content/StationList";
import StationDetails from "./components/Content/StationDetails";
import Header from "./components/Header/Header";
import Main from "./components/Content/Main";
import Login from "./components/Login/Login";
import NotFound from "./components/NotFound";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
    };
  }

  render() {
    return (
      <div className="site-wrapper">
        <Router>
          <Header />
          <div className="section main">
            <Switch>
              <Route exact path="/" component={Main} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/stations" component={StationList} />
              <Route exact path="/stations/:id" component={StationDetails} />
              <Route path="" component={NotFound} />
            </Switch>
          </div>
        </Router>
        <div className="section footer"></div>
      </div>
    );
  }
}

export default App;
