"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const CommandUtil_1 = require("../util/CommandUtil");
const Style_1 = require("../util/Style");
exports.command = {
    name: "help",
    description: "List Commands",
    aliases: ["h", "commands"],
    cooldown: 1,
    execute(message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (args.length === 0 || !args)
                HelpAll(message);
            else
                HelpCommand(message, args);
        });
    }
};
function HelpAll(message) {
    let fields;
    fields = CommandUtil_1.commands.filter(cmd => CommandUtil_1.CheckPerms(cmd, message)).map(cmd => ({
        title: cmd.name,
        content: cmd.description + "\n \u200b",
        inline: false
    }));
    Style_1.ListEmbed(message, "Commands", undefined, fields);
}
function HelpCommand(message, args) {
    return __awaiter(this, void 0, void 0, function* () {
        const commandName = args.shift().toLowerCase();
        const command = CommandUtil_1.GetCommand(commandName) || CommandUtil_1.GetSubCommand(commandName);
        //Check if command is found
        if (!command)
            return Style_1.QuickEmbed(`Command not found`, message);
        //Check if user has permission
        if (!CommandUtil_1.CheckPerms(command, message))
            return;
        //Create embed
        const embed = new discord_js_1.RichEmbed().setColor(Style_1.embedColor);
        embed.fields.push(Style_1.createField(command.name, command.description + `\n\u200b`));
        if (command.aliases) {
            let aliases = [];
            command.aliases.map(al => aliases.push(al));
            embed.addField("Aliases", aliases.join(', '), false);
        }
        //Check if command has subcommands
        if (command.subCmd) {
            embed.fields.push(Style_1.createEmptyField(true));
            InsertSubCommands(embed, command.subCmd);
        }
        message.channel.send(embed);
    });
}
exports.HelpCommand = HelpCommand;
function InsertSubCommands(embed, subCommands) {
    //Get amound of rows for flags
    const rows = Math.ceil(subCommands.length / 3);
    let count = 0;
    //Add command flags
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < 3; col++) {
            if (count >= subCommands.length) {
                embed.fields.push(Style_1.createEmptyField(true));
            }
            else {
                let aliases = 'aliases: none';
                if (subCommands[count].aliases !== undefined)
                    aliases = subCommands[count].aliases.join(", ");
                embed.fields.push(Style_1.createField(subCommands[count].name, aliases, true));
            }
            count++;
        }
    }
}
function InsertAliases(embed, aliases) {
    //Get amound of rows for flags
    const rows = Math.ceil(aliases.length / 3);
    let count = 0;
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < 3; col++) {
            if (count >= aliases.length) {
                embed.fields.push(Style_1.createEmptyField(true));
            }
            else {
                embed.fields.push(Style_1.createField(aliases[count], "\u200b", false));
            }
            count++;
        }
    }
}
