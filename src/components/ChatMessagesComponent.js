// src/components/ChatMessagesComponent.js
import React from 'react';
import { Box, styled, Typography } from '@mui/material';

const ChatMessages = styled(Box)({
  flexGrow: 1,
  overflowY: 'auto',
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'scroll',
  maxHeight: 'calc(100vh - 280px)',
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
const ChatMessagesComponent = ({ selectedUser, messagesEndRef }) => {
  return (
    <ChatMessages ref={messagesEndRef}>
      {selectedUser && selectedUser?.details?.map((detail, index) => (
        <React.Fragment key={index}>
          {detail.messages.map((message, idx) => (
            <MessageBubble key={idx} isuser={message.isUser}>
              <Typography variant="body2">{message.text}</Typography>
            </MessageBubble>
          ))}
        </React.Fragment>
      ))}
    </ChatMessages>
  );
};

export default ChatMessagesComponent;