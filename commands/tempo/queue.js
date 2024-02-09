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

        const tracks = queue.tracks;
        tracks.unshift(queue.current);
        const tracksString = tracks.map((track, i) => {
            let string = `${i + 1}. **${track.title}** -<@ ${track.requestedBy}`;
            if (i === 0) {
                return `${i + 1}. **${track.title}** -<@ ${track.getRequestedByUsername()} (Now playing)`;
            }
            return string;
        });

        let embed = new EmbedBuilder()
            .setTitle("Queue")
            .setDescription(tracksString.join("\n"))
            .setColor("Green");
        await interaction.channel.send({ embeds: [embed] });
    }
}