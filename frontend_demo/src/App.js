// TODO: Serious Refactoring needed
import React from "react";
import Sketch from "react-p5";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import NavBar from "./components/react/NavBar";

import * as p5Canvas from "./components/p5.js/p5canvas";

import fire from "./config/firebase";

function App() {
  console.log(fire);

  return (
    <div className="App" style={{ height: "300" }}>
      <NavBar
        handleSubmit={p5Canvas.handleSubmit}
        handleReset={p5Canvas.handleReset}
      />
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ marginTop: "2%", marginBottom: "2%" }}
      >
        <Typography>
          {" "}
          And he had a feeling - thanks to the girl that things would get worse
          before they got better.
        </Typography>
      </Grid>
      <div>
        <Sketch
          setup={p5Canvas.setup_drawing}
          draw={p5Canvas.draw_drawing}
          windowResized={p5Canvas.resize_drawing}
          className="p5_instance_01"
        />
        <Sketch
          setup={p5Canvas.setup_ui}
          draw={p5Canvas.draw_ui}
          // windowResized={resize_ui}
          className="p5_instance_02"
        />
      </div>
    </div>
  );
}

export default App;
