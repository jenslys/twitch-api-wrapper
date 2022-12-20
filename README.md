# Twitch API Wrapper

Public API that wraps around the [Twitch Helix API](https://dev.twitch.tv/docs/api/) to fetch current stream information.

This was made as an companion tool for [AutoVOD](https://github.com/jenslys/autovod). So currently it only returns the stream date and current game.

**Limitation**: The Twitch API doesn't return anything if the streamer is not live.

## Endpoints

`/info/<username-here>`

## Installation

Clone the repo

```bash
git clone https://github.com/jenslys/twitch-api-wrapper.git
```

Cd into the folder

```bash
cd twitch-api-wrapper
```

Create .env file

```bash
cp .env.example .env
```

Install npm packages

```bash
npm install
```

Environment variables

1. [Register a twitch application](https://dev.twitch.tv/docs/authentication/register-app) and fill in `TWITCH_CLIENT_ID` and `TWITCH_CLIENT_SECRET`

2. `TWITCH_AUTH_TOKEN` can be generated and added with the [provided curl command](https://dev.twitch.tv/docs/api/get-started#get-an-oauth-token) or you leave it empty, as it is generated on deployment if the field is empty and it is refreshed every 30 days.
