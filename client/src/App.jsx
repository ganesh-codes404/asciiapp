// import React from 'react';
// import Navbar from './components/NavBar';
// import Terminal from './components/Terminal';
// import Home from './components/Home';

// export default function App() {
//   return (
//     <div>
//       <Navbar />
//       <div style={{ padding: '5rem', color: '#00FF00', fontFamily: 'monospace',background:"black"  }}>
//         <h1>Welcome to ASCII Social Hub</h1>
//         <Terminal/>
//       </div>
//     </div>
//   );
// }
// import React, { useState } from 'react';
// import Navbar from './components/NavBar';
// import Terminal from './components/Terminal';
// import Home from './components/Home';

// export default function App() {
//   const [activePage, setActivePage] = useState('home');

//   return (
//     <div>
//       <Navbar setActivePage={setActivePage} />
      
//       {activePage === 'home' && <Home />}
//       {activePage === 'terminal' && <Terminal />}
//     </div>
//   );
// }

// import React, { useState } from 'react';
// import Navbar from './components/NavBar';
// import Home from './components/Home';
// import Chat from './components/Chat';
// import Skribble from './components/skribble';
// import Terminal from './components/Terminal';
// import Journal from './components/journal';
// import Music from './components/Music';
// import Settings from './components/Settings';

// export default function App() {
//   const [activePage, setActivePage] = useState('home');

//   return (
//     <div>
//       <Navbar setActivePage={setActivePage} />

//       {activePage === 'home' && <Home />}
//       {activePage === 'chat' && <Chat />}
//       {activePage === 'skribble' && <Skribble />}
//       {activePage === 'terminal' && <Terminal />}
//       {activePage === 'journal' && <Journal />}
//       {activePage === 'music' && <Music />}
//       {activePage === 'settings' && <Settings />}
//     </div>
//   );
// }
// import React, { useState } from 'react';
// import Navbar from './components/NavBar';
// import Home from './components/Home';
// import Chat from './components/Chat';
// import Skribble from './components/skribble';
// import Terminal from './components/Terminal';
// import Journal from './components/journal';
// import Music from './components/Music';
// import Settings from './components/Settings';

// export default function App() {
//   const [activePage, setActivePage] = useState('home');

//   return (
//     <div>
//       <Navbar setActivePage={setActivePage} />
//       <div style={{ marginTop: '60px' }}>
//       {activePage === 'home' && <Home />}
//       {activePage === 'chat' && <Chat />}
//       {activePage === 'skribble' && <Skribble />}
//       {activePage === 'terminal' && <Terminal />}
//       {activePage === 'journal' && <Journal />}
//       {activePage === 'music' && <Music />}
//       {activePage === 'settings' && <Settings />}
//     </div>
//     </div>
//   );
// }
import React, { useState, useRef, useEffect } from 'react';
import Navbar from './components/NavBar';
import Home from './components/Home';
import Chat from './components/Chat';
import Skribble from './components/skribble';
import Terminal from './components/Terminal';
import Journal from './components/journal';
import Music from './components/Music';
import Settings from './components/Settings';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [trackUrl, setTrackUrl] = useState(null);
  const audioRef = useRef();

  useEffect(() => {
    if (currentTrack) {
      const url = URL.createObjectURL(currentTrack);
      setTrackUrl(url);

      return () => {
        URL.revokeObjectURL(url); // Cleanup old URL
      };
    }
  }, [currentTrack]);

  return (
    <div>
      <Navbar setActivePage={setActivePage} />

      {trackUrl && (
  <audio
    src={trackUrl}
    controls
    autoPlay
    loop
    style={{
      position: 'fixed',
      bottom: '10px',
      left: '10px',
      zIndex: 999,
      background: 'black',
      border: '1px solid #00FF00',
    }}
  />
)}


      <div style={{ marginTop: '60px' }}>
        {activePage === 'home' && <Home />}
        {activePage === 'chat' && <Chat />}
        {activePage === 'skribble' && <Skribble />}
        {activePage === 'terminal' && <Terminal />}
        {activePage === 'journal' && <Journal />}
        {activePage === 'music' && (
          <Music
            tracks={tracks}
            setTracks={setTracks}
            currentTrack={currentTrack}
            setCurrentTrack={setCurrentTrack}
          />
        )}
        {activePage === 'settings' && <Settings />}
      </div>
    </div>
  );
}
