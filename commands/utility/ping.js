const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Get API ping"),
    async execute(client, interaction) {
        await interaction.deferReply();
        await interaction.editReply(`API Latency is ${Math.round(client.ws.ping)}ms`);
    }
}