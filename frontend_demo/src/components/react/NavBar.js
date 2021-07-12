// TODO: Serious Refactoring needed
import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

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
  },
}));

export default function NavBar(props) {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Digital Pen
        </Typography>
        <Button color="inherit">Instructions</Button>
        <Button
          color="inherit"
          onClick={() => {
            props.handleReset();
          }}
        >
          {" "}
          Reset{" "}
        </Button>
        <Button
          color="inherit"
          onClick={() => {
            props.handleSubmit();
          }}
        >
          Submit
        </Button>
      </Toolbar>
    </AppBar>
  );
}
