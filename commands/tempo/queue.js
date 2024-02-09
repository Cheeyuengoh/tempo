const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("queue")
        .setDescription("Display current queue"),
    async execute(client, interaction) {
        const queue = client.player.getQueue(interaction.guild.id);
        if (!queue) {
            return interaction.reply("Play a music first");
        }

        const tracksString = queue.tracks.map((track, i) => {
            return `${i + 1}. **${track.title}** -<@ ${track.requestedBy}`;
        });

        console.log(interaction.guild);
        await interaction.reply(`Now Playing: **${queue.current.title}** -<@ ${queue.requestedBy}\n` + tracksString.join("\n"));
    }
}