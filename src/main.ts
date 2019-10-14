import { Client, Message, Guild, RichEmbed, TextChannel, GuildChannel } from 'discord.js';
import { ExecuteCommand, LoadCommands } from './util/CommandUtil';
import { prefix, token, archiveGuildId, testingChannelId, logMessagesChannelId } from './config';
import { dbinit as LoadDB } from './db/database';
import chalk from 'chalk'
import IMessageLog from './classes/IMessageLog';

const client = new Client();

var logGuild: Guild
var testingChannel: TextChannel | GuildChannel
var logMessageChannel: TextChannel | GuildChannel

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
    if (message.author.id !== client.user.id && message.guild.id !== archiveGuildId)
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

    let contentString = msglog.content.split(/ +/).join(" ")

    const embed = new RichEmbed()
        .setThumbnail(message.author.avatarURL)
        .setTitle(`Tag: ${msglog.tag}`)
        .setDescription(`user: ${msglog.username}\nid: ${msglog.id}\n\u200b`)
        .addBlankField(true)
        .addField("Channel", `**${msglog.channel.name}**\n\u200b`, true)
        .addBlankField(true)

    if (contentString !== "") { embed.addField("Content", contentString, true) }

    embed.addBlankField(true)
        .setFooter(`Timestamp: ${msglog.timestamp}`)
        .setColor("0x#c90c58")

    message.attachments.map(file => {
        console.log(file);
    })

    if (!((testingChannel): testingChannel is TextChannel => testingChannel.type === 'text')(testingChannel)) return;
    // if (!((logMessageChannel): logMessageChannel is TextChannel => logMessageChannel.type === 'text')(logMessageChannel)) return;
    testingChannel.send(embed)
}

init();