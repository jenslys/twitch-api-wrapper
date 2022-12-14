const generateAuthToken = async () => {
  try {
    const body = new URLSearchParams({
      client_id,
      client_secret,
      grant_type: "client_credentials",
    });

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    };

    const response = await fetch("https://id.twitch.tv/oauth2/token", options);
    const data = await response.json();
    authToken = data.access_token;
  } catch (err) {
    // Handle the error here
  }
}

require ('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const rateLimit = require('express-rate-limit')
const schedule = require('node-schedule');
const app = express();

const baseUrl = 'https://api.twitch.tv/helix';
const client_id = process.env.TWITCH_CLIENT_ID;
const client_secret = process.env.TWITCH_CLIENT_SECRET;
let authToken = process.env.TWITCH_AUTH_TOKEN || generateAuthToken(); // If there is no auth token in the environment variables, generate one
const port = process.env.PORT || 3000;
const limiter = rateLimit({
  // limits it to 2 requests per minute
  windowMs: 60000,
  max: 14, 
  standardHeaders: true,
  legacyHeaders: false,
})
app.use(limiter) // applies the rate limit to all requests

const job = schedule.scheduleJob('00 00 00 28,29,30 * *', function(){
  generateAuthToken();
});

const makeTwitchRequest = async (username) => {
  const response = await fetch(`${baseUrl}/streams?user_login=${username}`, {
    headers: {
      'Client-ID': client_id,
      'Authorization': 'Bearer ' + authToken
    }
  });

  const json = await response.json();
  return json;
}

app.get('/info/:username', async (req, res) => {
  await generateAuthToken();
  const username = req.params.username;
  const json = await makeTwitchRequest(username);
  const stream_title = json.data?.[0]?.title;
  const stream_game = json.data?.[0]?.game_name;

  res.send({ stream_title, stream_game });
});


app.listen(port, () => {
  console.log("Listening on port: " + port);
});
