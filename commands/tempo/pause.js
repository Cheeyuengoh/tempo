const { getVoiceConnection } = require("@discordjs/voice");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pause")
        .setDescription("Pause current music"),
    async execute(client, interaction) {
        const queue = client.player.getQueue(interaction.guild.id);
        if (!queue) {
            return interaction.reply("Play a music first");
        }

        queue.pause();
        await interaction.reply("Paused");
    }
}