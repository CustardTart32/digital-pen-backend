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
        <h1> Instructions </h1>
      </Grid>
      <Grid item>
        <ul>
          <li>
            {" "}
            This app collects digital handwriting from a digital stylus. Please
            ensure that you are using a digital stylus on a touch enabled device
            such as an IPad.
          </li>
          <li>
            {" "}
            In the following page, you will be presented with a sentence of text
            to copy in your own handwriting.
          </li>
          <li>
            {" "}
            Please copy this text onto the canvas and ensure that your
            handwriting is in a staight line and that any words are not
            truncated.
          </li>
        </ul>
      </Grid>
      <Grid item>
        <ul>
          <li>
            {" "}
            If you make a mistake, tap the reset button on the top right corner
            to clear the canvas.{" "}
          </li>
          <li>
            {" "}
            When done, tap the submit button to upload your handwriting.{" "}
          </li>
        </ul>
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" href="/canvas">
          Start Writing
        </Button>
      </Grid>
    </Grid>
  );
}
