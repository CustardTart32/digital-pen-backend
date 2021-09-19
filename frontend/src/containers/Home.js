import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { useTheme } from "@material-ui/core";

export default function Home() {
  const theme = useTheme();

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      height: "100vh",
      color: theme.palette.text.primary,
    },
  }));

  const classes = useStyles(theme);

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={3}
      className={classes.root}
    >
      <Grid item>
        <Typography variant="h2">Digital Pen</Typography>
      </Grid>
      <Grid item>
        <Typography>
          An app that collects your handwriting data for the purposes of
          handwriting legibility assessment.
        </Typography>
      </Grid>
      <Grid item>
        <Link
          to="/consent"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Button variant="contained" color="primary">
            Digital Canvas
          </Button>
        </Link>
      </Grid>
      <Grid item>
        <Link to="/mark" style={{ textDecoration: "none", color: "inherit" }}>
          <Button variant="contained" color="secondary">
            Mark Submissions
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
}
