import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme
} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import { Link } from "react-router-dom";
import { AuthRoutes, Routes } from "../../routes";

const drawerWidth = 170;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1
    },
    closeMenuButton: {
      marginLeft: 0,
      marginRight: "auto"
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        flexShrink: 0,
        width: drawerWidth
      }
    },
    drawerPaper: {
      width: drawerWidth
    },
    listItem: {
      paddingLeft: theme.spacing(3)
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none"
      }
    },
    root: {
      display: "flex"
    },
    toolbar: theme.mixins.toolbar
  })
);

const NavigationBar: React.FC = () => {
  const navItems: Array<{ text: string; link: string }> = [
    { text: "Home", link: Routes.HOME },
    { text: "Gyms", link: Routes.GYMS },
    { text: "To-do", link: AuthRoutes.TODO },
    { text: "Profile", link: Routes.PROFILE }
  ];

  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const drawer = (
    <React.Fragment>
      <List>
        {navItems.map((obj) => (
          <ListItem
            button
            key={obj.text}
            component={Link}
            to={obj.link}
            className={classes.listItem}
          >
            <ListItemText primary={obj.text} />
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );

  return (
    <div className={classes.root}>
      {window.innerWidth < 600 && (
        <AppBar position="fixed" className={classes.appBar} color="default">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Responsive drawer
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      <nav className={classes.drawer}>
        {window.innerWidth < 600 && (
          <Hidden smUp implementation="css">
            <Drawer
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
              ModalProps={{
                keepMounted: true // Better open performance on mobile.
              }}
            >
              <IconButton
                onClick={handleDrawerToggle}
                className={classes.closeMenuButton}
              >
                <CloseIcon />
              </IconButton>
              {drawer}
            </Drawer>
          </Hidden>
        )}
        <Hidden xsDown implementation="css">
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper
            }}
          >
            {/* <div className={classes.toolbar} /> */}
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
};

export default NavigationBar;
