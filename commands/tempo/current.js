const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("current")
        .setDescription("Get info on current music"),
    async execute(client, interaction) {
        const queue = client.player.getQueue(interaction.guild.id);
        if (!queue) {
            return interaction.reply("Play a music first");
        }

        await interaction.reply(`Current Music:\nTitle:${queue.current.title}\nDuration:${queue.current.duration}\nRequested By: ${queue.current.requestedBy}`);
    }
}