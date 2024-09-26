import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';

// Assets Imports
import taskIcon from '../assets/task.svg';
import avatarImg from '../assets/avatar.svg';
import avatarImg2 from '../assets/avatar-2.svg';
import filePresent from '../assets/file-present.svg';
import messageIcon from '../assets/message.svg';
import addIcon from '../assets/icon.svg';
import { ReactComponent as AddIcon } from '../assets/icon.svg';

const CardContainer = styled(Box)(({ theme }) => ({
  padding: '20px',
  backgroundColor: '#FFF',
  borderRadius: '8px',
  boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.1)',
}));

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px',
}));

const Label = styled(Box)(({ theme }) => ({
  padding: '5px 8px',
  borderRadius: '16px',
  fontSize: '8px',
  fontWeight: '800',
  lineHeight: '12px',
  textAlign: 'center',
  display: 'inline-block',
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
}));

const AvatarGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '0px',
}));

const IconBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  color: theme.palette.text.secondary,
  fontWeight: '600',
  fontSize: '10px',
}));



const AddButton = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  backgroundColor: '#fff',
  border: '1px solid #ebeef2',
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: '40px',
  height: '40px',
  border: '2px solid #fff',
}));
const Card = ({ task }) => {
  return (
    <CardContainer>
      <Header>
        <Typography variant="body1" fontWeight="600" color="#1f2633">
          {task.title}
        </Typography>
        <Box display="flex" alignItems="center" gap="8px">
          <img src={taskIcon} alt="Task Icon" width="20" height="20" />
          <Typography variant="caption" color="#17a5e6" fontWeight="800">
            {task.tasksCount}
          </Typography>
        </Box>
      </Header>
      <Box display="flex" gap="8px" marginBottom="20px">
        {task.labels.map((label, index) => (
          <Label
            key={index}
            style={{
              backgroundColor: label === '#UI007' ? '#f2f4f7' : label === 'Design' ? '#3b82f61a' : '#eab3081a',
              color: label === 'Design' ? '#2563eb' : label === 'Backlog' ? '#ca8a04' : '#606c80',
            }}
          >
            {label}
          </Label>
        ))}
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
      <AvatarGroup>
          {task.avatars.map((avatar, index) => (
            <StyledAvatar
              key={index}
              src={avatar}
              alt={`avatar-${index}`}
              sx={{ marginLeft: index !== 0 && '-12px' }}
            />
          ))}
          <Avatar sx={{ width: 32,
              height: 32,
              backgroundColor: '#f2f4f7',
              color: '#606c80',
              fontWeight: '800',
              fontSize: '10px', marginLeft: '-12px' }}>
            +5
          </Avatar>
          <AddButton>
            <AddIcon width="16" height="16" />
          </AddButton>
        </AvatarGroup>
        
        <Box display="flex" gap="20px">
          <IconBox>
            <img src={filePresent} alt="File Icon" width="20" height="20" />
            <Typography>{task.filesCount}</Typography>
          </IconBox>
          <IconBox>
            <img src={messageIcon} alt="Comment Icon" width="20" height="20" />
            <Typography>{task.commentsCount}</Typography>
          </IconBox>
        </Box>
      </Box>
    </CardContainer>
  );
};


export default function App({task}) {
  return <Card task={task} />;
}
