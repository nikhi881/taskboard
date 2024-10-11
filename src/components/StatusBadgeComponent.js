// src/components/StatusBadgeComponent.js
import React from 'react';
import { Badge, Avatar, styled, Box } from '@mui/material';
import { hslToHex, getRandomLightColor, getRandomDarkColor, getContentFromReceiver, convertUTCtoLocal } from '../utils/utils';
import { ariaHidden } from '@mui/material/Modal/ModalManager';

const StatusBadge = styled(Badge)(({ theme, status }) => {
  const statusColors = {
    'Available': '#4CAF50',
    'Busy': '#F44336',
    'Do Not Disturb': '#E91E63',
    'In a Call': '#FF9800',
    'Be Right Back': '#FFC107',
    'Appear Away': '#9E9E9E',
    'Appear Offline': '#757575',
  };

  return {
    '& .MuiBadge-badge': {
      backgroundColor: statusColors[status] || statusColors['Appear Offline'],
      color: statusColors[status] || statusColors['Appear Offline'],
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: '-1px',
        left: '-1px',
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  };
});

const StatusBadgeComponent = ({ userStatus, avatar1, openMenu, handleStatusMenuOpen, alt, shrinkedName, showCount}) => {
  return <StatusBadge
    overlap="circular"
    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    variant="dot"
    status={userStatus}
  >
    <Avatar
      src={avatar1.photo ? avatar1.photo : shrinkedName}
      onClick={openMenu ? handleStatusMenuOpen : null}
      style={{ cursor: 'pointer', width: 40, height: 40 }}
      alt={alt}
    />
    {(avatar1.unreadCount > 0 && showCount) && (
      <Box
        position="absolute"
        top="-4px"
        right="-4px"
        bgcolor="#ef4444"
        color="#fff"
        borderRadius="50%"
        width="20px"
        height="20px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontSize="10px"
        fontWeight={900}
      >
        {avatar1.unreadCount}
      </Box>
    )}
  </StatusBadge>;
};

export default StatusBadgeComponent;