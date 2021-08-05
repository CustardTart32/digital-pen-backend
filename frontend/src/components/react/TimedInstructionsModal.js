import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";
import Fade from "@material-ui/core/Fade";
import { darkTheme } from "./darkTheme";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: darkTheme.palette.background.paper,
    color: darkTheme.palette.text.primary,
    boxShadow: darkTheme.shadows[5],
    padding: darkTheme.spacing(2, 4, 3),
    maxWidth: "70%",
  },
  good: {
    color: darkTheme.palette.success.main,
    marginRight: "2%",
  },
  bad: {
    color: darkTheme.palette.error.main,
    marginRight: "2%",
  },
}));

export default function TimedInstructionsModal(props) {
  const classes = useStyles();

  const renderInstructions = () => {
    return (
      <Grid item>
        <ul>
          <li>
            In the following task, you will be given 60 seconds to copy a given
            piece of text.
          </li>
          <li>
            If you make a mistake, tap the reset button on the top right corner
            to clear the canvas or refresh this page.
          </li>
          <li> The task will begin once you click the button below. </li>
        </ul>
      </Grid>
    );
  };

  const renderButtons = () => {
    return (
      <Grid item>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            props.handleClose();
          }}
        >
          Begin
        </Button>
      </Grid>
    );
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={props.open}
    >
      <Fade in={props.open}>
        <div className={classes.paper}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            <Grid item>
              <h2> Test Instructions </h2>
            </Grid>
            {renderInstructions()}
            <Grid
              container
              item
              alignItems="center"
              justifyContent="space-evenly"
            >
              {renderButtons()}
            </Grid>
          </Grid>
        </div>
      </Fade>
    </Modal>
  );
}
