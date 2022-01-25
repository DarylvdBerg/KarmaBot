// const { SlashCommandBuilder } = require("@discordjs/builders");
// module.exports = {
//     data: new SlashCommandBuilder()
//         .setName("ping")
//         .setDescription("Replies with pong!"),
//     async execute(interaction) {
//         await interaction.reply("Pong!");
//     },
// };

// const commando = require("discord.js");

// class Ping extends commando.Command {
//     constructor(client){ 
//         super(client, {
//             name: "ping",
//         });
//     }
//     async run (message, args) {
//         message.reply({content:"Pong!"});
//     }
// }
// module.exports = Ping;

module.exports = {
    name: "ping",
    description: "Replies with pong!",
    execute(message, args) {
        message.channel.send("pong!");
    }
}
