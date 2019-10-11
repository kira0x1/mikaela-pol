import { Message } from 'discord.js';
import { Command } from '../classes/command';
import { users } from '../db/dbUser';
import { createField, ListEmbed } from '../util/Style';

const command: Command = {
    name: 'test',
    aliases: ['t'],
    cooldown: 4,

    async execute(message: Message, args: Array<string>) {
        const fields = [];

        users.forEach(usr => {
            console.log(`usr: ${usr.tag}, id: ${usr.id}`)
            fields.push(createField(usr.tag, `id: ${usr.id}`))
        })

        ListEmbed(message, `Users`, `listing users`, fields)
    }
}

module.exports = command