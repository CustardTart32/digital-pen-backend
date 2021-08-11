import React, { useEffect } from "react";
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

  useEffect(() => {
    const unsubscribe = fire.auth().onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid);
      } else {
        setUid(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/canvas/intro">
          {uid == null ? <Redirect to="/" /> : <CanvasIntro />}
        </Route>
        <Route path="/mark">
          <Mark />
        </Route>
        <Route path="/canvas/practice">
          {uid === null ? <Redirect to="/" /> : <CanvasPractice uid={uid} />}
        </Route>
        <Route path="/canvas/test">
          {uid === null ? <Redirect to="/" /> : <CanvasTimed uid={uid} />}
        </Route>
        <Route path="/consent">
          {uid === null ? <ConsentForm /> : <Redirect to="/canvas/intro" />}
        </Route>
        <Route path="/" exact>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}
