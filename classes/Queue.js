const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require("@discordjs/voice");
const Music = require("./Music");
const play = require("play-dl");

module.exports = class Queue {
    constructor(guild) {
        this.guild = guild;
        this.connection = null;
        this.current = null;
        this.tracks = new Array();
    }

    connect(channel) {
        this.connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: this.guild.id,
            adapterCreator: this.guild.voiceAdapterCreator
        });

        const player = createAudioPlayer();
        player.on(AudioPlayerStatus.Idle, () => {
            this.current = null;
            if (this.tracks.length) {
                this.play();
            }
        });

        this.connection.subscribe(player);
    }

    addTrack(music) {
        this.tracks.push(new Music(music));
    }

    async play() {
        this.current = this.tracks[0];
        this.tracks.shift();
        const stream = await play.stream(this.current.url);
        const resource = createAudioResource(stream.stream, { inputType: stream.type });
        this.connection.state.subscription.player.play(resource);
    }

    pause() {
        this.connection.state.subscription.player.pause();
    }

    resume() {
        this.connection.state.subscription.player.unpause();
    }

    skip() {
        this.connection.state.subscription.player.stop();
    }
}