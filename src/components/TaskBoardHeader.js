import React from 'react';
import { Box, Typography, Avatar, IconButton, Button, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import ListIcon from '@mui/icons-material/List';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import AddIcon from '@mui/icons-material/Add';

// Assets Imports
import editIcon from '../assets/edit.svg';
import timelineIcon from '../assets/line.svg';
import calendarIcon from '../assets/line.svg';
import dashboardIcon from '../assets/line.svg';
import progressIcon from '../assets/line.svg';
import formsIcon from '../assets/line.svg';
import avatar1 from '../assets/avatar.svg';
import avatar2 from '../assets/avatar-2.svg';
import avatar3 from '../assets/avatar-3.svg';
import avatar4 from '../assets/avatar-4.svg';
import lockIcon from '../assets/lock.svg';
import downArrowIcon from '../assets/keyboard-arrow-down.svg';
import twitterIcon from '../assets/twitter-3-1.svg';
import searchIcon from '../assets/icon-4.svg';
import spacerIcon from '../assets/spacer.svg';
import icon5 from '../assets/icon-5.svg';
import icon6 from '../assets/icon-6.svg';
import icon7 from '../assets/icon-7.svg';
import icon8 from '../assets/icon-8.svg';
import icon9 from '../assets/icon-9.svg';

const HeaderContainer = styled(Box)(({ theme }) => ({

}));

const HeadingContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
}));

const TabsContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: '24px',
}));

const Tab = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
}));

const Line = styled('img')({
    width: '100%',
});

const AvatarGroup = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '0px',
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
    cursor: 'pointer',
    width: '40px',
    height: '40px',
    boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.1)',
    color:'#a9a9a9'
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: '40px',
    height: '40px',
    border: '2px solid #fff',
    cursor: 'pointer',
}));
// 'Progress', 'Forms', 'More'
const TaskBoardHeader = () => {
    return (
        <HeaderContainer>
            <HeadingContainer>
                <Box display="flex" alignItems="center" gap="24px">
                    <Typography variant="h4" style={{ fontWeight: 700, color: '#1f2633' }}>
                        Task Boards
                    </Typography>
                    <IconButton>
                        <img src={editIcon} alt="edit" />
                    </IconButton>
                </Box>
                <TabsContainer>
                    {['Timeline', 'Dashboard', 'Calendar'].map((tab, index) => (
                        <Tab key={index}>
                            <Typography
                                style={{
                                    fontWeight: 700,
                                    fontSize: '12px',
                                    color: tab === 'Dashboard' ? '#3b82f6' : '#98a2b2',
                                }}
                            >
                                {tab}
                            </Typography>
                            <Line src={index === 0 ? timelineIcon : index === 1 ? calendarIcon : index === 2 ? dashboardIcon : index === 3 ? progressIcon : index === 4 ? formsIcon : index === 5 ? formsIcon : formsIcon} alt="line" />
                        </Tab>
                    ))}
                </TabsContainer>
                <AvatarGroup>
                    {[avatar1, avatar2, avatar3, avatar4].map((avatar, index) => (
                        <StyledAvatar
                            key={index}
                            src={avatar}
                            alt={`avatar-${index}`}
                            sx={{ marginLeft: index !== 0 && '-12px',
                            boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.1)', }}
                        />
                    ))}
                    <Avatar sx={{ width: '40px', height: '40px', backgroundColor: '#cfcfcf', fontSize: '12px',
    boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.1)', fontWeight: '800', color: '#606c80', marginLeft: '-12px',
    cursor: 'pointer', }}>
                        +5
                    </Avatar>
                    <AddButton sx={{
                          '&:hover,&:focus': {
                            color: '#4e4e4e',
                            backgroundColor: '#b5b5b5'
                          }
                    }}>
                        <AddIcon width="16" height="16" />
                    </AddButton>
                </AvatarGroup>
            </HeadingContainer>
            <Box m={4} display="flex" justifyContent="space-between" alignItems="center" >
                <Box display="flex" alignItems="center" gap="16px">
                    <Box className="asd" display="flex" alignItems="center" gap="0px">
                        <Button
                            variant="outlined"
                            style={{
                                textTransform: 'none',
                                backgroundColor: '#fff',
                                color: '#606c80',
                                borderColor: '#ebeef2',
                                padding: '8px 12px',
                                minHeight: '40px',
                                minWidth: '120px',
                            }}
                            startIcon={React.createElement(DashboardCustomizeIcon)}
                        >
                            Board View
                        </Button>
                        <Button
                            variant="outlined"
                            style={{
                                textTransform: 'none',
                                backgroundColor: '#fff',
                                color: '#606c80',
                                borderColor: '#ebeef2',
                                padding: '8px 12px',
                                minHeight: '40px',
                                minWidth: '120px',
                            }}
                            startIcon={React.createElement(ListIcon)}
                        >
                            List View
                        </Button>
                    </Box>
                    {/* <Box display="flex" alignItems="center" gap="8px">
                        <img src={lockIcon} alt="lock" />
                        <Typography style={{ color: '#98a2b2' }}>Limited Access</Typography>
                        <img src={downArrowIcon} alt="down arrow" />
                    </Box>
                    <Box display="flex" alignItems="center" gap="16px">
                        <Avatar src={twitterIcon} alt="twitter" />
                        <Typography style={{ color: '#606c80' }}>Twitter Team</Typography>
                    </Box> */}
                </Box>
                <Box display="flex" alignItems="center" gap="24px">
                    <TextField
                        placeholder="Search Tasks"
                        variant="outlined"
                        size="small"
                        InputProps={{
                            startAdornment: <img src={spacerIcon} alt="spacer" />,
                            style: { padding: '0 0 0 10px' },
                        }}
                        style={{ backgroundColor: '#fff', borderRadius: '8px' }}
                    />
                    {/* <Box display="flex" gap="8px">
                        {[icon5, icon6, icon7, icon8, icon9].map((icon, index) => (
                            <Button
                                key={index}
                                variant="contained"
                                style={{ backgroundColor: '#fff', boxShadow: 'none', minWidth: 'unset', padding: '8px', borderRadius: '8px' }}
                            >
                                <img src={icon} alt={`icon-${index}`} />
                            </Button>
                        ))}
                    </Box> */}
                </Box>
            </Box>
        </HeaderContainer>
    );
};

export default TaskBoardHeader;
