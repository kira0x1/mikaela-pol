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
const config_1 = require("./config");
const database_1 = require("./db/database");
const rolePersist_1 = require("./rolePersist");
const CommandUtil_1 = require("./util/CommandUtil");
const bump_1 = require("./bump");
const client = new discord_js_1.Client();
var logGuild;
var testingChannel;
var logMessageChannel;
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        yield database_1.dbinit();
        CommandUtil_1.LoadCommands();
        client.login(config_1.token);
    });
}
client.on('ready', () => {
    console.log(chalk_1.default.bgCyan.bold(`${client.user.username} online!`));
    logGuild = client.guilds.get(config_1.archiveGuildId);
    testingChannel = logGuild.channels.get(config_1.testingChannelId);
    logMessageChannel = logGuild.channels.get(config_1.logMessagesChannelId);
    bump_1.initBump(client);
});
client.on('guildMemberAdd', member => {
    if (member.guild.id !== config_1.polGuildId)
        return;
    rolePersist_1.setMemberRoles(member);
});
client.on('guildMemberRemove', member => {
    if (member.guild.id !== config_1.polGuildId)
        return;
    rolePersist_1.updateMemberRoles(member);
});
client.on('roleUpdate', (oldRole, newRole) => {
    if (oldRole === undefined)
        return;
    console.log(chalk_1.default.bgRed.bold(`Role Updated: ${oldRole.name}`));
});
client.on('message', message => {
    if (message.author.id !== client.user.id && message.guild.id === config_1.polGuildId)
        LogMessage(message);
    if (message.author.bot || !message.content.startsWith(config_1.prefix))
        return;
    const args = message.content.slice(config_1.prefix.length).split(/ +/);
    let commandName = (args.shift() || '').toLowerCase();
    if (commandName === '' || commandName.startsWith(config_1.prefix))
        return;
    CommandUtil_1.ExecuteCommand(commandName, message, args);
});
function LogMessage(message) {
    let msglog = {
        username: message.author.username,
        tag: message.author.tag,
        nickname: message.member.displayName,
        id: message.author.id,
        content: message.content,
        timestamp: new Date(message.createdTimestamp).toUTCString(),
        channel: {
            name: message.channel.name,
            id: message.channel.id
        }
    };
    let contentString = msglog.content.split(/ +/).join(" ");
    const embed = new discord_js_1.RichEmbed()
        .setThumbnail(message.author.avatarURL)
        .setTitle(`Tag: ${msglog.tag}`)
        .setDescription(`user: ${msglog.username}\nid: ${msglog.id}\n\u200b`)
        .addBlankField(true)
        .addField("Channel", `**${msglog.channel.name}**\n`)
        .addBlankField(true);
    if (contentString !== "") {
        embed.addField("Content", contentString, true);
    }
    embed.addBlankField(true)
        .setFooter(`Timestamp: ${msglog.timestamp}`)
        .setColor("0x#c90c58");
    message.attachments.map(file => {
        embed.addField("File", file.url, true);
    });
    // if (!((testingChannel): testingChannel is TextChannel => testingChannel.type === 'text')(testingChannel)) return;
    if (!((logMessageChannel) => logMessageChannel.type === 'text')(logMessageChannel))
        return;
    logMessageChannel.send(embed);
}
init();
