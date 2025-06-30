const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/search', async (req, res) => {
  const query = req.query.q;
  try {
    const wikiRes = await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`);
    res.json({ extract: wikiRes.data.extract });
  } catch (err) {
    res.json({ extract: 'No results found.' });
  }
});

app.listen(3001, () => console.log('Server running on port 3001'));
