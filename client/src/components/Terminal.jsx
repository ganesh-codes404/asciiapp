import React, { useState } from 'react';
import "./Terminal.css";

export default function Terminal({ setActivePage }) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);

  const handleCommand = async (e) => {
    e.preventDefault();
    const temp = input;
    const input_cmd = input.trim();
    const cmd = input_cmd.toLowerCase();
    let response = '';

    if (cmd === 'help') {
      response = 'Available commands: help, clear, algo-status, /search [query]';
    } else if (cmd === 'clear') {
      setOutput([]);
      setInput('');
      return;
    } else if (cmd === 'algo-status') {
      response = 'Your feed algorithm is currently set to: Neutral. Use commands to modify.';
    } else if (cmd.startsWith('/search')) {
      const query = cmd.slice(8);
      response = 'Searching...';
      setOutput(prev => [...prev, `$${temp}`, response]);

      try {
        const res = await fetch(`http://localhost:3001/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setOutput(prev => [...prev, data.extract || 'No information found.']);
      } catch {
        setOutput(prev => [...prev, 'Error fetching data.']);
      }

      setInput('');
      return;
    } 
    else {
      response = `Unknown command: ${temp}. Type 'help' for options.`;
    }

    setOutput([...output, `$${temp}`, response]);
    setInput('');
  };

  return (
    <div className="terminal-container">
      {output.map((line, idx) => (
        <div key={idx} className="terminal-output">{line}</div>
      ))}

      <form onSubmit={handleCommand} className="terminal-form">
        <span>$</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="terminal-input"
          autoFocus
        />
      </form>
    </div>
  );
}
