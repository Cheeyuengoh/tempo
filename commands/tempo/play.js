const { SlashCommandBuilder } = require("discord.js");
const play = require("play-dl");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("Play music!")
        .addStringOption(option =>
            option.setName("url")
                .setDescription("Provide a url")
                .setRequired(true)),
    async execute(client, interaction) {
        const url = interaction.options.getString('url', true);

        if (!interaction.member.voice.channel) {
            return interaction.reply("Please join a voice channel");
        }

        const music = await play.video_basic_info(url);
        let queue = client.player.getQueue(interaction.guild.id);

        // if (!queue) {
        //     queue = client.player.createQueue(interaction.guild);
        //     queue.addTrack({
        //         url: music.video_details.url,
        //         title: music.video_details.title,
        //         duration: music.video_details.durationInSec,
        //         requestedBy: interaction.member.id
        //     });
        //     queue.connect(interaction.member.voice.channel);
        //     queue.play();
        // } else {
        //     queue.addTrack({
        //         url: music.video_details.url,
        //         title: music.video_details.title,
        //         duration: music.video_details.durationInSec,
        //         requestedBy: interaction.member.id
        //     });
        //     return interaction.reply(`Added to queue`);
        // }

        if (!queue) {
            queue = client.player.createQueue(interaction.guild);
        }

        if (!queue.current && !queue.tracks.length) {
            queue.addTrack({
                url: music.video_details.url,
                title: music.video_details.title,
                duration: music.video_details.durationInSec,
                requestedBy: interaction.member.id
            });
            queue.connect(interaction.member.voice.channel);
            queue.play();
        } else {
            queue.addTrack({
                url: music.video_details.url,
                title: music.video_details.title,
                duration: music.video_details.durationInSec,
                requestedBy: interaction.member.id
            });
            return interaction.reply("Added to queue");
        }

        await interaction.reply(`Playing ${queue.current.title}`);
    }
}