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

  function authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUid(user.uid);
        console.log(user.uid);
      } else {
        setUid(null);
        console.log("Test");
      }
    });
  }

  useEffect(() => {
    const unsubscribe = authListener();
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
          {/* {uid === null ? <Redirect to="/" /> : <CanvasPractice />} */}
          {<CanvasPractice uid={uid} />}
        </Route>
        <Route path="/canvas/test">
          {uid !== null ? <CanvasTimed uid={uid} /> : <Redirect to="/" />}
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
