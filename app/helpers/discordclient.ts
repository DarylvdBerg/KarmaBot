import { Collection } from "discord.js";

const { Client, Intents } = require('discord.js');
export default class DiscordClient {
    private client;
    private commands;
    private static instance: DiscordClient;

    private constructor(){
        this.client = new Client({intents: [Intents.FLAGS.GUILDS]});
        this.commands = new Collection();
    }

    public static getInstance() {
        if(!DiscordClient.instance) {
            DiscordClient.instance = new DiscordClient();
        }

        return DiscordClient.instance;
    }

    get() {
        return this.client;
    }

    getCommands() {
        return this.commands;
    }

    addCommand(name: string, command: string) {
        this.commands.set(name, command);
    }
}