import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

import ProgressBar from "./ProgressBar";

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
  homeButton: {
    textDecoration: "none",
    color: "inherit",
  },
}));

export default function NavBarMark(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" className={classes.homeButton}>
              Survey
            </Link>
          </Typography>
          <ProgressBar progress={props.progress} />
        </Toolbar>
      </AppBar>
    </div>
  );
}
