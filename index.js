require('dotenv').config();
require('console-stamp')(console, 'HH:MM:ss.l');

const minestat = require('./minestat.js');
const discord = require('discord.js');
const client = new discord.Client();

let serverOnline = false;
let playersOnline = 0;

// Poll 
setInterval(() => {
	try {
		minestat.init(process.env.SERVER_ADDRESS, 25565, () => {
			playersOnline = minestat.current_players;
			serverOnline = minestat.online;
		});
	}
	catch(error) { console.log(error); }
}, 10000);

client.login(process.env.DISCORD_TOKEN);

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
	}, 10000);
});

client.on('error', console.error);
