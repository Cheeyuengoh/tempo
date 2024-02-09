const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("resume")
        .setDescription("Resume current music"),
    async execute(client, interaction) {
        const queue = client.player.getQueue(interaction.guild.id);
        if (!queue) {
            return interaction.reply("Play a music first");
        }

        queue.unpause();
        await interaction.reply("Resumed");
    }
}