// import React from 'react';

// export default function Home() {
//   return (
//     <div style={{
//       color: '#00FF00',
//       fontFamily: 'monospace',
//       padding: '2rem',
//       textAlign: 'center'
//     }}>
//       <h1>Welcome to ASCII Social Hub</h1>
//       <p>This is your personalized, terminal-inspired social space.</p>
//       <p>Use the navigation above to explore chats, music, terminal, and more.</p>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import "./Home.css";

export default function Home() {
  const [feed, setFeed] = useState([]);

  const fetchFeed = async () => {
    try {
      const res = await fetch("http://localhost:3002/feed");
      const data = await res.json();
      setFeed(data);
    } catch (err) {
      console.error("Error fetching feed:", err);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    <div className="feed-container">
      <h1>ASCII Social Feed</h1>
      <button onClick={fetchFeed}>Reload Feed</button>
      
      <div className="feed-grid">
        {feed.map((post, idx) => (
          <div key={idx} className="feed-item">
            <img src={post.image} alt="Post" />
            <p>{post.title}</p>
            <p>^ {post.likes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
