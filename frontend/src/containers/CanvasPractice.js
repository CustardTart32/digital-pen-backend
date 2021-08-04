import React from "react";
import Sketch from "react-p5";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { ThemeProvider } from "@material-ui/styles";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";

import NavBar from "../components/react/NavBar";
import SubmissionModal from "../components/react/SubmissionModal";
import * as p5Canvas from "../components/p5.js/p5canvas";
import { darkTheme } from "../components/react/darkTheme";

const useStyles = makeStyles((theme) => ({
  fab: {
    margin: theme.spacing(2),
  },
  // TODO: Hardcoded in
  container: {
    color: darkTheme.palette.text.primary,
    height: window.innerHeight / 3 - 64,
  },
  startButton: {
    width: "100%",
    paddingRight: "2%",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function CanvasPractice() {
  const [submissionStatus, setSubmissionStatus] = useState("none");
  const [error, setError] = useState("");

  const classes = useStyles();

  return (
    <ThemeProvider theme={darkTheme}>
      <Backdrop
        className={classes.backdrop}
        open={submissionStatus === "submitting"}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <SubmissionModal
        submissionStatus={submissionStatus}
        error={error}
        setSubmissionStatus={setSubmissionStatus}
      />
      <NavBar
        handleSubmit={() => {
          p5Canvas.handleSubmit(setSubmissionStatus, setError);
        }}
        handleReset={p5Canvas.handleReset}
        timed={false}
      />
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="space-around"
        className={classes.container}
      >
        <Grid item>
          <Typography>
            And he had a feeling - thanks to the girl that things would get
            worse before they got better.
          </Typography>
        </Grid>
      </Grid>
      <div id="canvas">
        <Sketch
          setup={p5Canvas.setup_drawing}
          draw={p5Canvas.draw_drawing}
          windowResized={p5Canvas.resize_drawing}
          className="p5_instance_01"
        />
        <Sketch
          setup={p5Canvas.setup_ui}
          draw={p5Canvas.draw_ui}
          className="p5_instance_02"
        />
      </div>
    </ThemeProvider>
  );
}
