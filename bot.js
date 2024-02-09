const fs = require("fs");
const path = require("path");
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const Player = require("./classes/Player");
const token = process.env.TOKEN;

//Create a new client instance
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates
    ]
});

client.player = new Player();

//Command handler
client.commands = new Collection();

const commandsFolderPath = path.join(__dirname, "commands");
const commandsFolders = fs.readdirSync(commandsFolderPath);

for (const folder of commandsFolders) {
    const commandsPath = path.join(commandsFolderPath, folder);
    const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith("js"));
    for (const file of commandsFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ("data" in command && "execute" in command) {
            client.commands.set(command.data.name, command);
            delete require.cache[require.resolve(filePath)];
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

//Event handler
const eventsFolderPath = path.join(__dirname, "events");
const eventsFolder = fs.readdirSync(eventsFolderPath);

for (const folder of eventsFolder) {
    const eventsPath = path.join(eventsFolderPath, folder);
    const eventsFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith("js"));
    for (const file of eventsFiles) {
        const filePath = path.join(eventsPath, file);
        const event = require(filePath);
        if (event.once) {
            client.once(event.name, (interaction) => event.execute(client, interaction));
        } else {
            client.on(event.name, (interaction) => event.execute(client, interaction));
        }
        delete require.cache[require.resolve(filePath)];
    }
}

client.login(token);