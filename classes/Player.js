const Queue = require("./Queue");

module.exports = class Player {
    constructor() {
        this.queues = new Map();
    }

    getQueue(guildId) {
        return this.queues.get(guildId);
    }

    createQueue(guild) {
        this.queues.set(guild.id, new Queue(guild));
        return this.queues.get(guild.id);
    }
}