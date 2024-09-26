// src/components/StatusMenuComponent.js
import React from 'react';
import { Menu, MenuItem } from '@mui/material';

const StatusMenuComponent = ({ anchorEl, handleStatusMenuClose, statusOptions, handleStatusChange }) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleStatusMenuClose}
    >
      {statusOptions.map((status) => (
        <MenuItem key={status} onClick={() => handleStatusChange(status)}>
          {status}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default StatusMenuComponent;