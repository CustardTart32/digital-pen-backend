import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Link } from "react-router-dom";
import { useTheme } from "@material-ui/core";
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
  homeButton: {
    textDecoration: "none",
    color: "inherit",
  },
}));

export default function NavBarTimed(props) {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          <Link to="/" className={classes.homeButton}>
            Survey
          </Link>
        </Typography>
        <Typography> {props.user} </Typography>
        <Button color="inherit" onClick={props.handleReset}>
          Reset
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
