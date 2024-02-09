const { getVoiceConnection } = require("@discordjs/voice");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pause")
        .setDescription("Pause current music"),
    async execute(client, interaction) {
        if(!client.player){
            return await interaction.reply("Play a music first");
        }
        
        client.player.pause();
        await interaction.reply("Paused");
    }
}