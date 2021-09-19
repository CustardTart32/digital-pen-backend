import React, { useCallback } from "react";
import Sketch from "react-p5";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";

import NavBarTimed from "../components/react/NavBarTimed";
import SubmissionModal from "../components/react/SubmissionModal";
import * as p5Canvas from "../components/p5.js/p5canvas_test";
import Timer from "../components/react/Timer";
import TimedInstructionsModal from "../components/react/TimedInstructionsModal";

const useStyles = makeStyles((theme) => ({
  fab: {
    margin: theme.spacing(2),
  },
  // Hardcoded in
  container: {
    color: theme.palette.text.primary,
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

export default function CanvasTimed(props) {
  const [submissionStatus, setSubmissionStatus] = useState("none");
  const [error, setError] = useState("");
  const [time, setTime] = useState(0);
  const [tutOpen, setTutOpen] = useState(true);

  const handleSubmit = useCallback(() => {
    p5Canvas.handleSubmit(props.uid, setSubmissionStatus, setError);
  }, [props.uid]);

  const handleReset = () => {
    setTime(0);
    p5Canvas.handleReset();
  };

  const handleErrorReset = () => {
    setError("");
    setSubmissionStatus("none");
    handleReset();
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((time) => (time >= 100 ? 100 : time + 1));
    }, 300);

    return () => {
      clearInterval(timer);
    };
  }, [tutOpen]);

  // When time == 100, time does not increase change any more so handlesubmit is only invoked once
  useEffect(() => {
    if (time === 100 && tutOpen === false && submissionStatus === "none") {
      handleSubmit();
    }
  }, [time, tutOpen, submissionStatus, handleSubmit]);

  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <>
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
        handleErrorReset={handleErrorReset}
      />
      <TimedInstructionsModal
        open={tutOpen}
        handleClose={() => {
          setTutOpen(false);
          setTime(0);
        }}
      />
      <NavBarTimed
        handleSubmit={handleSubmit}
        handleReset={handleReset}
        user={props.uid}
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
        <Timer tutOpen={tutOpen} time={time} />
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
    </>
  );
}
