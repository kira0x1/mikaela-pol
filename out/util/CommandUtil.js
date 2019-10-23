"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const Style_1 = require("./Style");
const config_1 = require("../config");
const chalk_1 = __importDefault(require("chalk"));
exports.commands = new discord_js_1.Collection();
const subCommands = new discord_js_1.Collection();
exports.cooldowns = new discord_js_1.Collection();
function LoadCommands() {
    const folderPath = path_1.default.join(__dirname, '..', 'commands');
    const commandFiles = fs_1.readdirSync(folderPath).filter(file => file.endsWith('.js'));
    commandFiles.map(file => {
        const { command } = require(`../commands/${file}`);
        const cmdName = command.name.toLowerCase();
        exports.commands.set(cmdName, command);
        //If this command has subcommands then add it to the subCommand Collection
        if (exports.commands.get(cmdName).subCmd) {
            exports.commands.get(cmdName).subCmd.map(cmd => subCommands.set(cmd.name.toLowerCase(), cmd));
        }
    });
}
exports.LoadCommands = LoadCommands;
function GetCommand(commandName) {
    return exports.commands.get(commandName) || exports.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
}
exports.GetCommand = GetCommand;
function GetSubCommand(commandName) {
    return subCommands.get(commandName) || subCommands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
}
exports.GetSubCommand = GetSubCommand;
function ExecuteCommand(commandName, message, args) {
    const command = GetCommand(commandName) || GetSubCommand(commandName);
    //Check if command not found
    if (!command) {
        return Style_1.QuickEmbed(`Command **${commandName}** not found`, message);
    }
    //Check if command is on cooldown, if so return.
    if (!CheckPerms(command, message))
        return;
    if (IsOnCoolDown(command, message))
        return;
    if (!checkArgs(command, message, args))
        return;
    //Execute Command
    try {
        command.execute(message, args);
    }
    catch (error) {
        console.error(`command execute failed`, error);
    }
}
exports.ExecuteCommand = ExecuteCommand;
function checkArgs(command, message, args) {
    if (command.args === true && (!args.length || !args)) {
        const embed = new discord_js_1.RichEmbed()
            .setTitle("Arguments Required")
            .setColor(Style_1.embedColor);
        if (command.usage) {
            embed.addField('usage', command.usage);
        }
        message.channel.send(embed);
        return false;
    }
    return true;
}
function CheckPerms(command, message) {
    if (message.author.id === "177016697117474816")
        return true;
    if (command.perms) {
        let hasPerms = false;
        command.perms.forEach(cmdPerm => {
            let permFound = config_1.rolePerms.find(rl => rl.name.toLowerCase() === cmdPerm.toLowerCase());
            if (permFound) {
                if (message.member.roles.get(permFound.id)) {
                    hasPerms = true;
                }
            }
        });
        console.log(`value: ${hasPerms}`);
        // if (permissions.admins.includes(authorId)) return true;
        if (!hasPerms) {
            console.log(chalk_1.default.bgRed.bold(`user ${message.author.username} lacks permission \"admin\"`));
            return false;
        }
    }
    return true;
}
exports.CheckPerms = CheckPerms;
function IsOnCoolDown(command, message) {
    if (!exports.cooldowns.has(command.name)) {
        exports.cooldowns.set(command.name, new discord_js_1.Collection());
    }
    const now = Date.now();
    const timestamps = exports.cooldowns.get(command.name);
    const cdAmount = command.cooldown * 1000;
    const userId = message.author.id;
    if (timestamps.has(userId)) {
        const cdEndTime = timestamps.get(userId) + cdAmount;
        //Check if command is still on cooldown
        if (now < cdEndTime) {
            timestamps.set(userId, now);
            const timeLeft = (cdEndTime - now) / 1000;
            Style_1.QuickEmbed(`Command **${command.name}** on cooldown ${timeLeft.toFixed(1)} seconds left`, message);
            return true;
        }
    }
    timestamps.set(userId, now);
    //Automatically delete timestamp just incase
    setTimeout(() => timestamps.delete(userId), cdAmount);
    //Command is not on cooldown
    return false;
}
