import React, { useState, Suspense } from 'react';
import Sidebar from '../Sidebar';
import MainContent from '../MainContent';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
// Lazy load ChatSideBar
const ChatSideBar = React.lazy(() => import('../ChatSideBar'));

const AppContainer = styled(Box)({
  display: 'flex',
  position: 'relative',
  height: '100vh', 
});

const MainContentWrapper = styled(Box)(({ marginRight }) => ({
  flexGrow: 1,
  marginRight,
  transition: 'margin-right 0.3s ease',
  overflowY: 'hidden',
  height: '100%',
}));

// Simple Loader Component
const Loader = () => <div>Loading...</div>;

export default function HomePage() {
  const [mainContentMargin, setMainContentMargin] = useState('88px');
  return (
    <AppContainer>
      <Sidebar />
      <MainContentWrapper marginRight={mainContentMargin}>
        <MainContent />
      </MainContentWrapper>
      {/* Use Suspense to wrap the lazy-loaded component */}
      <Suspense fallback={<Loader />}>
        <ChatSideBar setMainContentMargin={setMainContentMargin} />
      </Suspense>
    </AppContainer>
  )
}