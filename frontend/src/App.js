import React from "react";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import CanvasPractice from "./containers/CanvasPractice";
import CanvasTimed from "./containers/CanvasTimed";
import Home from "./containers/Home";
import Mark from "./containers/Mark";
import CanvasIntro from "./containers/CanvasIntro";
import ConsentForm from "./containers/ConsentForm";

import fire from "./config/firebase";

export default function App() {
  const [uid, setUid] = useState(null);

  fire.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      setUid(uid);
    } else {
      setUid(null);
    }
  });

  return (
    <Router>
      <Switch>
        <Route path="/canvas/intro">
          {uid === null ? <Redirect to="/" /> : <CanvasIntro />}
        </Route>
        {/* <Route path = "intro/mark">
          <MarkIntro/>
        </Route> */}
        <Route path="/canvas/practice">
          {uid === null ? <Redirect to="/" /> : <CanvasPractice />}
        </Route>
        <Route path="/canvas/test">
          {uid === null ? <Redirect to="/" /> : <CanvasTimed />}
        </Route>
        <Route path="/mark">
          {uid === null ? <Redirect to="/" /> : <Mark />}
        </Route>
        <Route path="/consent">
          {uid === null ? <Redirect to="/" /> : <ConsentForm />}
        </Route>
        <Route path="/" exact>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}
