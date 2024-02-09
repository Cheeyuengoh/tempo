const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
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
        await interaction.deferReply();
        await interaction.deleteReply();

        if (!interaction.member.voice.channel) {
            let embed = new EmbedBuilder()
                .setTitle("Please join a voice channel before executing this command")
                .setColor("Red");
            return await interaction.channel.send({ embeds: [embed] });
        }

        const url = interaction.options.getString('url', true);
        const music = await play.video_basic_info(url);
        let queue = client.player.getQueue(interaction.guild.id);

        if (!queue) {
            queue = client.player.createQueue({ guild: interaction.guild, channel: interaction.channel });
        }

        if (!queue.current && !queue.tracks.length) {
            console.log(interaction.member);
            queue.addTrack({
                url: music.video_details.url,
                title: music.video_details.title,
                duration: music.video_details.durationInSec,
                requestedBy: interaction.member.user
            });
            queue.connect(interaction.member.voice.channel);
            queue.play();
        } else {
            queue.addTrack({
                url: music.video_details.url,
                title: music.video_details.title,
                duration: music.video_details.durationInSec,
                requestedBy: interaction.member.user
            });
            let embed = new EmbedBuilder()
                .setTitle("Added to queue")
                .setDescription(`**${music.video_details.title}**`)
                .setColor("Green");
            return await interaction.channel.send({ embeds: [embed] });
        }

        let embed = new EmbedBuilder()
            .setTitle("Now playing")
            .setDescription(`**${queue.current.title}**`)
            .setColor("Green");
        await interaction.channel.send({ embeds: [embed] });
    }
}