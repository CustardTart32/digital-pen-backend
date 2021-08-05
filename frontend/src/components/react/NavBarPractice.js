import React from "react";
import { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "@material-ui/core/Link";

import { makeStyles } from "@material-ui/core/styles";

import fire from "../../config/firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: theme.palette.text.primary,
  },
}));

export default function NavBarPractice(props) {
  const classes = useStyles();
  const [uid, setUid] = useState(null);

  fire.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      setUid(user.uid);
    } else {
      // User is signed out
      setUid(null);
    }
  });

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          <Link href="/" style={{ color: "inherit" }}>
            Digital Pen
          </Link>
        </Typography>
        <Typography>{uid}</Typography>
        <Button
          color="inherit"
          onClick={() => {
            props.setTutOpen(true);
          }}
        >
          Instructions
        </Button>
        <Button color="inherit" href="/canvas/practice">
          Reset
        </Button>
        <Button color="inherit" href="/canvas/test">
          Continue
        </Button>
      </Toolbar>
    </AppBar>
  );
}
