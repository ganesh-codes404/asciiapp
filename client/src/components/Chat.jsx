import React, { useState, useEffect } from 'react';
import './Chat.css';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [activeUser, setActiveUser] = useState('General');

  const dummyUsers = [
    { name: 'A', pfp: '' },
    { name: 'B', pfp: '' },
    { name: 'C', pfp: '' },
    { name: 'D', pfp: '' },
    { name: 'E', pfp: '' }
  ];

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages([...messages, { text: input, sender: 'You', to: activeUser }]);
    setInput('');

    // Simulated response
    setTimeout(() => {
      setMessages(prev => [...prev, { text: `Echo: ${input}`, sender: activeUser, to: 'You' }]);
    }, 500);
  };

  return (
    <div className="chat-wrapper">
      <div className="sidebar">
        <h3>Contacts</h3>
        {dummyUsers.map((user, idx) => (
          <div 
            key={idx} 
            className={`user ${activeUser === user.name ? 'active' : ''}`} 
            onClick={() => setActiveUser(user.name)}
          >
            <div className="pfp"></div>
            <span>{user.name}</span>
          </div>
        ))}
      </div>

      <div className="chat-container">
        <div className="chat-header">Chatting with: {activeUser}</div>

        <div className="chat-box">
          {messages
            .filter(msg => msg.to === activeUser || msg.sender === activeUser)
            .map((msg, idx) => (
              <div key={idx} className={`chat-message ${msg.sender === 'You' ? 'you' : 'bot'}`}>
                <strong>{msg.sender}:</strong> {msg.text}
              </div>
            ))}
        </div>

        <form className="chat-input" onSubmit={sendMessage}>
          <input 
            type="text" 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder="Type message..." 
            autoFocus 
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}
