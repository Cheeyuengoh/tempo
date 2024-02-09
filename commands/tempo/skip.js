const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("skip")
        .setDescription("Skip current music"),
    async execute(client, interaction) {
        if (!client.player) {
            return await interaction.reply("Play a music first");
        }

        client.player.skip();
        await interaction.reply("Skipped");
    }
}