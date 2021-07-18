import React from "react";
import Sketch from "react-p5";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { ThemeProvider } from "@material-ui/styles";
import { useState, useEffect } from "react";
import { Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";

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
}));

export default function Canvas(props) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [time, setTime] = useState(0);
  const [started, setStarted] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((time) => (time >= 100 ? 100 : time + 1));
    }, 300);

    return () => {
      clearInterval(timer);
    };
  }, [started]);

  function Timer() {
    return (
      <Grid
        container
        item
        direction="row"
        justifyContent="flex-end"
        className={classes.startButton}
      >
        {started === false ? (
          <Tooltip title="Add" aria-label="add">
            <Fab color="secondary">
              <AddIcon
                onClick={() => {
                  setStarted(true);
                  setTime(0);
                }}
              />
            </Fab>
          </Tooltip>
        ) : (
          <Box position="relative" display="inline-flex">
            <CircularProgress
              variant="determinate"
              value={time}
              color="secondary"
            />
            <Box
              top={0}
              left={0}
              bottom={0}
              right={0}
              position="absolute"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="caption" component="div">
                {Math.round(time / (100 / 30))}
              </Typography>
            </Box>
          </Box>
        )}
      </Grid>
    );
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <SubmissionModal
        submitted={submitted}
        error={error}
        setSubmitted={setSubmitted}
      />
      <NavBar
        handleSubmit={() => {
          p5Canvas.handleSubmit(setSubmitted, setError);
        }}
        handleReset={p5Canvas.handleReset}
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
        {props.timed === true ? <Timer /> : <></>}
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
