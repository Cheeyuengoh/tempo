const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
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
        await interaction.deferReply();
        await interaction.deleteReply();

        if (!interaction.member.voice.channel) {
            let embed = new EmbedBuilder()
                .setTitle("Please join a voice channel before executing this command")
                .setColor("Red");
            return await interaction.channel.send({ embeds: [embed] });
        }

        const music = {
            requestedBy: interaction.member.user,
            providedURL: interaction.options.getString('url', true)
        };
        music.type = await play.validate(music.providedURL);

        if (music.type === "yt_video") {
            const info = await play.video_basic_info(music.providedURL);
            music.resourceURL = info.video_details.url;
            music.title = info.video_details.title;
            music.duration = info.video_details.durationInSec;
        }

        if (music.type === "sp_track") {
            const spotifyInfo = await client.player.spotifyAPI.spotify(music.providedURL);
            const searched = await play.search(`${spotifyInfo.artists[0].name} ${spotifyInfo.name}`);
            const youtubeInfo = await play.video_basic_info(searched[0].url);
            music.resourceURL = youtubeInfo.video_details.url;
            music.title = youtubeInfo.video_details.title;
            music.duration = youtubeInfo.video_details.durationInSec;
        }

        let queue = client.player.getQueue(interaction.guild.id);

        if (!queue) {
            queue = client.player.createQueue({ guild: interaction.guild, channel: interaction.channel });
        }

        if (!queue.current && !queue.tracks.length) {
            queue.addTrack(music);
            queue.connect(interaction.member.voice.channel);
            queue.play();
        } else {
            queue.addTrack(music);
            let embed = new EmbedBuilder()
                .setTitle("Added to queue")
                .setDescription(`**${music.title}**`)
                .setColor("Green");
            return await interaction.channel.send({ embeds: [embed] });
        }

        let embed = new EmbedBuilder()
            .setTitle("Now playing")
            .setDescription(`**${queue.current.title}**`)
            .setColor("Green");
        await interaction.channel.send({ embeds: [embed] });
    }
}