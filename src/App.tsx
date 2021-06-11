import React from 'react';
import './App.css';
import { RestaurantFinder } from './Components/restaurantFinder';
import { Typography, AppBar, Toolbar, Link, createStyles, Theme, makeStyles } from "@material-ui/core";

import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedinIcon from "@material-ui/icons/LinkedIn";
import PhoneIcon from "@material-ui/icons/Phone";
import MailIcon from "@material-ui/icons/Mail";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flex: 1,
      height: "100vh",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center"
    },
    toolbar: {
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center",
      flexWrap: "wrap"
    },
    contact: {
      display: "flex",
      alignItems: "center"
    }
  }),
);


function App() {
  const classes = useStyles();

  return (
    <div
      className={classes.root}
    >
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            CrunchApp:  A little tool to find the 10 nearest restaurants around a location
          </Typography>
        </Toolbar>
      </AppBar>

      <RestaurantFinder />
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" className={classes.contact}>
            <MailIcon />
            <Link href="mailto:antoine.marras@student-cs.fr" color="inherit">antoine.marras@student-cs.fr</Link>
          </Typography>

          <Typography variant="h6" className={classes.contact}>
            <PhoneIcon />
            +33 6 73 03 49 78
          </Typography>

          <Typography variant="h6" className={classes.contact}>
            <GitHubIcon />
            <Link href="https://github.com/spineki" color="inherit"> Github</Link>
          </Typography>

          <Typography variant="h6" className={classes.contact}>
            <LinkedinIcon />
            <Link href="https://www.linkedin.com/in/antoine-marras/" color="inherit"> Linkedin</Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </div >
  );
}

export default App;
