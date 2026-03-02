import React, { useEffect, useState } from "react";
import "./Home.css";

export default function Home() {
  const [feed, setFeed] = useState([]);
const [title, setTitle] = useState("");
const [image, setImage] = useState("");
let counter=0;
let likebuttons=document.getElementsByClassName("like-button");
let likecounts=document.getElementsByClassName("like-count");
for(let i=0;i<likebuttons.length;i++){
  likebuttons[i].addEventListener("click",()=>{
    counter++;
    likecounts[i].innerText=counter;
  })
}

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

    fetchFeed();

   
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
           <p><strong>{post.userId.username}</strong></p>
            <p>{post.title}</p>
            <button className="like-button">^</button> <span className="like-count">{post.likes.length}</span>
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
