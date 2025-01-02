import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Dashboard } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import GroupIcon from '@mui/icons-material/Group';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import InventoryIcon from '@mui/icons-material/Inventory';

const Sidebar = () => {
  
  const navigate=useNavigate();

  return (
    <Box width="250px" bgcolor="#4e59e7" minHeight="100vh" color="white">
      <Box textAlign="center" p={2} fontSize={20}>
        <img src='../../images/logo.png' alt='' style={{width:"70px"}}/>
      </Box>
      <List>
        {[
          { label: 'Dashboard', icon: <Dashboard />,route:"dashboard" },
          { label: 'User Management', icon: <GroupIcon />,route:"users" },
          { label: 'Product Management', icon: <InventoryIcon />,route:"products" },
          { label: 'Order Management', icon: <LocalShippingIcon />,route:"orders" },
          { label: 'Review Management', icon: <StarBorderIcon />,route:"reviews"  },

        ].map((item, index) => (
          <ListItem button key={index} onClick={(e)=>navigate(item.route)}>
            <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} sx={{mr:1}}/>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;