import React from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const UserMenu = ({ user }) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <Avatar alt={user.name} src={user.profilePicture} style={{ width: '40px', height: '40px', marginRight: '16px' }} />
    <div>
      <Typography variant="h6" style={{ fontWeight: 600 }}>{user.name}</Typography>
      <Typography variant="body2" color="textSecondary">{user.email}</Typography>
    </div>
  </div>
);

export default UserMenu;
