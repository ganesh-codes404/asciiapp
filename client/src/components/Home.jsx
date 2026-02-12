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
// import React, { useEffect, useState } from "react";
// import "./Home.css";

// export default function Home() {
//   const [feed, setFeed] = useState([]);

//   const fetchFeed = async () => {
//     try {
//       const res = await fetch("http://localhost:3002/feed");
//       const data = await res.json();
//       setFeed(data);
//     } catch (err) {
//       console.error("Error fetching feed:", err);
//     }
//   };

//   useEffect(() => {
//     fetchFeed();
//   }, []);

//   return (
//     <div className="feed-container">
//       <h1>ASCII Social Meida App</h1>
//       <button onClick={fetchFeed}>Reload Feed</button>
      
//       <div className="feed-grid">
//         {feed.map((post, idx) => (
//           <div key={idx} className="feed-item">
//             <img src={post.image} alt="Post" />
//             <p>{post.title}</p>
//             <p>^ {post.likes}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import "./Home.css";

export default function Home() {
  const [feed, setFeed] = useState([]);
const [title, setTitle] = useState("");
const [image, setImage] = useState("");

  // Fetch existing posts from backend
  const fetchFeed = async () => {
    try {
      const res = await fetch("http://localhost:3001/feed");
      const data = await res.json();
      setFeed(data);
    } catch (err) {
      console.error("Error fetching feed:", err);
    }
  };
  const createPost = async () => {
    console.log("Posting...");
  try {
    await fetch("http://localhost:3001/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, image }),
    });

    setTitle("");
    setImage("");
  } catch (err) {
    console.error("Error creating post:", err);
  }
};


  useEffect(() => {
    // 1️⃣ Load initial feed
    fetchFeed();

    // 2️⃣ Connect WebSocket for real-time updates
    const ws = new WebSocket("ws://localhost:3001");

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      try {
        const newPost = JSON.parse(event.data);
        console.log("New post received:", newPost);

        // Add new post to top of feed
        setFeed((prev) => [newPost, ...prev]);
      } catch (err) {
        console.error("Invalid WS message:", err);
      }
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };

    // Cleanup when component unmounts
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="feed-container">
      <h1>ASCII Social Media App</h1>
      <button onClick={fetchFeed}>Reload Feed</button>

      <div className="feed-grid">
        {feed.map((post) => (
          <div key={post.id} className="feed-item">
            <img src={post.image} alt="Post" />
            <p>{post.title}</p>
            <p>^ {post.likes}</p>
          </div>
        ))}
        <div className="create-post">
  <input
    type="text"
    placeholder="Post title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
  />
  <input
    type="text"
    placeholder="Image URL"
    value={image}
    onChange={(e) => setImage(e.target.value)}
  />
  <button onClick={createPost}>Post</button>
</div>

      </div>
    </div>
  );
}
