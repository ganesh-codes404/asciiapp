// import React, { useState, useEffect } from 'react';
// import './Chat.css';

// export default function Chat() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [activeUser, setActiveUser] = useState('General');

//   const dummyUsers = [
//     { name: 'A', pfp: '' },
//     { name: 'B', pfp: '' },
//     { name: 'C', pfp: '' },
//     { name: 'D', pfp: '' },
//     { name: 'E', pfp: '' }
//   ];

//   const sendMessage = (e) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     setMessages([...messages, { text: input, sender: 'You', to: activeUser }]);
//     setInput('');

//     // Simulated response
//     setTimeout(() => {
//       setMessages(prev => [...prev, { text: `Echo: ${input}`, sender: activeUser, to: 'You' }]);
//     }, 500);
//   };

//   return (
//     <div className="chat-wrapper">
//       <div className="sidebar">
//         <h3>Contacts</h3>
//         {dummyUsers.map((user, idx) => (
//           <div 
//             key={idx} 
//             className={`user ${activeUser === user.name ? 'active' : ''}`} 
//             onClick={() => setActiveUser(user.name)}
//           >
//             <div className="pfp"></div>
//             <span>{user.name}</span>
//           </div>
//         ))}
//       </div>

//       <div className="chat-container">
//         <div className="chat-header">Chatting with: {activeUser}</div>

//         <div className="chat-box">
//           {messages
//             .filter(msg => msg.to === activeUser || msg.sender === activeUser)
//             .map((msg, idx) => (
//               <div key={idx} className={`chat-message ${msg.sender === 'You' ? 'you' : 'bot'}`}>
//                 <strong>{msg.sender}:</strong> {msg.text}
//               </div>
//             ))}
//         </div>

//         <form className="chat-input" onSubmit={sendMessage}>
//           <input 
//             type="text" 
//             value={input} 
//             onChange={(e) => setInput(e.target.value)} 
//             placeholder="Type message..." 
//             autoFocus 
//           />
//           <button type="submit">Send</button>
//         </form>
//       </div>
//     </div>
//   );
// }
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
