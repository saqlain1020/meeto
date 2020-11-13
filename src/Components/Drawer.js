import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { Avatar, Fab, Menu, MenuItem } from "@material-ui/core";
import { connect } from "react-redux";
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { signOut } from "../Redux/user/userActions";
import FaceIcon from '@material-ui/icons/Face';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: "#1e272e"
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    background: "inherit",
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
    background: "inherit",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  menuItem: {
    // background: "red",
  },
  list:{
    // background: "red"
  },
  icon:{
    color: "white"
  },
  drw:{
      background: "#222"
  },
  text:{
      color:"white"
  }
}));

function MiniDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        // style={{ background: "#0c2461" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            MEET<b>O</b>
          </Typography>
          <Fab
            style={{ left: "calc(100% - 200px)" }}
            size="medium"
            color="primary"
            aria-label="avatar"
          >
            <Avatar
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
              src={props.user.images ? props.user.images[0] : ""}
            />
          </Fab>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            style={{ top: "50px" }}
          >
            <MenuItem className={classes.menuItem} onClick={handleClose}>
              {props.user.nickname}
            </MenuItem>
            <MenuItem className={classes.menuItem} onClick={handleClose}>
              Other Settings
            </MenuItem>
            <MenuItem
              className={classes.menuItem}
              onClick={() => {
                handleClose();
                props.signOut();
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
      
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        },classes.drw)}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton className={classes.text} onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List className={classes.list}>
        <ListItem onClick={()=>props.history.push("Dashboard")} button key="Dashboard">
                <ListItemIcon>
                <DashboardIcon className={classes.icon}/>
                </ListItemIcon>
                <ListItemText className={classes.text} primary="Dashboard" />
            </ListItem>
            <ListItem onClick={()=>props.history.push("MeetingDashboard")} button key="Meet Someone">
                <ListItemIcon>
                <FaceIcon className={classes.icon}/>
                </ListItemIcon>
                <ListItemText className={classes.text} primary="Meet Someone" />
            </ListItem>
          {["Inbox", "Starred"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon className={classes.icon} /> : <MailIcon className={classes.icon} />}
              </ListItemIcon>
              <ListItemText className={classes.text} primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List className={classes.list}>
          {["All mail", "Trash"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon className={classes.icon}/> : <MailIcon className={classes.icon}/>}
              </ListItemIcon>
              <ListItemText className={classes.text} primary={text} />
            </ListItem>
          ))}
          <ListItem onClick={props.signOut} button key="Sign Out">
                <ListItemIcon>
                <ExitToAppIcon className={classes.icon}/>
                </ListItemIcon>
                <ListItemText className={classes.text} primary="Sign Out" />
            </ListItem>
          
        </List>
      </Drawer>
      <main style={{ width: "100%" }}>{props.children}</main>
    </div>
  );
}

var actions = {
  signOut,
};

var mapState = (state) => ({
  user: state.user,
});
export default connect(mapState, actions)(MiniDrawer);
