import React from "react";
import { useState } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import Fab from "@material-ui/core/Fab";

import NavBarMark from "./NavBarMark";
import { darkTheme } from "../components/react/darkTheme";
import Comparison from "../components/react/Comparision";

export default function Mark() {
  const [value, setValue] = useState("Submission A");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      color: darkTheme.palette.text.primary,
    },
  }));

  const classes = useStyles();

  return (
    <ThemeProvider theme={darkTheme}>
      <NavBarMark />
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="space-evenly"
        spacing={4}
        className={classes.root}
      >
        <Comparison handleChange={handleChange} value={value} />
        <Grid item>
          <Fab color="secondary" variant="extended" className={classes.button}>
            Next
          </Fab>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
