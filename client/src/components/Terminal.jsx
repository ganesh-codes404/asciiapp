import React, { useState } from 'react';
import "./Terminal.css";

export default function Terminal({ setActivePage }) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);
  const [messages, setMessages] = useState([]); 
  const [loading, setLoading] = useState(false)

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
    else if (cmd.startsWith('/llm')) {
      const prompt = cmd.slice(5).trim();
      if (!prompt) return;
      setLoading(true)
    
      try {
        console.log("Sending request to Together API...");
    
        const response = await fetch("https://api.together.xyz/v1/chat/completions", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": "Bearer API_KEY"
          },
          body: JSON.stringify({
            model: "deepseek-ai/DeepSeek-V3",
            messages: [{ role: "user", content: `${prompt} \nRespond only in plain ASCII text. Preserve all whitespace(only for codes), line breaks, tabs. Avoid markdown, unicode, or emojis.` }],
            max_tokens: 1000,
            temperature: 0.7,
          }),
        });
    
        const data = await response.json();
        console.log("API Response:", data);
    
        const aiResponse = data?.choices?.[0]?.message?.content || "No response.";
        setMessages(prev => [...prev, { role: "user", content: prompt }, { role: "ai", content: aiResponse }]);
        setOutput(prev => [...prev, `$${temp}`, aiResponse]);
        
      } catch (error) {
        console.error("Fetch Error:", error);
        setMessages(prev => [...prev, { role: "user", content: prompt }, { role: "ai", content: "Error fetching response." }]);
        setOutput(prev => [...prev, `$${temp}`, "Error fetching response."]);
      }
    
      setInput('');
      setLoading(false);
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
  {/* {output.map((line, idx) => (
    <pre key={idx} className="terminal-output">{line}</pre>
  ))} */}

      <form onSubmit={handleCommand} className="terminal-form">
        <span>$</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="terminal-input"
          autoFocus
        />
            {loading && (
  <div className="terminal-output blink">
    AI is thinking...
  </div>

)}
      </form>
    </div>
  );
}
