module.exports = {
    name: "help",
    description: "Show all commands you're able to use.",
    execute(message, args, db, client) {
        const { MessageEmbed } = require('discord.js');
        const commands = [];

        for(command of client.commands){
            const commandName = `k!${command[1]['name']}`;
            const commandDescription = command[1]['description'];
            commands.push({name: commandName, value: commandDescription});
        }

        const embed = new MessageEmbed()
            .setColor("#d90b2d")
            .setTitle("All available commands")
            .addFields(commands);

        message.channel.send({embeds: [embed]});
    }
}