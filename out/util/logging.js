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
const config_1 = require("../config");
var logGuild;
var logModChannel;
function initLogging(client) {
    logGuild = client.guilds.get(config_1.archiveGuildId);
    logModChannel = logGuild.channels.get(config_1.logModeratorChannelId);
}
exports.initLogging = initLogging;
function LogMessage(message, channelId) {
    return __awaiter(this, void 0, void 0, function* () {
        const logChannel = logGuild.channels.get(channelId);
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
        if (!((logChannel) => logChannel.type === 'text')(logChannel))
            return;
        logChannel.send(embed);
    });
}
exports.LogMessage = LogMessage;
function LogEditedMessage(messageBefore, messageAfter) {
    return __awaiter(this, void 0, void 0, function* () {
        const logChannel = logGuild.channels.get(config_1.logEditedMessageChannelId);
        let contentBefore = messageBefore.content.split(/ +/).join(" ");
        let contentAfter = messageAfter.content.split(/ +/).join(" ");
        const embed = new discord_js_1.RichEmbed()
            .setThumbnail(messageBefore.author.avatarURL)
            .setTitle(`Tag: ${messageBefore.member.user.tag}`)
            .setDescription(`user: ${messageBefore.member.user.username}\nid: ${messageBefore.member.id}\n\u200b`)
            .addBlankField(true)
            .addField("Channel", `**${messageBefore.channel.name}**\n`)
            .addBlankField(true);
        if (contentBefore !== "") {
            embed.addField("Before", contentBefore);
        }
        if (contentAfter !== "")
            embed.addField("After", contentAfter);
        embed.addBlankField(true)
            .setFooter(`Edited At: ${new Date(messageAfter.editedTimestamp).toUTCString()}\nCreated At: ${new Date(messageBefore.createdAt).toUTCString()}`)
            .setColor("0x#c90c58");
        messageAfter.attachments.map(file => {
            embed.addField("File", file.url, true);
        });
        if (!((logChannel) => logChannel.type === 'text')(logChannel))
            return;
        logChannel.send(embed);
    });
}
exports.LogEditedMessage = LogEditedMessage;
function LogModAction(admin, embed) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!((logModChannel) => logModChannel.type === 'text')(logModChannel))
            return;
        embed.setAuthor(`From mod: ${admin.username}`);
        logModChannel.send(embed);
    });
}
exports.LogModAction = LogModAction;
