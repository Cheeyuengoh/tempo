const { SlashCommandBuilder } = require("discord.js");
const play = require("play-dl");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("Play music!")
        .addStringOption(option =>
            option.setName("url")
                .setDescription("Provide a url")
                .setRequired(true)),
    async execute(client, interaction) {
        const url = interaction.options.getString('url', true);

        if (!interaction.member.voice.channel) {
            return interaction.reply("Please join a voice channel");
        }

        try {
            const queue = client.player.createQueue(client.guild);
            if (!queue.connection) {
                queue.connect(interaction.member.voice.channel);
            }

            const stream = await play.stream(url);
            queue.addTrack(stream);

            // const connection = joinVoiceChannel({
            //     channelId: interaction.member.voice.channelId,
            //     guildId: interaction.guildId,
            //     adapterCreator: interaction.guild.voiceAdapterCreator
            // });

            // if (!client.player) {
            //     client.player = new Player(connection);
            // }

            // client.player.play(url);

            await interaction.reply(`Playing ${url}`);
        } catch (error) {
            await interaction.reply(`There was an error playing music \`${command.data.name}\`:\n\`${error.message}\``);
        }
    }
}