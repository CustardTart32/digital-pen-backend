import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

export default function Home() {
  const darkTheme = createTheme({
    palette: {
      type: "dark",
    },
  });

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      height: "100vh",
      color: darkTheme.palette.text.primary,
    },
  }));

  const classes = useStyles(darkTheme);

  return (
    <ThemeProvider theme={darkTheme}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing="3"
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
          <Button variant="contained" color="primary" href="/canvas">
            Canvas Page
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="secondary">
            Secondary
          </Button>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
