const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("current")
        .setDescription("Get info on current music"),
    async execute(client, interaction) {
        await interaction.deferReply();
        await interaction.deleteReply();

        if (!interaction.member.voice.channel) {
            let embed = new EmbedBuilder()
                .setTitle("Please join a voice channel before executing this command")
                .setColor("Red");
            return await interaction.channel.send({ embeds: [embed] });
        }

        const queue = client.player.getQueue(interaction.guild.id);
        if (!queue) {
            let embed = new EmbedBuilder()
                .setTitle("No music is currently playing")
                .setColor("Red");
            return await interaction.channel.send({ embeds: [embed] });
        }

        const embed = new EmbedBuilder()
            .setTitle("Current Music")
            .setColor("Green")
            .addFields({
                name: "Title:",
                value: queue.current.title
            })
            .addFields({
                name: "Duration",
                value: queue.current.getDurationString()
            })
            .setFooter({ text: `Requested By: ${queue.current.getRequestedByUsername()}` });
        await interaction.channel.send({ embeds: [embed] });
    }
}