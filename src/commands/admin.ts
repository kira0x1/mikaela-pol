import chalk from 'chalk';
import { Message, GuildMember, BanOptions, RichEmbed, Guild } from 'discord.js';
import Command from "../classes/command";
import { addUser, updateUser, deleteUser } from '../db/userController';
import { IUser } from '../db/user';
import { HelpCommand } from './help';
import { embedColor } from '../util/Style';

// Sub-Command List Users
const listUsers: Command = {
    name: 'listUsers',
    aliases: ['lsu'],
    perms: ['admin'],

    execute(message, args) {
        message.channel.send("ls users called")
    }
}

const deleteMe: Command = {
    name: 'deleteMe',
    aliases: ['dl'],
    perms: ['admin'],
    async execute(message, args) {
        const author = message.author;

        const user: IUser = {
            username: author.username,
            tag: author.tag,
            id: author.id,
            roles: []
        }

        deleteUser(author.tag).then(res => console.log(res)).catch(err => console.error(err))
    }
}

const testAdd: Command = {
    name: 'testAdd',
    aliases: ['ta'],
    perms: ['admin'],

    async execute(message, args) {
        const author = message.author;

        const user: IUser = {
            username: author.username,
            tag: author.tag,
            id: author.id,
            roles: []
        }

        message.client.emit('guildMemberAdd', message.member)
        return

        message.client.guilds.get("628013859776626708")
            .members.get(author.id)
            .roles.map(rl => user.roles.push({ name: rl.name, id: rl.id }))

        // addUser(user)
        //     .then(user => console.log(`created new user`, user))
        //     .catch(err => console.error(err))

        updateUser(user.id, user)
            .then(user => console.log(`updated user`, user))
            .catch(err => console.error(err))
    }
}

const ban: Command = {
    name: 'Ban',
    args: true,
    description: 'Ban user by id or mention',
    usage: '[id | @user]',
    cooldown: 1,

    async execute(message, args) {
        let user = undefined

        if (message.mentions.members.first() !== undefined) {
            user = message.mentions.members.first();
        }
        else {
            let id = args.shift()
            message.guild.fetchMember(id).then(member => {
                banMember(message, member)
            }).catch(err => {
                message.channel.send(`Cannot find id ${id}`)
            })
        }
    }
}

const kick: Command = {
    name: 'Kick',
    args: true,
    description: 'Kick user by id or mention',
    usage: '[id | @user]',
    cooldown: 1,

    async execute(message, args) {
        let user = undefined

        if (message.mentions.members.first() !== undefined) {
            user = message.mentions.members.first();
        }
        else {
            let id = args.shift()
            message.guild.fetchMember(id).then(member => {
                let reason: string | undefined = undefined

                if (args.length) {
                    reason = args.shift()
                }

                kickMember(message, member, reason)
            }).catch(err => {
                message.channel.send(`Cannot find id ${id}`)
            })
        }
    }
}

export async function adminEmbed(message: Message, member: GuildMember, title: string, reason?: string) {
    const embed = new RichEmbed()
        .setColor(embedColor)
        .addField(title, member.user.tag, true)
        .setThumbnail(member.user.avatarURL)

    embed.addField('Reason', reason || 'none', true)
    message.channel.send(embed)
}

async function kickMember(message: Message, member: GuildMember, reason?: string | undefined) {
    if (!member.kickable) {
        //TODO FEEDBACK
    }

    return adminEmbed(message, member, 'Kicking', reason)

    member.kick(reason).then(guildMember => {
        adminEmbed(message, member, `Kicking user ${member.displayName}`, reason)
    }).catch(err => {
        message.channel.send(`error trying to kick user:\n${err}`)
    })
}

async function banMember(message: Message, member: GuildMember, reason?: string, days?: number) {
    if (!member.bannable) {
        //TODO FEEDBACK
    }

    return adminEmbed(message, member, 'Banning', reason)

    let options: BanOptions = { reason: reason, days: days }
    member.ban(options).then(guildMember => {
        adminEmbed(message, member, 'Banning', reason)
    }).catch(err => {
        message.channel.send(`error trying to ban user:\n${err}`)
    })
}

export const command: Command = {
    name: 'admin',
    aliases: ['sys'],
    description: 'Admin Commands',
    perms: ['admin'],
    subCmd: [],

    async execute(message: Message, args: string[]) {
        HelpCommand(message, ['admin'])
        console.log(chalk.cyan.bold(`Admin command called`))
    }
}