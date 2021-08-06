import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from "react-redux";
import { useEffect, useLayoutEffect, useState } from "react";
import { useHistory } from "react-router-dom";


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Join from "./pages/Join.js";
import SetUsername from "./pages/SetUsername.js";
import Room from "./pages/Room";

export default function App(props) {

  let history = useHistory();
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/set/username">
            <SetUsername />
          </Route>
          <Route exact path="/room/:roomID">
            <Room />
          </Route>
          <Route exact path="/join">
            <Join />
          </Route>
          <Route exact path="/">
            <Redirect to="/set/username" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
