const Queue = require("./Queue");
const play = require("play-dl");
const SpotifyAPI = require("./SpotifyAPI");

module.exports = class Player {
    constructor() {
        this.queues = new Map();
        this.spotifyAPI = new SpotifyAPI();
    }

    getQueue(guildId) {
        return this.queues.get(guildId);
    }

    createQueue({ guild, channel }) {
        this.queues.set(guild.id, new Queue({ guild, channel }));
        return this.queues.get(guild.id);
    }
}