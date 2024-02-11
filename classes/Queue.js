const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require("@discordjs/voice");
const Music = require("./Music");
const play = require("play-dl");
const { EmbedBuilder } = require("discord.js");

module.exports = class Queue {
    constructor({ guild, channel }) {
        this.guild = guild;
        this.channel = channel;
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
        player.on(AudioPlayerStatus.Idle, async () => {
            this.current = null;
            if (this.tracks.length) {
                this.play();
                let embed = new EmbedBuilder()
                    .setTitle("Now playing")
                    .setDescription(`**${this.current.title}**`)
                    .setColor("Green");
                await this.channel.send({ embeds: [embed] });
            } else {
                let embed = new EmbedBuilder()
                    .setTitle("End of queue")
                    .setColor("Blue")
                await this.channel.send({ embeds: [embed] });
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
        const stream = await play.stream(this.current.resourceURL);
        const resource = createAudioResource(stream.stream, { inputType: stream.type });
        this.connection.state.subscription.player.play(resource);
    }

    pause() {
        this.connection.state.subscription.player.pause();
    }

    resume() {
        this.connection.state.subscription.player.unpause();
    }

    async skip() {
        await this.connection.state.subscription.player.stop();
    }

    async skipTo(position) {
        const index = position - 1;
        if (index >= this.tracks.length) {
            throw new Error("Position provided is more than queue length");
        }

        this.tracks = this.tracks.slice(index);
        await this.skip();
    }
}