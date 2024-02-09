const { createAudioPlayer, createAudioResource, AudioPlayerStatus, AudioPlayer } = require("@discordjs/voice");
const Queue = require("./Queue");
const play = require("play-dl");

module.exports = class Player {
    constructor() {
        this.player = createAudioPlayer();
        this.player.on(AudioPlayerStatus.Idle, () => {
            this.queue.current = this.queue.tracks[0];
            this.queue.tracks.shift();
            this.player.play(this.queue.current);
        });
        this.queue = null;
    }

    createQueue(guild) {
        this.queue = new Queue(guild);
        return this.queue;
    }


    // async play(url) {
    //     this.insertQueue(url);
    //     if (this.queue.length > 1) return;

    //     const stream = await play.stream(this.queue[0]);
    //     const resource = createAudioResource(stream.stream, {
    //         inputType: stream.type
    //     });
    //     this.player.play(resource);
    // }

    // pause() {
    //     this.player.pause();
    // }

    // unpause() {
    //     this.player.unpause();
    // }

    // async skip() {
    //     if (this.queue.length > 1) {
    //         this.queue.shift();
    //         const stream = await play.stream(this.queue[0]);
    //         const resource = createAudioResource(stream.stream, {
    //             inputType: stream.type
    //         });
    //         this.player.play(resource);
    //     }
    // }

    // insertQueue(url) {
    //     this.queue.push(url);
    // }
}