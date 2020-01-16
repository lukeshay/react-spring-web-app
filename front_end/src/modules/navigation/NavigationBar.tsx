import {
  AppBar,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemText,
  SvgIcon,
  Toolbar,
  Typography
} from "@material-ui/core";
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme
} from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CloseIcon from "@material-ui/icons/Close";
import HomeIcon from "@material-ui/icons/Home";
import InfoIcon from "@material-ui/icons/Info";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import { Link } from "react-router-dom";
import { LIGHT_THEME, useViewContext } from "../../context/view/viewStore";
import ClimberIconBlack from "../../icons/climber_black.svg";
import ClimberIconWhite from "../../icons/climber_white.svg";
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
    icons: {
      paddingRight: theme.spacing(1)
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

const NavigationBar: React.FC<INavigationBarProps> = ({
  children
}): JSX.Element => {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const { state: viewState } = useViewContext();

  const handleDrawerToggle = (): void => setMobileOpen(!mobileOpen);

  const drawer = (
    <React.Fragment>
      <List>
        <ListItem
          button
          key={"home"}
          component={Link}
          to={Routes.HOME}
          className={classes.listItem}
        >
          <HomeIcon className={classes.icons} />
          <ListItemText primary={"Home"} />
        </ListItem>
        <ListItem
          button
          key={"gyms"}
          component={Link}
          to={Routes.GYMS}
          className={classes.listItem}
        >
          <SvgIcon
            component={
              viewState.theme === LIGHT_THEME
                ? ClimberIconBlack
                : ClimberIconWhite
            }
            className={classes.icons}
          />
          <ListItemText primary={"Gyms"} />
        </ListItem>
        <ListItem
          button
          key={"profile"}
          component={Link}
          to={Routes.PROFILE}
          className={classes.listItem}
        >
          <AccountCircleIcon className={classes.icons} />
          <ListItemText primary={"Profile"} />
        </ListItem>
        <ListItem
          button
          key={"about"}
          component={Link}
          to={Routes.ABOUT}
          className={classes.listItem}
        >
          <InfoIcon className={classes.icons} />
          <ListItemText primary={"About"} />
        </ListItem>
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

export default React.memo(NavigationBar);
