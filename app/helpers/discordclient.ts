import { Collection } from "discord.js";

const { Client, Intents } = require('discord.js');
export default class DiscordClient {
    private client;
    private static instance: DiscordClient;

    private constructor(){
        this.client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});
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
}