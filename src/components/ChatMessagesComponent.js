// src/components/ChatMessagesComponent.js
import React, { useState, useEffect, useRef } from 'react';
import { getContentFromReceiver } from '../utils/utils';
import StatusBadgeComponent from './StatusBadgeComponent';
import { doc, getDoc } from "firebase/firestore";
import { firestore, auth } from '../firebasaeConfig';
import { formatDistanceToNow, isToday, isYesterday, isThisWeek, format } from 'date-fns';
import { Box, styled, Typography, Divider } from '@mui/material';
import { groupBy } from 'lodash';
import EmojiPicker from 'emoji-picker-react'; // You can use any emoji picker library


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
const ChatMessagesComponent = ({ selectedUser }) => {
  const [userDetails, setUserDetails] = useState([]);
  const messagesEndRef = useRef(null);
  const [reactions, setReactions] = useState({}); // { messageId: { emoji: count } }
  const [showEmojiPicker, setShowEmojiPicker] = useState(null);
  const { uid, photo, name } = JSON.parse(localStorage.getItem('userInfo'));

  const messageRefs = userDetails.map(() => React.createRef());

  const handleReaction = (messageId, emoji) => {
    firestore.collection('reactions').add({
      messageId,
      emoji,
      userId: uid,  // Replace this with the current user's ID
    });
  };
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [userDetails]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const details = await Promise.all(
        selectedUser.details.map(async (message) => {
          const userDetail = await getUserfromID(message.sender);
          return { ...message, userDetail };
        })
      );
      setUserDetails(details);
    };

    fetchUserDetails();
  }, [selectedUser]);



  useEffect(() => {
    const unsubscribe = firestore.collection('reactions')
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            const reaction = change.doc.data();
            // Set the reactionsRead field of the message to false
            firestore.collection('Messages')
              .where('id', '==', reaction.messageId) // replace 'messageKey' with the actual key you want to compare
              .get()
              .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  doc.ref.set({
                    reactionsRead: false,
                  }, { merge: true });
                });
              });
          }
        });
      });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const getUserfromID = async (id) => {
    const userRef = doc(firestore, "Users", id);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();
    return userData;
  }

  const formatDate = (date) => {
    if (isToday(date)) return 'Today';
    if (isYesterday(date)) return 'Yesterday';
    if (isThisWeek(new Date(date))) return `${formatDistanceToNow(new Date(date), { addSuffix: true })}`;
    return format(date, 'MMMM dd, yyyy');
  };

  const messagesByDate = groupBy(userDetails, message =>
    formatDate(new Date(message.createdAt))
  );

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          firestore.collection('Messages')
              .where('id', '==', userDetails[index]?.id) // replace 'messageKey' with the actual key you want to compare
              .get()
              .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  doc.ref.set({
                    reactionsRead: true,
                  }, { merge: true });
                });
              });
        }
      });
    }, {
      threshold: 1.0
    });
  
    messageRefs.forEach((ref, index) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });
  
    return () => {
      messageRefs.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [userDetails]);

  return (

    <ChatMessages>
      {Object.entries(messagesByDate).map(([date, userDetails]) => (
        <React.Fragment key={date}>
          <Divider>{date}</Divider>
          {userDetails.map((message, idx) => {
            if (message.text !== "") {
              return (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: message.isUser ? 'flex-end' : 'flex-start', margin: '10px 0' }} key={idx}>
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '5px', gap: "1rem" }}>
                    {!message.isUser && <StatusBadgeComponent
                      userStatus={message.userDetail?.status || 'Appear Offline'}
                      avatar1={message.userDetail}
                      openMenu={false}
                      alt={message.userDetail?.name}
                      showCount={false}
                      shrinkedName={getContentFromReceiver(message.userDetail?.name)}
                    />}
                    <div style={{ display: 'flex', flexDirection: 'column', }}>
                      <div className='flex column' style={{ display: 'flex', flexDirection: 'row' }}>
                        {!message.isUser && <Typography variant="body2" style={{ marginLeft: '10px', }}>{message.userDetail?.name}</Typography>}
                        {/* <Typography variant="body2" style={{ marginLeft: '10px', }}>{new Date(message.createdAt).toLocaleTimeString()}</Typography> */}
                        <Typography variant="body2" style={{ marginLeft: '10px', }}>
                          {format(new Date(message.createdAt), 'hh:mm a')}
                        </Typography>
                      </div>
                      <div
                        onMouseEnter={() => setShowEmojiPicker(message.id)}
                        onMouseLeave={() => setShowEmojiPicker(null)}
                        style={{ position: 'relative' }}
                      >
                        <MessageBubble key={idx} ref={messageRefs[idx]}
                          isuser={message.isUser}
                          style={{
                            padding: '10px 20px',
                            borderRadius: '15px',
                            maxWidth: '80%',
                            wordWrap: 'break-word',
                            backgroundColor: message.reactionsRead === false ? 'gray' : 'blue',  // Highlight the message if reactionsRead is false
                          }}>
                          <Typography variant="body2">{message.text}</Typography>
                          {reactions[message.id] && Object.entries(reactions[message.id]).map(([emoji, count]) => (
                            <div key={emoji}>{emoji}: {count}</div>
                          ))}
                        </MessageBubble>
                        {showEmojiPicker === message.id && !message.isUser && (
                          <div style={{ position: 'absolute', zIndex: 1 }}>
                            <EmojiPicker onEmojiClick={(emojiData, event) => {
                              handleReaction(message.id, emojiData.emoji);
                            }} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                </div>
              );
            }
          })}
        </React.Fragment>
      ))}
      <div ref={messagesEndRef} />
    </ChatMessages>

  );
};

export default ChatMessagesComponent;