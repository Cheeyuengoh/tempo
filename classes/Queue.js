const { joinVoiceChannel, createAudioResource } = require("@discordjs/voice");

module.exports = class Queue {
    constructor(guild) {
        this.guild = guild;
        this.connection = null;
        this.current = null;
        this.tracks = new Array();
    }

    connect(channel, player) {
        this.connection = joinVoiceChannel({
            channelId: channel.channelId,
            guildId: this.guild.guildId,
            adapterCreator: this.guild.voiceAdapterCreator
        });

        this.connection.subscribe(player);
    }

    addTrack(stream) {
        const resource = createAudioResource(stream.stream, {
            inputType: stream.type
        });
        this.tracks.push(resource);
    }
}