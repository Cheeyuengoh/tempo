const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(client, interaction) {
        if (!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName);

        if (!command) {
            console.log(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        try {
            await command.execute(client, interaction);
        } catch (error) {
            console.log(error);
            let embed = new EmbedBuilder()
                .setTitle("Error")
                .setDescription(error.message)
                .setColor("Red");
            await interaction.channel.send({ embeds: [embed] })
        }
    },
};