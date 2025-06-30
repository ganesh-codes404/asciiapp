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
import React, { useState } from 'react';
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

  return (
    <div>
      <Navbar setActivePage={setActivePage} />
      <div style={{ marginTop: '60px' }}>
      {activePage === 'home' && <Home />}
      {activePage === 'chat' && <Chat />}
      {activePage === 'skribble' && <Skribble />}
      {activePage === 'terminal' && <Terminal />}
      {activePage === 'journal' && <Journal />}
      {activePage === 'music' && <Music />}
      {activePage === 'settings' && <Settings />}
    </div>
    </div>
  );
}
