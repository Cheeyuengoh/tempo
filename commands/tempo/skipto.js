const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("skipto")
        .setDescription("Skip to position of music")
        .addIntegerOption(option =>
            option.setName("position")
                .setDescription("Position of music in queue")
                .setMinValue(1)
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

        const queue = client.player.getQueue(interaction.guild.id);
        if (!queue) {
            let embed = new EmbedBuilder()
                .setTitle("No music is currently playing")
                .setColor("Red");
            return await interaction.channel.send({ embeds: [embed] });
        }

        try {
            queue.skipTo(interaction.options.getInteger("position"));
        } catch (error) {
            let embed = new EmbedBuilder()
                .setTitle(error.message)
                .setColor("Red")
            await interaction.channel.send({ embeds: [embed] });
        }
    }
}