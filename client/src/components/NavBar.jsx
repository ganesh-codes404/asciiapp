// import React from 'react';

// export default function Navbar() {
//   return (
//     <nav style={{
//       width: '100%',
//       backgroundColor: '#111',
//       color: '#00FF00',
//       padding: '1rem',
//       display: 'flex',
//       justifyContent: 'space-around',
//       fontFamily: 'monospace'
//     }}>
//       <a href="#" style={{ color: '#00FF00', textDecoration: 'none' }}>Home</a>
//       <a href="#" style={{ color: '#00FF00', textDecoration: 'none' }}>Chat</a>
//       <a href="#" style={{ color: '#00FF00', textDecoration: 'none' }}>Skribble</a>
//       <a href="#" style={{ color: '#00FF00', textDecoration: 'none' }}>Terminal</a>
//       <a href="#" style={{ color: '#00FF00', textDecoration: 'none' }}>Journal</a>
//       <a href="#" style={{ color: '#00FF00', textDecoration: 'none' }}>Music</a>
//       <a href="#" style={{ color: '#00FF00', textDecoration: 'none' }}>Settings</a>
//     </nav>
//   );
// }
import React from 'react';

export default function Navbar({ setActivePage }) {
  const linkStyle = {
    background: 'none',
    border: 'none',
    color: '#00FF00',
    cursor: 'pointer',
    fontFamily: 'monospace',
    fontSize: '1rem',
    margin: '0 0.5rem',

  };

  return (
    <nav style={{
      width: '100%',
      backgroundColor: '#00000',
      color: '#00FF00',
      padding: '1rem',
      display: 'flex',
      justifyContent: 'center',
      fontFamily: 'monospace',
      position:'sticky',
      top:'0',
      right:'0',
      zIndex:'1000',
      }
      
    }>
      <button style={linkStyle} onClick={() => setActivePage('home')}>Home</button>
      <button style={linkStyle} onClick={() => setActivePage('chat')}>Chat</button>
      <button style={linkStyle} onClick={() => setActivePage('skribble')}>Skribble</button>
      <button style={linkStyle} onClick={() => setActivePage('terminal')}>Terminal</button>
      <button style={linkStyle} onClick={() => setActivePage('journal')}>Journal</button>
      <button style={linkStyle} onClick={() => setActivePage('music')}>Music</button>
      <button style={linkStyle} onClick={() => setActivePage('settings')}>Settings</button>
    </nav>
  );
}

