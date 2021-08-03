import React from "react";
import { useState } from "react";
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { darkTheme } from "../components/react/darkTheme";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useHistory } from "react-router-dom";
import Link from "@material-ui/core/Link";

const test = createTheme({
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
  dotPoint: {
    width: "100%",
  },
  title: {
    marginLeft: "2%",
    width: "100%",
  },
  form: {
    width: "100%",
  },
}));

export default function ConsentForm() {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");

  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name: name, address: address, email: email });

    if (checked === true) {
      history.push("/canvas/intro");
    } else {
      alert("You must agree to all terms by marking the checkbox.");
    }
  };

  return (
    <ThemeProvider theme={test}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="flex-start"
        className={classes.root}
      >
        <Grid item>
          <h1> Declaration by Participant </h1>
        </Grid>
        <Grid item className={classes.title}>
          <h3> By checking the start questionare option below: </h3>
        </Grid>
        <Grid item>
          <ul>
            <li>
              <Typography>
                I understand I am being asked to provide consent to participate
                in this research study.
              </Typography>
            </li>
            <li>
              <Typography>
                I have read the Participant Information Sheet, or it has been
                provided to me in a language that I understand.
              </Typography>
            </li>
            <li>
              <Typography>
                I provide my consent for the information collected about me to
                be used for the purpose of this research study only.
              </Typography>
            </li>
            <li>
              <Typography>
                I understand that if necessary, I can ask questions and the
                research team will respond to my questions.
              </Typography>
            </li>
            <li>
              <Typography>
                I freely agree to participate in this research study as
                described and understand that I am free to withdraw at any time
                during the study and withdrawal will not affect my relationship
                with any of the named organisations and/or the research team
                members.{" "}
              </Typography>
            </li>
          </ul>
        </Grid>
        <Grid item>
          <form id="form" onSubmit={handleSubmit}>
            <Grid
              container
              direction="column"
              spacing={1}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={() => {
                        setChecked(!checked);
                      }}
                      color="primary"
                    />
                  }
                  label={
                    <>
                      <Typography>
                        I understand that I can download a copy of this consent
                        form using
                        <Link href="http://www.google.com"> this link. </Link>
                      </Typography>
                    </>
                  }
                />
              </Grid>
              <Grid item className={classes.form}>
                <TextField
                  label="Name"
                  value={name}
                  required
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  className={classes.form}
                />
              </Grid>
              <Grid item className={classes.form}>
                <TextField
                  label="Address"
                  required
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                  className={classes.form}
                />
              </Grid>
              <Grid item className={classes.form}>
                <TextField
                  label="Email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className={classes.form}
                />
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" type="submit">
                  I agree
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
