import {
  AppBar,
  Avatar,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from "@material-ui/core";
import { Add, Apps } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { CreateClass, JoinClass } from "..";
import { useLocalContext } from "../../context/Context";
import { useStyles } from "./style";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";

const Header = ({ children }) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [logoutClicked, setLogoutClicked] = React.useState(false);
  

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const {
    setCreateClassDialog,
    setJoinClassDialog,
    loggedInUser,
    isTeacher
  } = useLocalContext();

  useEffect(() => {
    if (logoutClicked) {
      Cookies.remove("token");
    }
  }, [logoutClicked]);

  const handleCreate = () => {
    handleClose();
    setCreateClassDialog(true);
  };

  const handleJoin = () => {
    handleClose();
    setJoinClassDialog(true);
  };
  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar className={classes.toolbar}>
          <div className={classes.headerWrapper}>
            {children}
            <img
              src="https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg"
              alt="Classroom"
            />
            <Typography variant="h6" className={classes.title}>
              Classroom
            </Typography>
          </div>
          <div className={classes.header__wrapper__right}>
            <Add onClick={handleClick} className={classes.icon} />
            <Apps className={classes.icon} />
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleJoin}>Join Class</MenuItem>
              {isTeacher && <MenuItem onClick={handleCreate}>Create Class</MenuItem>}
              
            </Menu>
            <div>
              
              <Avatar
                onClick={(e) => setLogoutClicked(true)}
                src={loggedInUser?.photoURL}
                className={classes.icon}
              />
              Logout
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <CreateClass />
      <JoinClass />

      {logoutClicked && <Redirect to="/signin" />}
    </div>
  );
};

export default Header;
