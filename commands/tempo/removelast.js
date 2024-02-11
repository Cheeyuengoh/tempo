const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("removelast")
        .setDescription("Remove last song of queue"),
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

        const removed = queue.tracks.pop();

        let embed = new EmbedBuilder()
            .setTitle("Removed from queue")
            .setDescription(removed.title)
            .setColor("Green");
        await interaction.channel.send({ embeds: [embed] });
    }
}