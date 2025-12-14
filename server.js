// Simple Random Joke Generator (Node.js + Express + Axios)
// Serves a small UI and a proxy endpoint that fetches a random joke
// from the Official Joke API: https://official-joke-api.appspot.com/jokes/random

const express = require('express');
const axios = require('axios');
const path = require('path');

const PORT = process.env.PORT || 3000;
const JOKE_API = 'https://official-joke-api.appspot.com/jokes/random';

const app = express();

// Serve static frontend
app.use(express.static(path.join(__dirname, 'public')));

// API route that proxies a random joke from the external API
app.get('/api/joke', async (req, res) => {
  try {
    const resp = await axios.get(JOKE_API, { timeout: 5000 });
    // Official Joke API returns JSON like: { id, type, setup, punchline }
    const { id, type, setup, punchline } = resp.data || {};
    if (!setup && !punchline) {
      return res.status(502).json({ error: 'Invalid response from joke provider' });
    }
    res.json({ id, type, setup, punchline, provider: 'official-joke-api' });
  } catch (err) {
    console.error('Error fetching joke:', err.message || err);
    res.status(502).json({ error: 'Failed to fetch joke' });
  }
});

app.listen(PORT, () => {
  console.log(`Random Joke Generator running at http://localhost:${PORT}`);
});