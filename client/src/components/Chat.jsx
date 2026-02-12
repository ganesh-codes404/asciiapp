import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './Chat.css';

const socket = io('http://localhost:3000');  // Adjust port if needed

export default function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on('message history', (history) => {
      setMessages(history);
    });

    return () => {
      socket.off('chat message');
      socket.off('message history');
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit('chat message', message);
      setMessage('');
    }
  };

  return (
    <div className="chat-container">
      <ul className="chat-messages">
        {messages.map((msg, idx) => (
          <li key={idx} className="chat-message">{msg}</li>
        ))}
      </ul>

      <form onSubmit={sendMessage} className="chat-form">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="chat-input"
        />
        <button type="submit" className="chat-send">Send</button>
      </form>
    </div>
  );
}
