import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Canvas from "./containers/Canvas";
import Home from "./containers/Home";
import Mark from "./containers/Mark";
import CanvasIntro from "./containers/CanvasIntro";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/canvas/intro">
          <CanvasIntro />
        </Route>
        {/* <Route path = "intro/mark">
          <MarkIntro/>
        </Route> */}
        <Route path="/canvas/practice">
          <Canvas timed={false} />
        </Route>
        <Route path="/canvas/test">
          <Canvas timed={true} />
        </Route>
        <Route path="/mark">
          <Mark />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}
