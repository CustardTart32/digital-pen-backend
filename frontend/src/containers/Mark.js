import React from "react";
import { useState } from "react";
import { Grid, makeStyles, useTheme } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import NavBarMark from "../components/react/NavBarMark";
import Comparison from "../components/react/Comparision";
import FourPointScale from "../components/react/FourPointScale";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.primary,
    width: "100%",
  },
  toolbar: theme.mixins.toolbar,
}));

export default function Mark() {
  const theme = useTheme();
  const classes = useStyles(theme);

  const [stage, setStage] = useState(1);

  const handleNext = () => {
    setStage(stage + 1);
  };

  const renderSurveyQuestion = () => {
    if (stage <= 5) {
      return <Comparison />;
    } else {
      return <FourPointScale />;
    }
  };

  const renderButton = () => {
    if (stage === 10) {
      return (
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Fab
            // color="secondary"
            variant="extended"
            className={classes.button}
          >
            Finish and Submit
          </Fab>
        </Link>
      );
    } else {
      return (
        <Fab
          color="secondary"
          variant="extended"
          onClick={handleNext}
          className={classes.button}
        >
          Next
        </Fab>
      );
    }
  };

  return (
    <>
      <NavBarMark progress={stage * 10} />
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="space-evenly"
        spacing={2}
        className={classes.root}
      >
        <div className={classes.toolbar} />
        {renderSurveyQuestion()}
        <Grid item>{renderButton()}</Grid>
      </Grid>
    </>
  );
}
