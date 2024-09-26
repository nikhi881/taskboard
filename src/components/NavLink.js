import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const NavLink = ({ icon, primary, secondary }) => (
  <ListItem button>
    <ListItemIcon>
      {icon}
    </ListItemIcon>
    <ListItemText primary={primary} secondary={secondary} />
  </ListItem>
);

export default NavLink;
