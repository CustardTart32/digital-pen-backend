import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Link } from "react-router-dom";

import { darkTheme } from "./darkTheme";
import { Button, Grid } from "@material-ui/core";

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
  },
}));

export default function SubmissionModal(props) {
  const classes = useStyles();

  function Success() {
    return (
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <h2 id="transition-modal-title">
          Your handwriting was saved successfully
        </h2>
        <p id="transition-modal-description">
          If you could provide your feedback on some user submitted handwriting
          data, that would be great!!
        </p>
        <p id="transition-modal-description">
          This should take 1-2 minutes tops.
        </p>
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Link to="/mark" style={{ textDecoration: "none", color: "inherit" }}>
            <Button variant="contained" color="primary">
              Start Marking
            </Button>
          </Link>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Button variant="contained" color="secondary">
              Back to Home
            </Button>
          </Link>
        </Grid>
      </Grid>
    );
  }

  function Failure() {
    return (
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <h2 id="transition-modal-title">Oops, something went wrong.</h2>
        <p id="transition-modal-description">{props.error}</p>
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Button
            variant="contained"
            color="primary"
            onClick={props.handleErrorReset}
          >
            Retry
          </Button>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Button variant="contained" color="secondary">
              Back to Home
            </Button>
          </Link>
        </Grid>
      </Grid>
    );
  }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={props.submissionStatus === "submitted"}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.submissionStatus === "submitted"}>
        <div className={classes.paper}>
          {props.error === "" ? <Success /> : <Failure />}
        </div>
      </Fade>
    </Modal>
  );
}
