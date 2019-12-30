import AppBar from "@material-ui/core/AppBar";
import MenuItem from "@material-ui/core/MenuItem";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import AccountCircle from "@material-ui/icons/AccountCircle";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      color: "#ffffff",
      marginRight: theme.spacing(2),
      textDecoration: "none"
    },
    root: {
      flexGrow: 1
    },
    title: {
      flexGrow: 1
    }
  })
);

export default function MenuAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/">
            <MenuItem className={classes.menuButton}>Home</MenuItem>
          </Link>
          <Link to="/gyms">
            <MenuItem className={classes.menuButton}>Gyms</MenuItem>
          </Link>
          <Link to="/todo">
            <MenuItem className={classes.menuButton}>To-do</MenuItem>
          </Link>
          <MenuItem
            className={classes.menuButton}
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
          >
            <Link to="/profile">
              <AccountCircle />
            </Link>
          </MenuItem>
        </Toolbar>
      </AppBar>
    </div>
  );
}
