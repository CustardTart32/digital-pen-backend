// TODO: Serious Refactoring needed
import React from "react";
import Sketch from "react-p5";
import { OneEuroFilter } from "./oneEuroFilter";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

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
  },
}));

var Pressure = require("pressure");

// How sensitive is the brush size to the pressure of the pen?
var pressureMultiplier = 5;

// What is the smallest size for the brush?
var minBrushSize = 1;
var brushDensity = 5;
var showDebug = false;
var minCutoff = 0.0001; // decrease this to get rid of slow speed jitter but increase lag (must be > 0)
var beta = 1.0; // increase this to get rid of high speed lag

/***********************
 *       GLOBALS        *
 ************************/
var xFilter, yFilter, pFilter;
var inBetween;
var prevPenX = 0;
var prevPenY = 0;
var prevBrushSize = 1;
var amt, x, y, s, d;
var pressure = -2;

// References to p5 canvasses
var drawCanvas, uiCanvas;
var isPressureInit = false;
var isDrawing = false;
var isDrawingJustStarted = false;

function App() {
  const ref = React.createRef();

  let initPressure = () => {
    // console.log("Attempting to initialize Pressure.js ");

    Pressure.set("#uiCanvas", {
      start: function (event) {
        // this is called on force start
        isDrawing = true;
        isDrawingJustStarted = true;
      },
      end: function () {
        // this is called on force end
        isDrawing = false;
        pressure = 0;
      },
      change: function (force, event) {
        if (isPressureInit === false) {
          console.log("Pressure.js initialized successfully");
          isPressureInit = true;
        }
        // console.log(force);
        pressure = force;
      },
    });
  };

  let setup_drawing = (p, canvasParentRef) => {
    // Filters used to smooth position and pressure jitter
    xFilter = new OneEuroFilter(60, minCutoff, beta, 1.0);
    yFilter = new OneEuroFilter(60, minCutoff, beta, 1.0);
    pFilter = new OneEuroFilter(60, minCutoff, beta, 1.0);

    // prevent scrolling on iOS Safari
    disableScroll();

    //Initialize the canvas
    drawCanvas = p.createCanvas(
      p.windowWidth,
      p.windowHeight - p.windowHeight / 3
    );

    drawCanvas.id("drawingCanvas");
    drawCanvas.position(0, p.windowHeight / 3);
    drawCanvas.background("#2f4f4f");
  };

  let resize_drawing = (p) => {
    p.resizeCanvas(p.windowWidth, p.windowHeight - p.windowHeight / 3);
    p.background("#2f4f4f");
    drawCanvas.position(0, p.windowHeight / 3);
  };

  let draw_drawing = (p) => {
    // Start Pressure.js if it hasn't started already
    if (isPressureInit === false) {
      initPressure();
    }

    let penX;
    let penY;

    if (isDrawing) {
      // Smooth out the position of the pointer
      penX = xFilter.filter(p.mouseX, p.millis());
      penY = yFilter.filter(p.mouseY, p.millis());

      // What to do on the first frame of the stroke
      if (isDrawingJustStarted) {
        //console.log("started drawing");
        prevPenX = penX;
        prevPenY = penY;
      }

      // Smooth out the pressure
      pressure = pFilter.filter(pressure, p.millis());

      // Define the current brush size based on the pressure
      let brushSize = minBrushSize + pressure * pressureMultiplier;

      // Print out the x,y,p,t details regarding digital ink
      // console.log({'x' : penX, 'y' : penY, 'p': pressure, 't': p.millis()})
      // console.log("X: ", penX)
      // console.log("Y: ", penY)
      // console.log("P: ", pressure)
      console.log("t: ", p.millis());

      // Calculate the distance between previous and current position
      d = p.dist(prevPenX, prevPenY, penX, penY);

      // The bigger the distance the more ellipses
      // will be drawn to fill in the empty space
      inBetween = (d / p.min(brushSize, prevBrushSize)) * brushDensity;

      // Add ellipses to fill in the space
      // between samples of the pen position
      for (let i = 1; i <= inBetween; i++) {
        amt = i / inBetween;
        s = p.lerp(prevBrushSize, brushSize, amt);
        x = p.lerp(prevPenX, penX, amt);
        y = p.lerp(prevPenY, penY, amt);
        p.noStroke();
        p.fill(255);
        p.ellipse(x, y, s);
      }

      // Draw an ellipse at the latest position
      p.noStroke();
      p.fill(255);
      p.ellipse(penX, penY, brushSize);

      // Save the latest brush values for next frame
      prevBrushSize = brushSize;
      prevPenX = penX;
      prevPenY = penY;

      isDrawingJustStarted = false;
    }
  };

  let setup_ui = (p) => {
    uiCanvas = p.createCanvas(
      p.windowWidth,
      p.windowHeight - p.windowHeight / 3
    );
    uiCanvas.id("uiCanvas");
    uiCanvas.position(0, p.windowHeight / 3);
  };

  let resize_ui = (p) => {
    p.resizeCanvas(p.windowWidth, p.windowHeight - p.windowHeight / 3);
    p.background("#2f4f4f");
    uiCanvas.position(0, p.windowHeight / 3);
  };

  let draw_ui = (p) => {
    uiCanvas.clear();

    if (showDebug) {
      p.text("pressure = " + pressure, 10, 20);

      p.stroke(200, 50);
      p.line(p.mouseX, 0, p.mouseX, p.height);
      p.line(0, p.mouseY, p.width, p.mouseY);

      p.noStroke();
      p.fill(255);
      var w = p.width * pressure;
      p.rect(0, 0, w, 4);
    }
  };

  function preventDefault(e) {
    e.preventDefault();
  }

  function disableScroll() {
    document.body.addEventListener("touchmove", preventDefault, {
      passive: false,
    });
  }

  const classes = useStyles();

  return (
    <div className="App" style={{ height: "300" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Digital Pen
          </Typography>
          <Button color="inherit">Instructions</Button>
          <Button
            color="inherit"
            onClick={() => {
              drawCanvas.background("#2f4f4f");
            }}
          >
            {" "}
            Reset{" "}
          </Button>
          <Button color="inherit">Submit</Button>
        </Toolbar>
      </AppBar>
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
          setup={setup_drawing}
          draw={draw_drawing}
          windowResized={resize_drawing}
          className="p5_instance_01"
          ref={ref}
        />
        <Sketch
          setup={setup_ui}
          draw={draw_ui}
          windowResized={resize_ui}
          className="p5_instance_02"
        />
      </div>
    </div>
  );
}

export default App;
