import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';

import SearchIcon from '@mui/icons-material/Search';
import VoiceIcon from '@mui/icons-material/KeyboardVoiceOutlined';

// Assets import
import folderOpen from '../assets/folder-open.svg';
import notificationsNone from '../assets/notifications-none.svg';
import avatar from '../assets/avatar.svg';

const TopBarContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '20px 36px',
  backgroundColor: '#FFFFFF',
  boxShadow: theme.shadows[2],
}));

const SearchContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '0 16px',
  backgroundColor: '#F7F8FA',
  borderRadius: '8px',
  gap: '10px',
  flex: 1,
  border: `1px solid #EBEEF2`,
}));

const MenuContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '32px',
  marginLeft: 'auto',
});

const ActionButton = styled(IconButton)({
  padding: '8px',
});

const TopBarAvatar = styled(Avatar)({
  width: '32px',
  height: '32px',
  position: 'relative',
});

const StatusIndicator = styled('div')({
  position: 'absolute',
  bottom: 0,
  right: 0,
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  border: '2px solid #FFFFFF',
  backgroundColor: '#34C759', // Online status color
});

const TopBar = () => (
  <TopBarContainer>
    <SearchContainer>
      <SearchIcon style={{ fontSize: '24px', color: '#98a2b2' }} />
      <InputBase placeholder="Search Tasks" fullWidth style={{ color: '#98a2b2' }} />
      <IconButton>
        <img src={folderOpen} alt="Voice" />
      </IconButton>
    </SearchContainer>
    <MenuContainer>
      {['Dashboard', 'My Tasks', 'Reporting', 'Portfolios', 'Goals'].map((item) => (
        <MenuItem key={item}>
          <Typography style={{ fontWeight: 700, color: item === 'Dashboard' ? '#323c4d' : '#7a8699' }}>
            {item}
          </Typography>
        </MenuItem>
      ))}
      <ActionButton>
        <img src={folderOpen} alt="folder_open" />
      </ActionButton>
      <ActionButton>
        <img src={notificationsNone} alt="notifications_none" />
      </ActionButton>
      <TopBarAvatar src={avatar} alt="User Avatar">
        <StatusIndicator />
      </TopBarAvatar>
    </MenuContainer>
  </TopBarContainer>
);

export default TopBar;
