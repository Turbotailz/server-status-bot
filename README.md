# server-status-bot
Shows the current player count from a Minecraft server as a status on a Discord bot

## Example
![Example](https://i.imgur.com/ScyP7Hl.png)

## Requirements

- [NodeJS](https://nodejs.org/en/) and [NPM](https://www.npmjs.com/) installed
- A running Minecraft server and its address 
- A [Discord bot](https://discordapp.com/developers/applications/) and its token

## Instructions

- Clone this repo
- Run `npm install`
- Rename `.env.example` to `.env`
- Edit `.env` and add the following details:
  - `DISCORD_TOKEN` is the token for your bot
  - `SERVER_ADDRESS` is the address of your Minecraft server
- Run `node index.js`

Your bot's status will begin to update every 10 seconds to show how many players are online.
