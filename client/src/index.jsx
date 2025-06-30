import React from 'react';
import ReactDOM from 'react-dom/client';
import NavBar from './components/NavBar';
import Terminal from './components/Terminal';
import './index.css';

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-1 p-4 text-asciiGreen">
        <h1 className="text-3xl mb-4">Welcome to ASCII Social Hub</h1>
        {/* Main view area will switch based on menu later */}
      </div>
      <Terminal />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
