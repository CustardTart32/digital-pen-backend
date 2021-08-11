import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { darkTheme } from "../components/react/darkTheme";
import { Link } from "react-router-dom";

export default function Home() {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      height: "100vh",
      color: darkTheme.palette.text.primary,
    },
  }));

  const classes = useStyles();

  return (
    <ThemeProvider theme={darkTheme}>
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
              Canvas Page
            </Button>
          </Link>
        </Grid>
        <Grid item>
          <Link to="/mark" style={{ textDecoration: "none", color: "inherit" }}>
            <Button variant="contained" color="secondary">
              Secondary
            </Button>
          </Link>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
