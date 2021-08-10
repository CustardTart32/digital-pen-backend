import React from "react";
import { Grid, Typography } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import submission_a from "../../assets/submissions/ALxdH3dmBJ6JoauXjCle.png";
import submission_b from "../../assets/submissions/cw87bnlvENSOp6pzaVzr.png";

export default function Comparison(props) {
  return (
    <>
      <Grid item>
        <Typography variant="h6">
          Which of these pieces of handwriting is more legible in your opinion?
        </Typography>
      </Grid>
      <Grid item>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="text"
            name="Text"
            value={props.value}
            onChange={props.handleChange}
          >
            <FormControlLabel
              value="a"
              control={<Radio />}
              label="Submission A"
            />
            <FormControlLabel
              value="b"
              control={<Radio />}
              label="Submission B"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item>
        <Carousel showThumbs={false}>
          <div>
            <img src={submission_a} alt="" />
            <p className="legend">Submission A</p>
          </div>
          <div>
            <img src={submission_b} alt="" />
            <p className="legend">Submission B</p>
          </div>
        </Carousel>
      </Grid>{" "}
    </>
  );
}
