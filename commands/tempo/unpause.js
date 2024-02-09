const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("unpause")
        .setDescription("Unpause current music"),
    async execute(client, interaction) {
        if(!client.player){
            return await interaction.reply("Play a music first");
        }

        client.player.unpause();
        await interaction.reply("Unpaused");
    }
}