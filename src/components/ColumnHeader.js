import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// Asset Import
import moreHorizIcon from '../assets/more-horiz.svg';

const ColumnHeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 16px',
  paddingTop: '16px',
}));

const LeftSide = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
}));

const BadgeContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '5px 8.5px',
  backgroundColor: '#eab3081a',
  borderRadius: '16px',
}));

const BadgeText = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  fontSize: '10px',
  color: '#ca8a04',
}));

const moreIconStyle = {
  width: 24,
  height: 24,
};

const ColumnHeader = ({ title, badgeCount }) => {
  return (
    <ColumnHeaderContainer>
      <LeftSide>
        <Typography variant="h6" style={{ fontWeight: 600, fontSize: '14px', color: '#1f2633' }}>
          {title}
        </Typography>
        <BadgeContainer>
          <BadgeText>{badgeCount}</BadgeText>
        </BadgeContainer>
      </LeftSide>
      <img src={moreHorizIcon} alt="more_horiz" style={moreIconStyle} />
    </ColumnHeaderContainer>
  );
};

// Example usage with mock data
const Example = ({title,badge}) => {
  return (
    <ColumnHeader title={title} badgeCount={badge} />
  );
};

export default Example;
