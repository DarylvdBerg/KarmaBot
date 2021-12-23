import DiscordClient from "./helpers/discordclient";

const fs = require("fs");
const path = require("path");
const { token } = require("../config.json");

const client = DiscordClient.getInstance().get(); 

client.once('ready', () => {
    console.log('Bot is ready');
});

const commandDir = path.join(__dirname, "./commands");
const commandFiles = fs.readdirSync(commandDir).filter(file => file.endsWith(".ts"));

for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    DiscordClient.getInstance().addCommand(command.data.name, command);
}

client.on('interactionCreate', async interaction => {
    if(!interaction.isCommand()) return;

    const command = DiscordClient.getInstance().getCommands().get(interaction.commandName);

    if(!command) return;

    try {
        await command.execute(interaction);
    } catch(error){
        console.error(error);
        await interaction.reply({content: "Problem with executing command"});
    }
});

client.login(token);