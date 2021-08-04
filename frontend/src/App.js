import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CanvasPractice from "./containers/CanvasPractice";
import CanvasTimed from "./containers/CanvasTimed";
import Home from "./containers/Home";
import Mark from "./containers/Mark";
import CanvasIntro from "./containers/CanvasIntro";
import ConsentForm from "./containers/ConsentForm";

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
          <CanvasPractice />
        </Route>
        <Route path="/canvas/test">
          <CanvasTimed />
        </Route>
        <Route path="/mark">
          <Mark />
        </Route>
        <Route path="/consent">
          <ConsentForm />
        </Route>
        <Route path="/" exact>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}
