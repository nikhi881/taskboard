// src/components/AvatarComponent.js
import React from 'react';
import { Avatar, styled } from '@mui/material';

const StyledAvatar = styled(Avatar)({
  width: '32px',
  height: '32px',
  cursor: 'pointer',
});

const AvatarComponent = ({ avatar, alt }) => {
  return <StyledAvatar src={avatar.src}
    alt={alt}
    style={{
      backgroundColor: avatar.bgColor,
      color: avatar.color,
      fontSize: '10px',
      fontWeight: 800,
    }}>
    {avatar.content}
  </StyledAvatar>;
};

export default AvatarComponent;