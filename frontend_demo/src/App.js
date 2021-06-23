// TODO: Serious Refactoring needed
import Sketch from "react-p5"
import {OneEuroFilter} from "./oneEuroFilter"
import './App.css';

var Pressure = require('pressure');

function App() {
  // How sensitive is the brush size to the pressure of the pen?
  var pressureMultiplier = 10;

  // What is the smallest size for the brush?
  var minBrushSize = 1;
  var brushDensity = 5;
  var showDebug = true;
  var minCutoff = 0.0001; // decrease this to get rid of slow speed jitter but increase lag (must be > 0)
  var beta      = 1.0;  // increase this to get rid of high speed lag


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
  var drawCanvas, uiCanvas;
  var isPressureInit = false;
  var isDrawing = false;
  var isDrawingJustStarted = false;

  let initPressure = () => {
    // console.log("Attempting to initialize Pressure.js ");
  
    Pressure.set('#uiCanvas', {
  
      start: function(event){
        // this is called on force start
        isDrawing = true;
        isDrawingJustStarted = true;
      },
      end: function(){
        // this is called on force end
        isDrawing = false
        pressure = 0;
      },
      change: function(force, event) {
        if (isPressureInit === false){
          console.log("Pressure.js initialized successfully");
          isPressureInit = true;
        }
        // console.log(force);
        pressure = force;
  
      }
    });
  }

  let setup_drawing = (p, canvasParentRef) => {
    // Filters used to smooth position and pressure jitter
    xFilter = new OneEuroFilter(60, minCutoff, beta, 1.0);
    yFilter = new OneEuroFilter(60, minCutoff, beta, 1.0);
    pFilter = new OneEuroFilter(60, minCutoff, beta, 1.0);

    // prevent scrolling on iOS Safari
    disableScroll();

    //Initialize the canvas
    drawCanvas = p.createCanvas(p.windowWidth, p.windowHeight);
    drawCanvas.id("drawingCanvas");
    drawCanvas.position(0, 0);
  };
  
  let draw_drawing = (p) => {
    // Start Pressure.js if it hasn't started already
    if(isPressureInit === false){
      initPressure();
    }

    let penX; 
    let penY;
    
    if(isDrawing) {
      // Smooth out the position of the pointer
      penX = xFilter.filter(p.mouseX, p.millis());
      penY = yFilter.filter(p.mouseY, p.millis());

      // What to do on the first frame of the stroke
      if(isDrawingJustStarted) {
        //console.log("started drawing");
        prevPenX = penX;
        prevPenY = penY;
      }

      // Smooth out the pressure
      pressure = pFilter.filter(pressure, p.millis());

      // Define the current brush size based on the pressure
      let brushSize = minBrushSize + (pressure * pressureMultiplier);

      // Print out the x,y,p,t details regarding digital ink 
      console.log({'x' : penX, 'y' : penY, 'p': pressure, 't': p.millis()})
      // console.log("X: ", penX)
      // console.log("Y: ", penY)
      // console.log("P: ", pressure)
      // console.log("t: ", p.millis())

      // Calculate the distance between previous and current position
      d = p.dist(prevPenX, prevPenY, penX, penY);

      // The bigger the distance the more ellipses
      // will be drawn to fill in the empty space
      inBetween = (d / p.min(brushSize,prevBrushSize)) * brushDensity;

      // Add ellipses to fill in the space
      // between samples of the pen position
      for(let i=1;i<=inBetween;i++){
        amt = i/inBetween;
        s = p.lerp(prevBrushSize, brushSize, amt);
        x = p.lerp(prevPenX, penX, amt);
        y = p.lerp(prevPenY, penY, amt);
        p.noStroke();
        p.fill(100)
        p.ellipse(x, y, s);
      }
      
      // Draw an ellipse at the latest position
      p.noStroke();
      p.fill(100)
      p.ellipse(penX, penY, brushSize);

      // Save the latest brush values for next frame
      prevBrushSize = brushSize;
      prevPenX = penX;
      prevPenY = penY;

      isDrawingJustStarted = false;
    }
  };

  let setup_ui = (p) => {
    uiCanvas = p.createCanvas(p.windowWidth, p.windowHeight);
    uiCanvas.id("uiCanvas");
    uiCanvas.position(0, 0);
  }

  let draw_ui = (p) => {
    uiCanvas.clear();

    if(showDebug){
      p.text("pressure = " + pressure, 10, 20);

      p.stroke(200,50);
      p.line(p.mouseX,0,p.mouseX,p.height);
      p.line(0,p.mouseY,p.width,p.mouseY);

      p.noStroke();
      p.fill(100)
      var w = p.width * pressure;
      p.rect(0, 0, w, 4);
    }
  }

  function preventDefault(e){
    e.preventDefault();
  } 

  function disableScroll(){
      document.body.addEventListener('touchmove', preventDefault, { passive: false });
  }
  
  return (
    <div className="App">
      <Sketch setup={setup_drawing} draw={draw_drawing} className="p5_instance_01" />
      <Sketch setup={setup_ui} draw={draw_ui} className="p5_instance_02" />
    </div>
  );
}

export default App;
