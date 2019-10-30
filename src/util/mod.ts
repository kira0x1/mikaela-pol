import { Message, GuildMember, RichEmbed } from 'discord.js';
import { embedColor } from './Style';
import chalk from 'chalk';
import { LogModAction } from './logging';

export async function adminEmbed(message: Message, member: GuildMember, title: string, reason?: string) {
    const embed = new RichEmbed()
        .setColor(embedColor)
        .addField(title, member.user.tag, true)
        .setThumbnail(member.user.avatarURL);
    embed.addField('Reason', reason || 'none', true);
    message.channel.send(embed);

    LogModAction(message.author, embed)
}

export async function assignRole(message: Message, roleId: string, userId?: string, reason?: string, showEmbed: boolean = true) {
    let user = message.mentions.users.first()

    if (!user) {
        await message.guild.fetchMember(userId).then(member => {
            user = member.user
        }).catch(console.error)
    }

    if (user) {
        if (user.id === "177016697117474816" || user.id === "631354524405334027") return console.log(chalk.bgMagenta.bold(`${message.author.username} tried to use mod powers on ${user.username}`))
        const member = message.guild.member(user)
        if (member) {
            const role = message.guild.roles.get(roleId)
            member.addRole(role).then(() => {
                if (showEmbed)
                    adminEmbed(message, member, role.name, reason)
            }).catch(console.error)
        }
    }
}

export async function removeRole(message: Message, roleId: string, action: string, userId?: string, reason?: string, showEmbed: boolean = true) {
    let user = message.mentions.users.first()

    if (!user) {
        await message.guild.fetchMember(userId).then(member => {
            user = member.user
        }).catch(console.error)
    }

    if (user) {
        if (user.id === "177016697117474816" || user.id === "631354524405334027") return console.log(chalk.bgMagenta.bold(`${message.author.username} tried to use mod powers on ${user.username}`))
        const member = message.guild.member(user)
        if (member) {
            const role = message.guild.roles.get(roleId)
            member.removeRole(role).then(() => {
                if (showEmbed)
                    adminEmbed(message, member, action, reason)
            }).catch(console.error)
        }
    }
}