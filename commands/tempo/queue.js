const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("queue")
        .setDescription("Display current queue"),
    async execute(client, interaction) {
        await interaction.deferReply();
        await interaction.deleteReply();

        if (!interaction.member.voice.channel) {
            let embed = new EmbedBuilder()
                .setTitle("Please join a voice channel before executing this command")
                .setColor("Red");
            return await interaction.channel.send({ embeds: [embed] });
        }

        const queue = client.player.getQueue(interaction.guild.id);
        if (!queue) {
            let embed = new EmbedBuilder()
                .setTitle("No music is currently playing")
                .setColor("Red");
            return await interaction.channel.send({ embeds: [embed] });
        }

        const tracksString = queue.tracks.map((track, i) => {
            return `${i + 1}. **${track.title}** --<@ ${track.requestedBy}`;
        });

        tracksString.unshift(`Now playing: **${queue.current.title}** --<@ ${queue.current.requestedBy}`);

        let embed = new EmbedBuilder()
            .setTitle("Queue")
            .setDescription(tracksString.join("\n"))
            .setColor("Green");
        await interaction.channel.send({ embeds: [embed] });
    }
}