const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { Kafka } = require("kafkajs");
const WebSocket = require("ws");
const app = express();
app.use(express.json());

app.use(cors());
const mongoose = require("mongoose");
const User = require("./models/User");
const Post=require("./models/Post");

mongoose.connect("mongodb://127.0.0.1:27017/asciiapp")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));
/* ---------------- KAFKA SETUP ---------------- */

const kafka = new Kafka({
  clientId: "asciiapp",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: "asciiapp-group" });

/* ---------------- START SERVER FIRST ---------------- */

const http = require("http");
const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

server.listen(3001, () => {
  console.log("Server running on port 3001");
});

/* ---------------- WEBSOCKET ---------------- */

// const wss = new WebSocket.Server({ server });

// wss.on("connection", (ws) => {
//   console.log("Client connected to WS");
// });

/* ---------------- KAFKA INIT FUNCTION ---------------- */

async function initKafka() {
  await producer.connect();
  await consumer.connect();
await consumer.subscribe({ topic: "posts", fromBeginning: false });


await consumer.run({
  eachMessage: async ({ message }) => {
    const post = JSON.parse(message.value.toString());

    console.log("New Post:", post);

    // Broadcast to all WebSocket clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(post));
      }
    });
  },
});

}

initKafka();
async function sendMessage(topic, message) {
  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(message) }],
  });
}

/* ---------------- PRODUCER API ---------------- */

app.post('/api/send-event', async (req, res) => {
  await producer.send({
    topic: "ascii-events",
    messages: [{ value: JSON.stringify(req.body) }],
  });

  res.send({ status: "sent" });
});
app.post("/create-post", async (req, res) => {
  const post = {
    id: Date.now(),
    username: req.body.username,
    content: req.body.content,
    timestamp: new Date()
  };

  await producer.send({
    topic: "posts",
    messages: [{ value: JSON.stringify(post) }],
  });

  res.json({ status: "Post sent to Kafka" });
});




app.post("/users", async (req, res) => {
  try {
    const { username, email } = req.body;

    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const newUser = new User({ username, email });
    await newUser.save();

    res.json(newUser);
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: "Failed to create user" });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});
app.post("/posts", async (req, res) => {
  try {
    const { userId, title, image } = req.body;

    const newPost = new Post({
      userId,
      title,
      image,
    });

    await newPost.save();
    res.json(newPost);

  } catch (err) {
    console.error("Error creating post:", err);
    res.status(500).json({ error: "Failed to create post" });
  }
});
app.get("/feed", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("userId", "username")
      .sort({ createdAt: -1 });

    res.json(posts);

  } catch (err) {
    res.status(500).json({ error: "Failed to fetch feed" });
  }
});

/* ---------------- EXISTING SEARCH ROUTE ---------------- */

app.get('/search', async (req, res) => {
  const query = req.query.q;
  try {
    const wikiRes = await axios.get(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`
    );
    res.json({ extract: wikiRes.data.extract });
  } catch (err) {
    res.json({ extract: 'No results found.' });
  }
});
