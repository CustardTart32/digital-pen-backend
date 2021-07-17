// TODO: Serious Refactoring needed
import React from "react";
import Sketch from "react-p5";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { useState } from "react";

import NavBar from "../components/react/NavBar";
import SubmissionModal from "../components/react/SubmissionModal";
import * as p5Canvas from "../components/p5.js/p5canvas";

export default function Canvas() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const darkTheme = createTheme({
    palette: {
      type: "dark",
    },
  });

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
        justifyContent="center"
        style={{
          paddingTop: "2%",
          paddingBottom: "2%",
          color: darkTheme.palette.text.primary,
        }}
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
