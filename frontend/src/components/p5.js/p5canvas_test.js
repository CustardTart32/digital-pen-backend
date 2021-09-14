import { OneEuroFilter } from "./oneEuroFilter";
import fire from "../../config/firebase";
import firebase from "firebase/app";
var db = fire.firestore();
var storage = fire.storage();
var storageRef = storage.ref();

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
var lineWidth = 70;

// Arrays to store digital ink
export var xVals = [];
export var yVals = [];
export var tVals = [];
export var pVals = [];

// Variable to clear the canvas
export var resetNeeded = false;

// References to p5 canvasses
export var drawCanvas, uiCanvas;
var isPressureInit = false;
var isDrawing = false;
var isDrawingJustStarted = false;

var draw_lines = (p) => {
  p.stroke(255, 255, 255);
  for (let i = lineWidth; i < p.windowHeight; i += lineWidth) {
    p.line(0, i, p.windowWidth, i);
  }
};

var initPressure = () => {
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
        // console.log("Pressure.js initialized successfully");
        isPressureInit = true;
      }
      // console.log(force);
      pressure = force;
    },
  });
};

export var setup_drawing = (p, canvasParentRef) => {
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

  draw_lines(p);
};

export var resize_drawing = (p) => {
  p.resizeCanvas(p.windowWidth, p.windowHeight - p.windowHeight / 3);
  p.background("#2f4f4f");
  drawCanvas.position(0, p.windowHeight / 3);
  draw_lines(p);
};

export var draw_drawing = (p) => {
  // Start Pressure.js if it hasn't started already
  if (isPressureInit === false) {
    initPressure();
  }

  // If reset is needed
  if (resetNeeded === true) {
    drawCanvas.background("#2f4f4f");
    draw_lines(p);
    xVals = [];
    yVals = [];
    tVals = [];
    pVals = [];
    resetNeeded = false;
  }

  let penX;
  let penY;

  if (isDrawing) {
    // Smooth out the position of the pointer
    penX = xFilter.filter(p.mouseX, p.millis());
    penY = yFilter.filter(p.mouseY, p.millis());

    // What to do on the first frame of the stroke
    if (isDrawingJustStarted) {
      prevPenX = penX;
      prevPenY = penY;
    }

    // Smooth out the pressure
    pressure = pFilter.filter(pressure, p.millis());

    // Define the current brush size based on the pressure
    let brushSize = minBrushSize + pressure * pressureMultiplier;

    // Calculate the distance between previous and current position
    d = p.dist(prevPenX, prevPenY, penX, penY);

    // The bigger the distance the more ellipses
    // will be drawn to fill in the empty space
    inBetween = (d / p.min(brushSize, prevBrushSize)) * brushDensity;

    // Add ellipses to fill in the space between samples of the pen position
    // As p5.js collects points in time, this is is used to create one continuous brush stroke
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

    // Collect pen postion
    xVals.push(penX);
    yVals.push(penY);
    tVals.push(p.millis());
    pVals.push(pressure);

    // Save the latest brush values for next frame
    prevBrushSize = brushSize;
    prevPenX = penX;
    prevPenY = penY;

    isDrawingJustStarted = false;
  }
};

export var setup_ui = (p) => {
  uiCanvas = p.createCanvas(p.windowWidth, p.windowHeight - p.windowHeight / 3);
  uiCanvas.id("uiCanvas");
  uiCanvas.position(0, p.windowHeight / 3);
};

export var draw_ui = (p) => {
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

function disableScroll() {
  document.body.addEventListener("touchmove", preventDefault, {
    passive: false,
  });
}

function preventDefault(e) {
  e.preventDefault();
}

export var handleSubmit = async (user, setSubmissionStatus, setError) => {
  setSubmissionStatus("submitting");

  // Select canvas attribute from DOM and generate a BASE64 img representation
  var canvas = document.getElementById("drawingCanvas");
  var img = canvas.toDataURL("image/png");
  let db_ref = db.collection("ink").doc();
  var imgRef = storageRef.child("inkImages/" + db_ref.id + ".png");

  try {
    await db_ref.set({ x: xVals, y: yVals, t: tVals, p: pVals });
    console.log("Uploaded digital ink");
    await imgRef.putString(img, "data_url");
    console.log("Uploaded a data_url string!");

    // Link db_ref to user
    let user_ref = db.collection("user_docs").doc(user);
    await user_ref.update({
      docs: firebase.firestore.FieldValue.arrayUnion(db_ref.id),
    });
    console.log("Updated user references");
    setSubmissionStatus("submitted");
    setError("");
  } catch (err) {
    setSubmissionStatus("submitted");
    setError("Error uploading results");
    console.log(err);
  }

  // setSubmissionStatus("submitted");
  // setError("Error uploading results");
};

export var handleReset = () => {
  resetNeeded = true;
};
