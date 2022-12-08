require ('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const rateLimit = require('express-rate-limit')

const app = express();
const baseUrl = 'https://api.twitch.tv/helix';
const clientId = process.env.TWITCH_CLIENT_ID;
const authToken = process.env.TWITCH_AUTH_TOKEN;
const port = process.env.PORT || 3000;

const limiter = rateLimit({
  // limits it to 2 requests per minute
	windowMs: 60000,
	max: 4, 
	standardHeaders: true,
	legacyHeaders: false,
})
app.use(limiter) // applies the rate limit to all requests


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

app.get('/game/:username', async (req, res) => {
  const username = req.params.username;
  const response = await fetch(`${baseUrl}/streams?user_login=${username}`, {
    headers: {
      'Client-ID': clientId,
      'Authorization': 'Bearer ' + authToken
    }
  });

  const json = await response.json();
  const streamGame = json.data?.[0]?.game_name;

  res.send({ streamGame });
});



app.listen(port, () => {
  console.log("Listening on port: " + port);
});
