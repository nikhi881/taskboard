import React from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { styled } from '@mui/material/styles';

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

const ChatInputComponent = ({ messageInput, setMessageInput, sendMessage, selectedUser }) => {

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
        sendMessage(event,selectedUser)
    }
}

  return (
    <ChatInput>
      <TextField
        variant="outlined"
        placeholder="Type a message..."
        sx={{ mr: 2 }}
        fullWidth
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        onKeyDown={handleKeyDown}
      // additional props
      />
      <IconButton onClick={(e) => sendMessage(e,selectedUser)}>
        <SendIcon />
      </IconButton>
    </ChatInput>
  );
};

export default ChatInputComponent;