require ('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const rateLimit = require('express-rate-limit')

const app = express();
const baseUrl = 'https://api.twitch.tv/helix';
const clientId = process.env.TWITCH_CLIENT_ID;
const authToken = process.env.TWITCH_AUTH_TOKEN;

const limiter = rateLimit({
  // limits it to 2 requests per minute
	windowMs: 60000,
	max: 2, 
	standardHeaders: true,
	legacyHeaders: false,
})
app.use(limiter)


app.get('/title/:username', async (req, res) => {
  const username = req.params.username;
  const response = await fetch(`${baseUrl}/streams?user_login=${username}`, {
    headers: {
      'Client-ID': clientId,
      'Authorization': 'Bearer ' + authToken
    }
  });

  const json = await response.json();
  const streamTitle = json.data?.[0]?.title;

  res.send({ streamTitle });
});

app.listen(3000, () => {
  console.log('Listening on port 3000!');
});
