"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var CommandUtil_1 = require("../util/CommandUtil");
var Style_1 = require("../util/Style");
exports.command = {
    name: "help",
    description: "List Commands",
    aliases: ["h"],
    cooldown: 1,
    execute: function (message, args) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (args.length === 0 || !args)
                    HelpAll(message);
                else
                    HelpCommand(message, args);
                return [2 /*return*/];
            });
        });
    }
};
function HelpAll(message) {
    var fields;
    fields = CommandUtil_1.commands.filter(function (cmd) { return CommandUtil_1.CheckPerms(cmd, message); }).map(function (cmd) { return ({
        title: cmd.name,
        content: cmd.description + "\n \u200b",
        inline: false
    }); });
    Style_1.ListEmbed(message, "Commands", undefined, fields);
}
function HelpCommand(message, args) {
    var commandName = args.shift().toLowerCase();
    var command = CommandUtil_1.GetCommand(commandName);
    //Check if command is found
    if (!command)
        return Style_1.QuickEmbed("Command not found", message);
    //Check if user has permission
    if (!CommandUtil_1.CheckPerms(command, message))
        return;
    //Create embed
    var embed = new discord_js_1.RichEmbed().setColor(Style_1.embedColor);
    embed.fields.push(Style_1.createField(command.name, command.description + "\n\u200B"));
    //Check if command has subcommands
    if (command.subCmd) {
        InsertSubCommands(embed, command.subCmd);
    }
    message.channel.send(embed);
}
function InsertSubCommands(embed, subCommands) {
    //Get amound of rows for flags
    var rows = Math.ceil(subCommands.length / 3);
    console.log("about to enter for loop");
    var count = 0;
    //Add command flags
    for (var row = 0; row < rows; row++) {
        for (var col = 0; col < 3; col++) {
            if (count >= subCommands.length) {
                embed.fields.push(Style_1.createEmptyField(true));
            }
            else {
                var aliases = 'aliases: none';
                if (subCommands[count].aliases !== undefined)
                    aliases = subCommands[count].aliases.join(", ");
                embed.fields.push(Style_1.createField(subCommands[count].name, aliases, true));
            }
            count++;
        }
    }
}
