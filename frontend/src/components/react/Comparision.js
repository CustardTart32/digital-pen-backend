import React from "react";
import { useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "../../styles/carousel_styles.css";
import { Carousel } from "react-responsive-carousel";

// import submission_a from "../../assets/submissions/ALxdH3dmBJ6JoauXjCle.png";
// import submission_b from "../../assets/submissions/cw87bnlvENSOp6pzaVzr.png";

import submission_a from "../../assets/dataset_screenshots/001b.png";
import submission_b from "../../assets/dataset_screenshots/001d.png";

export default function Comparison() {
  const [value, setValue] = useState("Submission A");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

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
            value={value}
            onChange={handleChange}
            row
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
      <Grid
        container
        item
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item>
          <Carousel showThumbs={false} width="90%">
            <div>
              <img src={submission_a} alt="" />
              <p className="legend">Submission A</p>
            </div>
            <div>
              <img src={submission_b} alt="" />
              <p className="legend">Submission B</p>
            </div>
          </Carousel>
        </Grid>
      </Grid>{" "}
    </>
  );
}
