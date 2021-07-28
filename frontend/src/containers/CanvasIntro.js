import React from "react";
import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { darkTheme } from "../components/react/darkTheme";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import exampleBadSentence from "../assets/example_bad_sentence.png";
import exampleBadWord from "../assets/example_bad_word.png";
import exampleGood from "../assets/example_good.png";

export default function CanvasIntro() {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      height: "100vh",
      color: darkTheme.palette.text.primary,
    },
    good: {
      color: darkTheme.palette.success.main,
      marginRight: "2%",
    },
    bad: {
      color: darkTheme.palette.error.main,
      marginRight: "2%",
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
        <h1> Instructions </h1>
      </Grid>
      <Grid item className={classes.dotPoint}>
        <ul>
          <li>
            {" "}
            This app collects digital handwriting from a digital stylus. Please
            ensure that you are using a digital stylus on a touch enabled device
            such as an iPad.
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
      <Grid container item direction="column" alignItems="center" spacing={2}>
        <Grid container item alignItems="center" justifyContent="center">
          <CheckCircleIcon className={classes.good} />
          <img src={exampleGood} alt="" />
        </Grid>
        <Grid container item alignItems="center" justifyContent="center">
          <CancelIcon className={classes.bad} />
          <img src={exampleBadSentence} alt="" />
        </Grid>
        <Grid container item alignItems="center" justifyContent="center">
          <CancelIcon className={classes.bad} />
          <img src={exampleBadWord} alt="" />
        </Grid>
      </Grid>
      <Grid item className={classes.dotPoint}>
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
        <Button variant="contained" color="primary" href="/canvas/practice">
          Start Writing
        </Button>
      </Grid>
    </Grid>
  );
}
