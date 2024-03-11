// bot.js
const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');
const config = require('./config');

class Bot {
    constructor() {
        this.client = new Client({ intents: [GatewayIntentBits.Guilds] });
        this.client.once('ready', () => {
            console.log('Der Bot ist bereit!');
        });
        this.client.login(config.discord.token);
        setInterval(this.fetchTimetable.bind(this), config.fetchInterval);
    }

    async fetchTimetable() {
        try {
            const response = await axios.post(config.webUntis.url, config.webUntis.credentials);
            console.log(response.data);
        } catch (error) {
            console.error('Fehler beim Abrufen des Stundenplans:', error);
        }
    }

    async sendNotification(message) {
        const channel = await this.client.channels.fetch(config.discord.channelID);
        channel.send(message);
    }
}

new Bot();