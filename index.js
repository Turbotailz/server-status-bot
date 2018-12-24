require('dotenv').config();
require('console-stamp')(console, 'HH:MM:ss.l');

const env = process.env;
const minestat = require('./minestat.js');
const discord = require('discord.js');
const client = new discord.Client();

let serverOnline = false;
let playersOnline = 0;

// Start polling the server for data and store the data in a cache
setInterval(() => {
	try {
		minestat.init(env.SERVER_ADDRESS, env.SERVER_PORT, () => {
			playersOnline = minestat.current_players;
			serverOnline = minestat.online;
		}); 
	}
	catch(error) { console.log(error); }
}, env.INTERVAL);

// Log in with the bot token in .env
client.login(env.DISCORD_TOKEN);

// Start updating the Discord bot's activity with cached server data
client.on('ready', () => {
	client.setInterval(() => {
		if (serverOnline) {

			console.log(`Players online: ${playersOnline}`);

			if (playersOnline > 0) {

				client.user.setActivity(playersOnline + ' players online', {type: 'PLAYING'})
					.then()
					.catch(console.error);

				client.user.setStatus('online')
					.then()
					.catch(console.error);

			} else {

				client.user.setActivity('No one online ☹️', {type: 'PLAYING'})
					.then()
					.catch(console.error);

				client.user.setStatus('idle').then()
					.catch(console.error);

			}

		} else {

			client.user.setActivity('Offline 🛑', {type: 'PLAYING'})
				.then()
				.catch(console.error);

			client.user.setStatus('dnd')
				.then()
				.catch(console.log);
		}
	}, env.INTERVAL);
});

client.on('error', console.error);