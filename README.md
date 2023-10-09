# Twitch API Wrapper

API that wraps around the [Twitch Helix API](https://dev.twitch.tv/docs/api/) to fetch current stream information.

This was made as an companion tool for [AutoVOD](https://github.com/jenslys/autovod). So currently it only returns the stream title and current game.

**Limitation**: The Twitch API doesn't return anything if the streamer is not live.

## Endpoints

`/info/<username-here>`

## Installation

Clone the repo

```bash
git clone https://github.com/jenslys/twitch-api-wrapper.git
```

CD into the folder

```bash
cd twitch-api-wrapper
```

Create environment file

```bash
cp .env.example .env
```

Install NPM packages

```bash
npm install
```

Environment variables

1. [Register a Twitch application](https://dev.twitch.tv/docs/authentication/register-app) and add `https://localhost/` as your redirect url.

1. Generate a new client secret.

1. fill in `TWITCH_CLIENT_ID` and `TWITCH_CLIENT_SECRET` inside the `.env` file.

1. `TWITCH_AUTH_TOKEN` can be generated and added with the [provided curl command](https://dev.twitch.tv/docs/api/get-started#get-an-oauth-token) or you leave it empty, as it is generated on deployment if the field is empty and it is refreshed every 30 days. So once deployed, the application should be able to run without any further configuration.

1. `PORT` desired port to run on. defaults to 3000 if empty.

## Deploy to production

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://vercel.com/new/clone?repository-url=https://github.com/jenslys/twitch-api-wrapper)

1. Hit the button above.
1. Leave everything as default.
1. Add the required env variables as listed above on vercel.
1. Hit deploy.
