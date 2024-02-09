const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("queue")
        .setDescription("Display current queue"),
    async execute(client, interaction) {
        if (!client.player) {
            return await interaction.reply("Play a music first");
        }

        await interaction.reply("Queue:\n" + client.player.queue.join("\n"));
    }
}