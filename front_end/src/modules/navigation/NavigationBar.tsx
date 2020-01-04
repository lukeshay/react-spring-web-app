import {
  AppBar,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography
} from "@material-ui/core";
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme
} from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import { Link } from "react-router-dom";
import { Routes } from "../../routes";

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

export interface INavigationBarProps {
  children: React.ReactNode;
}

const NavigationBar: React.FC<INavigationBarProps> = ({ children }) => {
  const navItems: Array<{ text: string; link: string }> = [
    { text: "Home", link: Routes.HOME },
    { text: "Gyms", link: Routes.GYMS },
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
              Route Rating
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
              {children}
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
            {drawer}
            {children}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
};

export default NavigationBar;
