import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Box, Avatar, Badge, styled, IconButton, Typography, TextField, Button, List, ListItem, ListItemAvatar, ListItemText, Menu, MenuItem, CircularProgress, InputAdornment, ListItemButton, Popper, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { firestore, auth } from '../firebasaeConfig';

// Import SVG assets 
import statusBusy from '../assets/status-busy.svg';

// Import avatar images
import avatar1 from '../assets/avatar.svg';

import { hslToHex, getRandomLightColor, getRandomDarkColor, getContentFromReceiver, convertUTCtoLocal } from '../utils/utils';
import AvatarComponent from './AvatarComponent';
import ChatInputComponent from './ChatInputComponent';
import ChatMessagesComponent from './ChatMessagesComponent';
import SearchComponent from './SearchComponent';
import StatusBadgeComponent from './StatusBadgeComponent';
import StatusMenuComponent from './StatusMenuComponent';
import useCurrentUser from '../auth/useCurrentUser';

// Styled components
const SidebarContainer = styled(Box)(({ expanded }) => ({
  width: expanded ? 'calc(100% - 250px)' : '88px',
  height: '100vh',
  backgroundColor: '#FFFFFF',
  borderLeft: '1px solid #e9ebf0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '0',
  transition: 'width 0.3s ease',
  overflowX: 'hidden',
  boxShadow: expanded ? '-5px 0 15px rgba(0, 0, 0, 0.1)' : 'none',
  position: 'fixed',
  top: 0,
  right: 0,
  zIndex: 2,
}));

const AvatarContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '16px',
  maxHeight: 'calc(100vh - 300px)',
  width: '100%',
  marginTop: '2rem',
  position: 'relative',
  height: '100vh',
  justifyContent: 'center',
});

const StyledAvatar = styled(Avatar)({
  width: '32px',
  height: '32px',
  cursor: 'pointer',
});

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

const ChatContainer = styled(Box)({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
});

const ChatComponentParent = styled(Box)({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
});

const ChatHeader = styled(Box)({
  padding: '16px',
  borderBottom: '1px solid #e9ebf0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const MessageBubble = styled(Box)(({ isuser }) => ({
  maxWidth: '70%',
  padding: '8px 12px',
  borderRadius: '12px',
  marginBottom: '8px',
  backgroundColor: isuser ? '#3b82f6' : '#f3f4f6',
  color: isuser ? '#ffffff' : '#1f2937',
  alignSelf: isuser ? 'flex-end' : 'flex-start',
}));

const ChatMessages = styled(Box)({
  flexGrow: 1,
  overflowY: 'auto',
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'scroll',
  maxHeight: 'calc(100vh - 280px)',
});

const ChatInput = styled(Box)({
  padding: '16px',
  borderTop: '1px solid #e9ebf0',
  display: 'flex',
  alignItems: 'center',
  bottom: 0,
  position: 'absolute',
  width: '-webkit-fill-available',
  background: 'white',
  boxShadow: '0px 0px 10px 0px #cbcbcb',
});

const ChatSummaryContainer = styled(Box)({
  width: '250px',
  overflowY: 'scroll',
  marginBottom: '57px',
});

const MessagesContainer = styled(Box)({
  width: '100%',
  height: '100%',
});

const ChatSideBar = () => {
  const [expanded, setExpanded] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [userStatus, setUserStatus] = useState('Available');
  const [anchorEl, setAnchorEl] = useState(null);
  const [messages, setMessages] = useState([]);
  const [avatars, setAvatars] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [users, setUsers] = useState([]);
  const messagesEndRef = useRef(null);
  const searchAnchorRef = useRef(null); // Ref for Popper

  const { uid, photoURL, name } = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    if (Notification.permission === 'default') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          console.log('Notification permission granted.');
        }
      });
    }
  }, []);

  useEffect(() => {
    const unsubscribe = firestore.collection('Messages').onSnapshot(
      (snapshot) => {
        const eventsData = [];
        snapshot.forEach((doc) => {
          eventsData.push({ id: doc.id, ...doc.data() });
        });
        setMessages(eventsData);
      },
      (error) => {
        console.error("Error fetching events:", error);
      }
    );
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const data = manipulateData();
    setAvatars(data);
    setSelectedUser(data[0]);

    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }

    data.forEach((avatar) => {
      avatar.details.forEach((detail) => {
        const latestMessage = detail.messages[detail.messages.length - 1];
        if (latestMessage.sender !== uid && new Date(latestMessage.createdAt) > new Date(getLastReadTimestamp(latestMessage.sender))) {
          new Notification(latestMessage.sender, {
            body: latestMessage.text,
            icon: latestMessage.photoURL || avatar1,
          });
        }
      });
    });
  }, [messages]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages, selectedUser]);

  const handleExpand = useCallback(() => {
    setExpanded(true);
    setSelectedUser(avatars[0]);
  }, [avatars]);

  const handleAvatarClick = useCallback((avatar) => {
    setSelectedUser(avatar);
    setExpanded(true);
    markAllAsRead(avatar.contact);
  }, []);

  const handleClose = () => {
    setExpanded(false);
    setSelectedUser(null);
  };

  const sendMessage = useCallback(async (e) => {
    e.preventDefault();

    if (!selectedUser || !selectedUser.contact) {
      console.error('No user selected or user contact is missing.');
      return;
    }

    try {
      await firestore.collection('Messages').add({
        id: uuidv4(),
        text: messageInput,
        createdAt: new Date().toISOString(),
        photoURL: photoURL || null,
        reciever: selectedUser.contact,
        sender: uid,
        group: false
      });
    } catch (error) {
      console.error('Error adding event: ', error);
    }
    setMessageInput('');
  }, [messageInput, selectedUser, uid, photoURL]);

  const manipulateData = useCallback(() => {
    const output = [];
    const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};
    userInfo.lastReadTimestamps = userInfo.lastReadTimestamps || {};

    messages?.forEach((msg) => {
      if (msg.reciever !== name && msg.sender !== uid) {
        return;
      }

      const contactName = msg.sender === uid ? msg.reciever : msg.sender;
      const sender = msg.sender;

      const lastRead = new Date(userInfo.lastReadTimestamps[contactName] || 0);

      let unreadCount = output.find((op) => op.contact === contactName)
        ? output.find((op) => op.contact === contactName).unreadCount
        : 0;

      if (msg.sender !== uid && new Date(msg.createdAt) > lastRead) {
        unreadCount++;
      }

      const foundEntry = output.find((op) => op.contact === contactName);

      const newDetail = {
        id: msg.id,
        group: msg.group,
        photoURL: msg.photoURL,
        createdAt: msg.createdAt,
        sender: msg.sender,
        text: msg.text,
        isUser: msg.sender === uid,
      };

      if (foundEntry) {
        const senderEntry = foundEntry.details.find((d) => d.sender === sender);
        if (senderEntry) {
          senderEntry.messages.push(newDetail);
          senderEntry.messages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        } else {
          foundEntry.details.push({
            sender: sender,
            messages: [newDetail],
          });
        }
        foundEntry.lastMessage = newDetail.text;
        foundEntry.unreadCount = unreadCount;
      } else {
        output.push({
          contact: contactName,
          lastMessage: newDetail.text,
          content: msg.photoURL || getContentFromReceiver(contactName),
          bgColor: getRandomLightColor(),
          color: getRandomDarkColor(),
          details: [
            {
              sender: sender,
              messages: [newDetail],
            },
          ],
          unreadCount,
        });
      }
    });

    output.sort(
      (a, b) =>
        new Date(b.details[b.details.length - 1].messages[b.details[b.details.length - 1].messages.length - 1].createdAt) - new Date(a.details[a.details.length - 1].messages[a.details[a.details.length - 1].messages.length - 1].createdAt),
    );
    return output;
  }, [messages, uid, name]);

  const getLastReadTimestamp = (contactName) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};
    userInfo.lastReadTimestamps = userInfo.lastReadTimestamps || {};
    return userInfo.lastReadTimestamps[contactName] || 0;
  };

  const markAllAsRead = (contactName) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};
    userInfo.lastReadTimestamps = userInfo.lastReadTimestamps || {};
    userInfo.lastReadTimestamps[contactName] = new Date().toISOString();
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  };

  const updateUserStatus = useCallback(async (status) => {
    console.log(useCurrentUser.currentUser)
    const userId = useCurrentUser.currentUser.uid; // Assuming you have the current user's ID
    try {
      await firestore.collection('UserStatus').doc(userId).set({
        status: status,
        timestamp: new Date(),
      }, { merge: true });
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  }, []);

  useEffect(() => {
    console.log(useCurrentUser)
    const userId = useCurrentUser.uid; // Assuming you have the current user's ID
    const unsubscribe = firestore.collection('UserStatus').doc(userId)
      .onSnapshot(docSnapshot => {
        const data = docSnapshot.data();
        if (data) {
          setUserStatus(data.status);
        }
      }, err => {
        console.error(`Encountered error: ${err}`);
      });
  
    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []);

  const handleStatusMenuOpen = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleSearchChange = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.length > 1) {
      setSearching(true);
      try {
        const usersSnapshot = await firestore.collection('Users').get();
        const usersData = usersSnapshot.docs.map((doc) => doc.data());
        const filteredUsers = usersData.filter((user) =>
          user.name.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(filteredUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setSearching(false);
      }
    } else {
      setSearchResults([]);
    }
  };


  const handleUserClick = (user) => {
    setSelectedUser({
      contact: user.name,
      content: user.photo || avatar1,
      bgColor: getRandomLightColor(),
      color: getRandomDarkColor(),
      details: [],
      unreadCount: 0,
    });
    setSearchQuery('');
    setSearchResults([]);
  };


  const handleStatusMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);
  
  useEffect(() => {
    const fetchAndUpdateUserStatuses = async () => {
      const updatedAvatars = await Promise.all(avatars.map(async (avatar) => {
        const statusSnapshot = await firestore.collection('UserStatus').doc(avatar.uid).get();
        const status = statusSnapshot.exists ? statusSnapshot.data().status : 'Offline';
        return { ...avatar, status }; // Add the status to the avatar object
      }));
      setAvatars(updatedAvatars); // Update the avatars state with the new information
    };
  
    fetchAndUpdateUserStatuses();
    //console.log(avatars)
  }, [avatars]); 

// Step 3: Integrate with Existing Code
// Modify the handleStatusChange function to use the updateUserStatus function
const handleStatusChange = useCallback((status) => {
  updateUserStatus(status);
  handleStatusMenuClose();
}, [updateUserStatus, handleStatusMenuClose]);

  const statusOptions = useMemo(() => [
    'Available', 'Busy', 'Do Not Disturb', 'In a Call', 'Be Right Back', 'Appear Away', 'Appear Offline'
  ], []);


  return (
    <SidebarContainer expanded={expanded}>
      {!expanded ? (
        <>
          <Box py={3} style={{ position: 'fixed', top: 0, zIndex: 1000, backgroundColor: '#fff', width: '4.5rem' }}>
            <ArrowBackIcon onClick={handleExpand} />
          </Box>
          <Box my={10}>
            <StatusBadgeComponent
              userStatus={userStatus}
              avatar1={avatar1}
              handleStatusMenuOpen={handleStatusMenuOpen}
              openMenu={true}
              alt={`Avatar`} />
            <StatusMenuComponent anchorEl={anchorEl} handleStatusMenuClose={handleStatusMenuClose} statusOptions={statusOptions} handleStatusChange={handleStatusChange} />

            <AvatarContainer>
              {avatars.map((avatar, index) => (
                <Box key={index} position="relative" onClick={() => handleAvatarClick(avatar)}>
                  <StatusBadgeComponent
                    userStatus={avatar.status || 'Appear Offline'}
                    avatar1={avatar}
                    openMenu={false}
                    alt={`Avatar ${index + 1}`} />

                  {avatar.unreadCount > 0 && (
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
                      {avatar.unreadCount}
                    </Box>
                  )}
                  {avatar.status === 'busy' && (
                    <Box
                      position="absolute"
                      bottom="0"
                      right="0"
                      width="10px"
                      height="10px"
                    >
                      <img src={statusBusy} alt="Busy" style={{ width: '100%', height: '100%' }} />
                    </Box>
                  )}
                </Box>
              ))}
            </AvatarContainer>

          </Box>
        </>
      ) : (
        <ChatContainer>
          <ChatHeader>
            <Box display="flex" alignItems="center">
              <StatusBadgeComponent
                userStatus={userStatus}
                avatar1={avatar1}
                openMenu={false}
                alt={`Avatar`} />
              <Typography variant="h6">Chats</Typography>
            </Box>
            <Box display="flex" alignItems="center" flexGrow={1}>  {/* Line Updated */}
              <div ref={searchAnchorRef} style={{ width: "100%", margin: "0 16px" }}>
                <SearchComponent searchQuery={searchQuery} handleSearchChange={handleSearchChange} /> {/* Line Updated */}
              </div>


              <Popper open={searchQuery.length > 1}
                anchorEl={searchAnchorRef.current} placement="bottom" style={{ zIndex: 1300, width: '50%' }}>
                <Paper>
                  <List dense>
                    {searchResults.map((user) => (
                      <ListItemButton key={user.uid} onClick={() => handleUserClick(user)}>
                        <ListItemAvatar>
                          <Avatar src={user.photo || avatar1} alt={user.name}>
                            {user.name[0]}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={user.name} secondary={user.email} />
                      </ListItemButton>
                    ))}
                    {searching && (
                      <Box display="flex" justifyContent="center" alignItems="center" p={2}>
                        <CircularProgress size={24} />
                      </Box>
                    )}
                  </List>
                </Paper>
              </Popper>
            </Box>
            <Box display="flex" alignItems="center">
              <IconButton onClick={handleStatusMenuOpen}>
                <MoreVertIcon />
              </IconButton>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton></Box>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleStatusMenuClose}
            >
              {statusOptions.map((status) => (
                <MenuItem key={status} onClick={() => handleStatusChange(status)}>
                  {status}
                </MenuItem>
              ))}
            </Menu>
          </ChatHeader>
          <ChatComponentParent>
            <ChatSummaryContainer>
              <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {avatars.map((avatar, index) => (
                  <ListItem key={index} alignItems="flex-start" button onClick={() => handleAvatarClick(avatar)}>
                    <ListItemAvatar>
                      <StatusBadgeComponent
                        userStatus={avatar.status || 'Appear Offline'}
                        avatar1={avatar1}
                        openMenu={false}
                        alt={avatar.reciever} />

                      {avatar.unreadCount > 0 && (
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
                          {avatar.unreadCount}
                        </Box>
                      )}
                    </ListItemAvatar>
                    <ListItemText
                      primary={avatar.reciever}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {avatar.lastMessage}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </ChatSummaryContainer>
            <MessagesContainer>
              <ChatHeader>
                <Box display="flex" alignItems="center">
                  <AvatarComponent avatar={selectedUser} alt={selectedUser?.contact} />
                  <Typography variant="h6">{selectedUser?.contact}</Typography>
                </Box>
              </ChatHeader>
              <ChatMessagesComponent selectedUser={selectedUser} messagesEndRef={messagesEndRef} />

              <ChatInputComponent messageInput={messageInput} setMessageInput={setMessageInput} sendMessage={sendMessage} />
            </MessagesContainer>
          </ChatComponentParent>
        </ChatContainer>
      )}
    </SidebarContainer>
  );
};

export default ChatSideBar;

