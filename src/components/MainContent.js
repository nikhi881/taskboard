import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import TopBar from './TopBar';
import TaskBoard from './TaskBoard';
const MainContentContainer = styled(Box)(({ theme }) => ({
  padding: '0px',
  backgroundColor: '#f7f8fa',
  flex: 1,
  overflowY: 'scroll',
  scrollbarWidth:"none",
  minHeight: '100%',
}));

const ContentContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#f7f8fa',
  flex: 1,
  overflowY: 'scroll',
  scrollbarWidth:"none"
}));

const MainContent = () => {
  const columns = ['Backlog', 'To Do', 'In Process', 'Done'];

  return (
    <MainContentContainer>
      <TopBar />
      <ContentContainer>
        <TaskBoard />
      </ContentContainer>
      </MainContentContainer>
  );
};

export default MainContent;
