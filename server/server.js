const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { Kafka } = require("kafkajs");
const WebSocket = require("ws");

const app = express();
app.use(express.json());
app.use(cors());

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

app.post("/post", async (req, res) => {
  try {
    const { title, image } = req.body;

    const newPost = {
      id: Date.now(),
      title,
      image,
      likes: 0,
      createdAt: new Date()
    };

    // Send to Kafka
    await sendMessage("ascii-events", newPost);

    res.json({ success: true, post: newPost });
  } catch (err) {
    console.error("Error creating post:", err);
    res.status(500).json({ error: "Failed to create post" });
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
