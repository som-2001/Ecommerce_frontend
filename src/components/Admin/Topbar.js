import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Button,
  Badge,
} from "@mui/material";
import { Notifications } from "@mui/icons-material";
import { LogoutDialog } from "../profile/LogoutDialog";
import styles from '../../styles/Admin/Dashboard.module.css'

const Topbar = () => {

  const [open,setOpen]=useState(false);
  
  const handleLogout=()=>{
    setOpen(true);
  }
  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ mb: 0 }}>
      <Toolbar sx={{justifyContent:"flex-end"}}>
       
        <IconButton sx={{ bgcolor: "#d3e9f5", mr: 2 }}>
          <Badge badgeContent={4} color="error">
            <Notifications />
          </Badge>
        </IconButton>
        <Button
          className={styles.logout}
          onClick={handleLogout}
        >
          Logout
        </Button>
        <Avatar sx={{ bgcolor: "#16404D" }}>A</Avatar>
      </Toolbar>
        <LogoutDialog open={open} setOpen={setOpen}/>
    </AppBar>
  );
};

export default Topbar;
