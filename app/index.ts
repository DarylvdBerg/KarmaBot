// import KarmaDao from "./database/karmaDao";
import DiscordClient from "./helpers/discordclient";
const Discord = require("discord.js");

const fs = require("fs");
const path = require("path");
const { token } = require("../config.json");

const client = DiscordClient.getInstance().get(); 
client.commandPrefix = "k!";
client.commands = new Discord.Collection();

// const karmaDao = new KarmaDao();

const commandDir = path.join(__dirname, "./commands");
const commandFiles = fs.readdirSync(commandDir).filter(file => file.endsWith('.js'));

for(const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    // karmaDao.create();
    console.log('Bot is ready');
});

client.on('messageCreate', message => {
    if(!message.content.startsWith(client.commandPrefix)) return;

    const args = message.content.slice(client.commandPrefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    try {
        client.commands.get(command).execute(message, args);
    } catch(error) {
        message.channel.send("Karma is a bitch.");
    }
});

client.login(token);