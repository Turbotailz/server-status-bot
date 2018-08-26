require('dotenv').config();
require('console-stamp')(console, 'HH:MM:ss.l');

const minestat = require('./minestat.js');
const discord = require('discord.js');
const client = new discord.Client();

client.login(process.env.DISCORD_TOKEN);

client.setInterval(() => {
	minestat.init(process.env.SERVER_ADDRESS, 25565, () => {
		playersOnline = minestat.current_players;
		console.log(`Players online: ${playersOnline}`);

		if (minestat.online) {
			if (playersOnline > 0) {

				client.user.setActivity(playersOnline + ' players online', {type: 'PLAYING'})
					.then()
					.catch(error => {
						console.log('setActivity error:', error)
				});

				client.user.setStatus('online').then()
					.catch(error => {
						console.log('setActivity error:', error)
				});

			} else {

				client.user.setActivity('No one online ☹️', {type: 'PLAYING'})
					.then()
					.catch(error => {
						console.log('setActivity error:', error)
				});

				client.user.setStatus('idle').then()
					.catch(error => {
						console.log('setStatus error:', error)
				});

			}

		} else {

			client.user.setActivity('Offline 🛑', {type: 'PLAYING'})
				.then()
				.catch(error => {
					console.log('setActivity error:', error)
			});

			client.user.setStatus('dnd').then()
				.catch(error => {
					console.log('setStatus error:', error)
			});
		}
	});
}, 10000);