const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Provides information about the server.'),
    async execute(_client, interaction) {
        await interaction.deferReply();
        await interaction.editReply(`This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`);
    },
};