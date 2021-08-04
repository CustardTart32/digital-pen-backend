import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "@material-ui/core/Link";

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

export default function NavBarPractice() {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          <Link href="/" style={{ color: "inherit" }}>
            Digital Pen
          </Link>
        </Typography>
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
