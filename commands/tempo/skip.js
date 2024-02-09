const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("skip")
        .setDescription("Skip current music"),
    async execute(client, interaction) {
        const queue = client.player.getQueue(interaction.guild.id);
        if (!queue) {
            return interaction.reply("Play a music first");
        }

        queue.skip();
        await interaction.reply("Skipped");
    }
}