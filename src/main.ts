import { Client, Message, Guild, GuildChannel, RichEmbed, TextChannel } from 'discord.js';
import { ExecuteCommand, LoadCommands } from './util/CommandUtil';
import { prefix, token, archiveGuildId, testingChannelId, logMessagesChannelId } from './config';
import { dbinit as LoadDB } from './db/database';
import chalk from 'chalk'

const client = new Client();

var logGuild: Guild
var testingChannel: TextChannel
var logMessageChannel: TextChannel

async function init() {
    // await LoadDB();
    await LoadCommands();
    client.login(token);
}

client.on('ready', () => {
    console.log(chalk.bgCyan.bold(`${client.user.username} online!`))

    logGuild = client.guilds.get(archiveGuildId);
    testingChannel = logGuild.channels.get(testingChannelId)
    logMessageChannel = logGuild.channels.get(logMessagesChannelId)
})

client.on('message', message => {
    if (message.author.id !== client.user.id)
        LogMessage(message);

    if (message.author.bot || !message.content.startsWith(prefix))
        return;

    const args = message.content.slice(prefix.length).split(/ +/)
    let commandName: string = (args.shift() || '').toLowerCase();
    if (commandName === '' || commandName.startsWith(prefix)) return;
    ExecuteCommand(commandName, message, args);
})

function LogMessage(message: Message) {
    let msglog: IMessageLog = {
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
    }

    const embed = new RichEmbed()
        .setThumbnail(message.author.avatarURL)
        .setTitle(`Tag: ${msglog.tag}`)
        .setDescription(`user: ${msglog.username}\nid: ${msglog.id}\n\u200b`)
        .addBlankField(true)
        .addField("Channel", `**${msglog.channel.name}**\n\u200b`, true)
        .addBlankField(true)
        .addField("Content", msglog.content.split(/ +/).join(" ") || "**EMPTY**", true)
        .addBlankField(true)
        .setFooter(`Timestamp: ${msglog.timestamp}`)
        .setColor("0x#c90c58")

    logMessageChannel.send(embed)
}

interface IMessageLog {
    username: string,
    nickname: string,
    tag: string,
    id: string,
    content: string,
    timestamp: string,

    channel: IChannel
}

interface IChannel {
    name: string,
    id: string
}


init();