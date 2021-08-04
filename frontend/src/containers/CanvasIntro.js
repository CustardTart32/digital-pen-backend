import React from "react";
import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { darkTheme } from "../components/react/darkTheme";

export default function CanvasIntro() {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      height: "100vh",
      color: darkTheme.palette.text.primary,
    },
    dotPoint: {
      width: "100%",
    },
  }));

  const classes = useStyles(darkTheme);

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      className={classes.root}
    >
      <Grid item>
        <h1> Information </h1>
      </Grid>
      <Grid item className={classes.dotPoint}>
        <ul>
          <li>
            This app collects digital handwriting from a digital stylus. Please
            ensure that you are using a digital stylus on a touch enabled device
            such as an iPad.
          </li>
          <li>
            This activity will consist of two stages: a practice and timed
            assessment.{" "}
          </li>
          <li>
            On the practice page, you will be required to copy a piece of text
            onto the digital canvas. This task is untimed and unrecorded and is
            a good way for you to get familiar with the test environment.
          </li>
          <li>
            On the test page, you will be asked to repeat the same task in a
            timed environment. Your handwiting will be recorded during this
            stage.
          </li>
        </ul>
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" href="/canvas/practice">
          Next
        </Button>
      </Grid>
    </Grid>
  );
}
