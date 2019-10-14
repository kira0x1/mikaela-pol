import chalk from 'chalk';
import { Message } from 'discord.js';
import { Command } from "../classes/command";

// Sub-Command List Users
const listUsers: Command = {
    name: 'listUsers',
    aliases: ['lsu'],
    perms: ['admin'],

    execute(message, args) {
        message.channel.send("ls users called")
    }
}


export const command: Command = {
    name: 'admin',
    aliases: ['sys'],
    description: 'Admin',
    perms: ['admin'],
    subCmd: [listUsers],

    async execute(message: Message, args: string[]) {
        console.log(chalk.cyan.bold(`Admin command called`))
    }
}