import DiscordClient from "./helpers/discordclient";

const fs = require('fs');
const path = require("path");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { token, clientId, guildId } = require("../config.json");

const commands = [];
const commandDir = path.join(__dirname, "./commands");
const commandFiles = fs.readdirSync(commandDir).filter(file => file.endsWith('.ts'));

for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

console.log(DiscordClient.getInstance().getCommands())
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);