import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import Fab from "@material-ui/core/Fab";

import NavBarMark from "./NavBarMark";
import { darkTheme } from "../components/react/darkTheme";

export default function Mark() {
  const useStyles = makeStyles((theme) => ({
    root: {
      color: darkTheme.palette.text.primary,
    },
    button: {
      // paddingLeft: "100%",
      // paddingRight: "100%",
    },
  }));

  const classes = useStyles();

  return (
    <ThemeProvider theme={darkTheme}>
      <NavBarMark />
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        className={classes.root}
      >
        <Grid item>
          <h1> Question 1 </h1>
        </Grid>
        <Grid item>
          <h2> Question goes here </h2>
        </Grid>
        <Grid item>
          <Fab color="secondary" variant="extended" className={classes.button}>
            Next
          </Fab>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
