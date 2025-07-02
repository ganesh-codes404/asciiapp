// import express from 'express';
// import fetch from 'node-fetch';
// import cors from 'cors';

// const app = express();
// app.use(cors());

// app.get('/feed', async (req, res) => {
//   try {
//     const redditRes = await fetch('https://www.reddit.com/r/pics/top.json?limit=12&t=day');
//     const data = await redditRes.json();

//     const feed = data.data.children.map(post => ({
//       image: post.data.url_overridden_by_dest,
//       title: post.data.title,
//       likes: post.data.ups
//     })).filter(p => p.image && p.image.startsWith('http'));

//     res.json(feed);
//   } catch (err) {
//     console.error("Error fetching Reddit:", err);
//     res.status(500).json({ error: "Failed to fetch feed" });
//   }
// });

// app.listen(3002, () => console.log("Feed server running on port 3002"));
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());  // to accept JSON body for updates

// Global preferences map
const preferences = {
  coding: 1,
  pokemon: 1,
  Earth: 1,
  space: 1,
  memes: 1
};

// Function to select subreddit based on weighted random
function getRandomSubreddit() {
  const weightedList = [];

  for (const [subreddit, weight] of Object.entries(preferences)) {
    for (let i = 0; i < weight; i++) {
      weightedList.push(subreddit);
    }
  }

  const randomIndex = Math.floor(Math.random() * weightedList.length);
  return weightedList[randomIndex];
}

// Feed route
app.get('/feed', async (req, res) => {
  const subreddit = getRandomSubreddit();
  console.log(`Fetching from r/${subreddit}`);

  try {
    const redditRes = await fetch(`https://www.reddit.com/r/${subreddit}/top.json?limit=12&t=day`);
    const data = await redditRes.json();

    const feed = data.data.children.map(post => ({
      image: post.data.url_overridden_by_dest,
      title: post.data.title,
      likes: post.data.ups,
      subreddit
    })).filter(p => p.image && p.image.startsWith('http'));

    res.json(feed);
  } catch (err) {
    console.error("Error fetching Reddit:", err);
    res.status(500).json({ error: "Failed to fetch feed" });
  }
});

// Route to update preferences map
app.post('/update-preferences', (req, res) => {
  const { topic, weight } = req.body;

  if (!topic || typeof weight !== 'number' || weight < 0) {
    return res.status(400).json({ error: "Invalid topic or weight" });
  }

  preferences[topic] = weight;
  res.json({ success: true, preferences });
});

app.listen(3002, () => console.log("Feed server running on port 3002"));
