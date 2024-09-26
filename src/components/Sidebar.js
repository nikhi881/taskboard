import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';

// Icons
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InboxIcon from '@mui/icons-material/Inbox';
import FolderIcon from '@mui/icons-material/Folder';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import StoreIcon from '@mui/icons-material/Store';
import PaymentIcon from '@mui/icons-material/Payment';
import LockClockIcon from '@mui/icons-material/LockClock';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import TuneIcon from '@mui/icons-material/Tune';
import TagIcon from '@mui/icons-material/LocalOffer';
import AddIcon from '@mui/icons-material/Add';
import NoteIcon from '@mui/icons-material/Note';

// Asset Imports
import menuOpen from '../assets/menu-open.svg';
import unfoldMore from '../assets/unfold-more.svg';
import avatar from '../assets/avatar.svg';
import progress from '../assets/progress.svg';
import keyboardArrowUp from '../assets/keyboard-arrow-up.svg';
import tag from '../assets/tag.svg';

const SidebarContainer = styled('div')(({ theme, expanded }) => ({
  width: expanded ? '250px' : '64px',
  height: '100vh',
  backgroundColor: '#F7F9FC',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  transition: 'width 0.2s ease-in-out',
  borderRight: `1px solid ${theme.palette.divider}`,
}));

const Header = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '30px 32px',
  alignItems: 'center',
});

const Content = styled('div')(({ theme, expanded }) => ({
  padding: expanded ? '32px' : '16px',
  flex: 1,
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  scrollbarWidth: "1px"
}));

const UserSection = styled('div')(({ expanded }) => ({
  display: 'flex',
  width: '100%',
  paddingBottom: '32px',
  alignItems: 'center',
  justifyContent: expanded ? 'space-between' : 'center',
}));

const AvatarContainer = styled('div')({
  position: 'relative',
  width: '48px',
  height: '48px',
});

const ProgressImage = styled('img')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '48px',
  height: '48px',
});

const Menu = styled(List)({
  padding: 0,
  width: '100%',
});

const MenuItemText = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '10px',
  color: '#98A2B2',
  flexGrow: 1,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});


const ListItemImageIcon = ({ src, alt }) => (
  <ListItemIcon>
    {React.createElement(src)}
  </ListItemIcon>
);

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const [dashboardOpen, setDashboardOpen] = useState(true);
  const [projectsOpen, setProjectsOpen] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDashboardClick = () => {
    setDashboardOpen(!dashboardOpen);
  };

  const handleProjectsClick = () => {
    setProjectsOpen(!projectsOpen);
  };

  const projectsArr = [
    { icon: NoteIcon, text: 'Additional Calendar', badge: 6 },
    { icon: NoteIcon, text: 'Brand Logo Design', badge: 11 },
    { icon: NoteIcon, text: 'User Research' },
    { icon: NoteIcon, text: 'Marketing Sales', badge: 23 },
    { icon: NoteIcon, text: 'New Project Template' },
    { icon: AddIcon, text: 'Add New Project' },
  ]

  return (
    <SidebarContainer expanded={expanded}>
      <Header>
        {expanded && <Typography variant="h6" style={{ fontWeight: 700, color: '#1f2633' }}>Dashboard</Typography>}
        <IconButton onClick={handleExpandClick}>
          <img src={menuOpen} alt="menu_open" />
        </IconButton>
      </Header>

      <Content>
        <UserSection expanded={expanded}>
          <Box display={expanded ? 'flex' : 'none'} alignItems="center" >
            <AvatarContainer>
              <ProgressImage src={progress} alt="progress" />
              <Avatar alt="Nancy Martino" src={avatar} style={{ width: 40, height: 40, margin: '4px' }} />
            </AvatarContainer>
            {expanded && (
              <Box ml={2}>
                <Typography style={{ fontWeight: 700, color: '#1f2633' }}>Nancy Martino</Typography>
                <Typography style={{ fontWeight: 700, color: '#b8bfcc', fontSize: 11 }}>Designer</Typography>
              </Box>
            )}
          </Box>
          {expanded && <IconButton>
            <img src={unfoldMore} alt="unfold_more" />
          </IconButton>}
        </UserSection>

        <Menu>
          <ListItem button onClick={handleDashboardClick}>
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            {expanded && <ListItemText primary={<MenuItemText>DASHBOARDS</MenuItemText>} />}
            {expanded ? (dashboardOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />) : null}
          </ListItem>
          <Collapse in={dashboardOpen && expanded} timeout="auto" unmountOnExit>
            {[
              { icon: InboxIcon, text: 'Inbox', badge: 4 },
              { icon: FolderIcon, text: 'Drive Files', badge: 435 },
              { icon: DashboardCustomizeIcon, text: 'Boards', badge: 5 },
              { icon: AccessTimeIcon, text: 'Updates' },
              { icon: DataUsageIcon, text: 'Analytics' },
              { icon: SpaceDashboardIcon, text: 'CRM Dashboard' },
              { icon: StoreIcon, text: 'Ecommerce' },
              { icon: PaymentIcon, text: 'Cryptocurrency' },
              { icon: LockClockIcon, text: 'Projects' },
              { icon: ImageSearchIcon, text: 'NFT Marketplace' },
              { icon: TuneIcon, text: 'Settings' },
            ].map((item, index) => (
              <ListItem button key={index}>
                <ListItemIcon>{React.createElement(item.icon)}</ListItemIcon>
                {expanded && <ListItemText primary={item.text}
                  primaryTypographyProps={{ fontSize: '12px' }} />}
                {expanded && item.badge && (
                  <div style={{
                    marginLeft: 'auto',
                    backgroundColor: '#3b82f61a',
                    padding: '5px 8.5px',
                    borderRadius: '16px',
                    color: '#2563eb',
                    fontWeight: 800,
                    fontSize: '10px',
                  }}>{item.badge}</div>
                )}
              </ListItem>
            ))}
          </Collapse>

          <Divider style={{ width: '100%', margin: '20px 0' }} />

          <ListItem button onClick={handleProjectsClick}>
            <ListItemIcon><TagIcon /></ListItemIcon>
            {expanded && <ListItemText primary={<MenuItemText>PROJECTS</MenuItemText>} />}
            {expanded && (projectsOpen ? <img src={keyboardArrowUp} alt="keyboard_arrow_up" /> : <ExpandMoreIcon />)}
          </ListItem>
          <Collapse in={projectsOpen && expanded} timeout="auto" unmountOnExit>
            {projectsArr.map((item, index) => (
              <ListItem button key={index}>
                <ListItemImageIcon src={item.icon} alt={item.text} />
                {expanded && <ListItemText primary={item.text}
                  primaryTypographyProps={{ fontSize: '12px' }} />}
                {expanded && item.badge && (
                  <div style={{
                    marginLeft: 'auto',
                    backgroundColor: '#3b82f61a',
                    padding: '5px 8.5px',
                    borderRadius: '16px',
                    color: '#2563eb',
                    fontWeight: 800,
                    fontSize: '10px',
                  }}>{item.badge}</div>
                )}
              </ListItem>
            ))}
          </Collapse>
        </Menu>
      </Content>
    </SidebarContainer>
  );
};

export default Sidebar;
