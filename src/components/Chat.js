import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import { firestore, auth } from '../firebasaeConfig';
import { addDoc, collection, collectionGroup, getDocs, setDoc, doc } from "firebase/firestore";

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const unsubscribe = firestore.collection('Events').onSnapshot(
            (snapshot) => {
                const eventsData = [];
                snapshot.forEach((doc) => {
                    eventsData.push({ id: doc.id, ...doc.data() });
                });
                setEvents(eventsData);
                console.log("Fetched events:", eventsData);
                console.log('events',events)
            },
            (error) => {
                console.error("Error fetching events:", error);
            }
        );
        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    const addEvent = async (e) => {
        e.preventDefault();
        try {
            await firestore.collection('Events').add({
                name: 'Cricket Fiesta',
                date: new Date(),
                location: 'Stadium XYZ',
            });
            console.log('Event added successfully!');
        } catch (error) {
            console.error('Error adding event: ', error);
        }
    };

    return (
        <div>
            {events.map((event) => (
                <div key={event.id}>
                    <p>{event.name}</p>
                    <p>{event.location} - {new Date(event.date).toDateString()}</p>
                </div>
            ))}
            <form onSubmit={addEvent}>
                <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default Chat;