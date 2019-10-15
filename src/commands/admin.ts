import chalk from 'chalk';
import { Message } from 'discord.js';
import Command from "../classes/command";
import { addUser, updateUser, deleteUser } from '../db/userController';
import { IUser } from '../db/user';

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


export const command: Command = {
    name: 'admin',
    aliases: ['sys'],
    description: 'Admin',
    perms: ['admin'],
    subCmd: [listUsers, testAdd, deleteMe],

    async execute(message: Message, args: string[]) {
        console.log(chalk.cyan.bold(`Admin command called`))
    }
}