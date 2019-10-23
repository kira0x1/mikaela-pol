import { Message, GuildMember, RichEmbed } from 'discord.js';
import { embedColor } from './Style';

export async function adminEmbed(message: Message, member: GuildMember, title: string, reason?: string) {
    const embed = new RichEmbed()
        .setColor(embedColor)
        .addField(title, member.user.tag, true)
        .setThumbnail(member.user.avatarURL);
    embed.addField('Reason', reason || 'none', true);
    message.channel.send(embed);
}

export async function assignRole(message: Message, roleId: string, userId?: string, reason?: string) {
    let user = message.mentions.users.first()

    if (!user) {
        await message.guild.fetchMember(userId).then(member => {
            user = member.user
        }).catch(console.error)
    }

    if (user) {
        const member = message.guild.member(user)
        if (member) {
            const role = message.guild.roles.get(roleId)
            member.addRole(role).then(() => {
                adminEmbed(message, member, role.name, reason)
            }).catch(console.error)
        }
    }
}

export async function removeRole(message: Message, roleId: string, action: string, userId?: string, reason?: string) {
    let user = message.mentions.users.first()

    if (!user) {
        await message.guild.fetchMember(userId).then(member => {
            user = member.user
        }).catch(console.error)
    }

    if (user) {
        const member = message.guild.member(user)
        if (member) {
            const role = message.guild.roles.get(roleId)
            member.removeRole(role).then(() => {
                adminEmbed(message, member, action, reason)
            }).catch(console.error)
        }
    }
}