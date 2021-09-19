import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useTheme } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    color: theme.palette.text.primary,
  },
}));

export default function FourPointModal(props) {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={props.open}
      onClose={props.handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.open}>
        <div className={classes.paper}>
          <h2 id="transition-modal-title">Four Point Scale</h2>
          <h4>Illegible</h4>
          <p id="transition-modal-description">
            Most or all of the words are impossible to identify; the meaning of
            the text is unclear
          </p>
          <h4>Most Words Illegible</h4>
          <p id="transition-modal-description">
            Some words are clear; the meaning of the text is unclear
          </p>
          <h4>Some Words Illegible</h4>
          <p id="transition-modal-description">
            Not all words are clear; the meaning of the text can be understood
          </p>
          <h4>Legible</h4>
          <p id="transition-modal-description">
            All words are clear; the meaning of the text can be understood
          </p>
        </div>
      </Fade>
    </Modal>
  );
}
