const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Get API ping"),
    async execute(_client, interaction) {
        await interaction.reply(`API Latency is ${Math.round(interaction.client.ws.ping)}ms`);
    }
}