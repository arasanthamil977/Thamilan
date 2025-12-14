```markdown
# Random Joke Generator

A tiny demo that fetches random jokes from an external API and displays them in a simple web UI.

Features:
- Server-side proxy endpoint: GET /api/joke
- Frontend with "Get Joke" and "Copy Joke" buttons
- Uses Official Joke API (https://official-joke-api.appspot.com/jokes/random)

## Quick start

1. Install dependencies:
   npm install

2. Run the app:
   npm start

3. Open in your browser:
   http://localhost:3000

## API

- GET /api/joke
  - Response JSON: { id, type, setup, punchline, provider }

## Notes

- This project proxies the external API on the server to avoid CORS and to give you a place to add caching, rate-limiting, or API keys later.
- For production, consider caching responses and applying rate limits.
- You can swap the joke provider by changing JOKE_API in server.js.

## License
MIT
```