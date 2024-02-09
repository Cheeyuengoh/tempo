const Queue = require("./Queue");

module.exports = class Player {
    constructor() {
        this.queues = new Map();
    }

    getQueue(guildId) {
        return this.queues.get(guildId);
    }

    createQueue({ guild, channel }) {
        this.queues.set(guild.id, new Queue({ guild, channel }));
        return this.queues.get(guild.id);
    }
}