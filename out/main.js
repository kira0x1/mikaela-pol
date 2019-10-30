"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const discord_js_1 = require("discord.js");
const bump_1 = require("./bump");
const config_1 = require("./config");
const database_1 = require("./db/database");
const logging_1 = require("./util/logging");
const rolePersist_1 = require("./rolePersist");
const CommandUtil_1 = require("./util/CommandUtil");
const wordmod_1 = require("./util/wordmod");
const client = new discord_js_1.Client();
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        yield database_1.dbinit();
        CommandUtil_1.LoadCommands();
        client.login(config_1.token);
    });
}
client.on('ready', () => {
    console.log(chalk_1.default.bgCyan.bold(`${client.user.username} online!`));
    logging_1.initLogging(client);
    bump_1.initBump(client);
});
client.on('guildMemberAdd', member => {
    if (member.guild.id !== config_1.polGuildId)
        return;
    rolePersist_1.syncMemberRoles(member);
});
client.on('guildMemberRemove', member => {
    if (member.guild.id !== config_1.polGuildId)
        return;
    rolePersist_1.setMemberRoles(member);
});
client.on('roleUpdate', (oldRole, newRole) => {
    if (oldRole === undefined)
        return;
    console.log(chalk_1.default.bgRed.bold(`Role Updated: ${oldRole.name}`));
});
client.on('messageDelete', message => {
    logging_1.LogMessage(message, config_1.logDeletedMessagesChannelId);
});
client.on('messageUpdate', (oldMsg, newMsg) => {
    if (oldMsg.author.bot)
        return;
    if (newMsg && newMsg.edits) {
        logging_1.LogEditedMessage(oldMsg, newMsg);
    }
});
client.on('message', message => {
    if (message.author.id !== client.user.id && message.guild.id === config_1.polGuildId) {
        logging_1.LogMessage(message, config_1.logMessagesChannelId);
        wordmod_1.CheckWord(message);
    }
    if (message.author.bot || !message.content.startsWith(config_1.prefix))
        return;
    const args = message.content.slice(config_1.prefix.length).split(/ +/);
    let commandName = (args.shift() || '').toLowerCase();
    if (commandName === '' || commandName.startsWith(config_1.prefix))
        return;
    CommandUtil_1.ExecuteCommand(commandName, message, args);
});
init();
