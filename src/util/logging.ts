import { Message, RichEmbed, TextChannel, Guild, GuildChannel, Client, GuildMember, User } from 'discord.js';
import IMessageLog from '../classes/IMessageLog';
import { archiveGuildId, logMessagesChannelId, logModeratorChannelId, logEditedMessageChannelId } from '../config';

var logGuild: Guild
var logModChannel: TextChannel | GuildChannel

export function initLogging(client: Client) {
    logGuild = client.guilds.get(archiveGuildId);
    logModChannel = logGuild.channels.get(logModeratorChannelId)
}

export async function LogMessage(message: Message, channelId: string) {
    const logChannel = logGuild.channels.get(channelId)

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
        .addField("Channel", `**${msglog.channel.name}**\n`)
        .addBlankField(true)

    if (contentString !== "") { embed.addField("Content", contentString, true) }

    embed.addBlankField(true)
        .setFooter(`Timestamp: ${msglog.timestamp}`)
        .setColor("0x#c90c58")

    message.attachments.map(file => {
        embed.addField("File", file.url, true)
    })

    if (!((logChannel): logChannel is TextChannel => logChannel.type === 'text')(logChannel)) return;
    logChannel.send(embed)
}

export async function LogEditedMessage(messageBefore: Message, messageAfter: Message) {
    const logChannel = logGuild.channels.get(logEditedMessageChannelId)

    let contentBefore = messageBefore.content.split(/ +/).join(" ")
    let contentAfter = messageAfter.content.split(/ +/).join(" ")

    const embed = new RichEmbed()
        .setThumbnail(messageBefore.author.avatarURL)
        .setTitle(`Tag: ${messageBefore.member.user.tag}`)
        .setDescription(`user: ${messageBefore.member.user.username}\nid: ${messageBefore.member.id}\n\u200b`)
        .addBlankField(true)
        .addField("Channel", `**${messageBefore.channel.name}**\n`)
        .addBlankField(true)

    if (contentBefore !== "") { embed.addField("Before", contentBefore) }
    if (contentAfter !== "")
        embed.addField("After", contentAfter)

    embed.addBlankField(true)
        .setFooter(`Edited At: ${new Date(messageAfter.editedTimestamp).toUTCString()}\nCreated At: ${new Date(messageBefore.createdAt).toUTCString()}`)
        .setColor("0x#c90c58")

    messageAfter.attachments.map(file => {
        embed.addField("File", file.url, true)
    })

    if (!((logChannel): logChannel is TextChannel => logChannel.type === 'text')(logChannel)) return;
    logChannel.send(embed)
}

export async function LogModAction(admin: User, embed: RichEmbed) {
    if (!((logModChannel): logModChannel is TextChannel => logModChannel.type === 'text')(logModChannel)) return;
    embed.setAuthor(`From mod: ${admin.username}`)
    logModChannel.send(embed)
}