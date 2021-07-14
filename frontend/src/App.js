import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Canvas from "./containers/Canvas";
import Home from "./containers/Home";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/canvas">
          <Canvas />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}
