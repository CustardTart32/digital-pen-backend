import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  startButton: {
    width: "100%",
    paddingRight: "2%",
  },
}));

export default function Timer(props) {
  const classes = useStyles();

  return (
    <Grid
      container
      item
      direction="row"
      justifyContent="flex-end"
      className={classes.startButton}
    >
      {props.tutOpen === false ? (
        <Box position="relative" display="inline-flex">
          <CircularProgress
            variant="determinate"
            value={props.time}
            color="secondary"
          />
          <Box
            top={0}
            left={0}
            bottom={0}
            right={0}
            position="absolute"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="caption" component="div">
              {Math.round(props.time / (100 / 30))}
            </Typography>
          </Box>
        </Box>
      ) : (
        <></>
      )}
    </Grid>
  );
}
