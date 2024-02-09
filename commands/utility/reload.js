const fs = require("fs");
const path = require("path");
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reload')
        .setDescription('Reloads a command.')
        .addStringOption(option =>
            option.setName('command')
                .setDescription('The command to reload.')
                .setRequired(true)),
    async execute(_client, interaction) {
        const commandName = interaction.options.getString('command', true).toLowerCase();
        const command = interaction.client.commands.get(commandName);

        if (!command) {
            return interaction.reply(`There is no command with name \`${commandName}\`!`);
        }

        try {
            let newCommand = "";
            const commandsFolderPath = path.join(__dirname, "..");
            const commandsFolders = fs.readdirSync(commandsFolderPath);
            for (const folder of commandsFolders) {
                const commandsPath = path.join(commandsFolderPath, folder);
                const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));
                for (const file of commandsFiles) {
                    if (file.startsWith(commandName)) {
                        const filePath = path.join(commandsPath, file);
                        delete require.cache[require.resolve(filePath)];
                        interaction.client.commands.delete(command.data.name);
                        newCommand = require(filePath);
                        interaction.client.commands.set(newCommand.data.name, newCommand);
                        break;
                    }
                }
            }

            await interaction.reply(`Command \`${newCommand.data.name}\` was reloaded!`);
        } catch (error) {
            console.error(error);
            await interaction.reply(`There was an error while reloading a command \`${command.data.name}\`:\n\`${error.message}\``);
        }
    },
};