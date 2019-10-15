import { Collection, Message } from 'discord.js';
import Command from '../classes/command';
import path from 'path';
import { readdirSync } from "fs";
import { QuickEmbed } from "./Style";
import { permissions } from '../config';
import chalk from 'chalk';

export const commands: Collection<string, Command> = new Collection();
const subCommands: Collection<string, Command> = new Collection();

export const cooldowns: Collection<string, Collection<string, number>> = new Collection();

export async function LoadCommands() {
    const folderPath = path.join(__dirname, '..', 'commands')
    const commandFiles = readdirSync(folderPath).filter(file => file.endsWith('.js'));

    commandFiles.map(file => {
        const { command } = require(`../commands/${file}`)
        const cmdName = command.name.toLowerCase();

        commands.set(cmdName, command);

        //If this command has subcommands then add it to the subCommand Collection
        if (commands.get(cmdName).subCmd) {
            commands.get(cmdName).subCmd.map(cmd => subCommands.set(cmd.name.toLowerCase(), cmd))
        }
    })
}

export function GetCommand(commandName: string) {
    return commands.get(commandName) || commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
}

function GetSubCommand(commandName: string) {
    return subCommands.get(commandName) || subCommands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
}


export function ExecuteCommand(commandName: string, message: Message, args: Array<string>) {
    const command = GetCommand(commandName) || GetSubCommand(commandName);

    //Check if command not found
    if (!command) {
        return QuickEmbed(`Command **${commandName}** not found`, message);
    }

    //Check if command is on cooldown, if so return.
    if (IsOnCoolDown(command, message)) return;
    if (!CheckPerms(command, message)) return;

    //Execute Command
    try {
        command.execute(message, args);
    }
    catch (error) {
        console.error(`command execute failed`, error);
    }
}

export function CheckPerms(command: Command, message: Message): boolean {
    const authorId = message.author.id;
    if (command.perms && command.perms.includes('admin')) {
        if (permissions.admins.includes(authorId)) return true;
        console.log(chalk.bgRed.bold(`user ${message.author.username} lacks permission \"admin\"`))
        return false;
    }
    return true;
}

function IsOnCoolDown(command: Command, message: Message): boolean {
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cdAmount = command.cooldown * 1000;
    const userId = message.author.id;

    if (timestamps.has(userId)) {
        const cdEndTime = timestamps.get(userId) + cdAmount;

        //Check if command is still on cooldown
        if (now < cdEndTime) {
            timestamps.set(userId, now);
            const timeLeft = (cdEndTime - now) / 1000;
            QuickEmbed(`Command **${command.name}** on cooldown ${timeLeft.toFixed(1)} seconds left`, message);
            return true;
        }
    }
    timestamps.set(userId, now);

    //Automatically delete timestamp just incase
    setTimeout(() => timestamps.delete(userId), cdAmount)

    //Command is not on cooldown
    return false;
}