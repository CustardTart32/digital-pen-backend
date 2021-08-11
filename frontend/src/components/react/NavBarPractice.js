import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
// import Link from "@material-ui/core/Link";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

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
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            Practice Assessment
          </Link>
        </Typography>
        <Typography>{props.uid}</Typography>
        <Button
          color="inherit"
          onClick={() => {
            props.setTutOpen(true);
          }}
        >
          Instructions
        </Button>
        <Link
          to={"/canvas/practice"}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Button color="inherit">Reset</Button>
        </Link>
        <Link
          to={"/canvas/test"}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Button color="inherit">Continue</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
}
