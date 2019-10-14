import { Message } from 'discord.js';
import { Command } from '../classes/command';

export const command: Command = {
    name: 'test',
    description: 'Test Command',
    aliases: ['t'],
    cooldown: 4,

    async execute(message: Message, args: Array<string>) {
    }
}