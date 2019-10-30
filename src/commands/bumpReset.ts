import { ResetBump } from '../bump';
import Command from '../classes/command';
import { LogModAction } from '../util/logging';
import { QuickEmbed } from '../util/Style';

export const command: Command = {
    name: 'bumpreset',
    usage: '[delay: 1h] [frequency: 2h]',
    aliases: ['br'],
    description: 'reset bump reminder',
    perms: ['admin'],
    args: false,
    cooldown: 6,

    execute(message, args) {
        const arg1 = args.shift() || '1s';
        const arg2 = args.shift() || '2h';

        const embed = QuickEmbed(`Reset bump reminder, starting in ${arg1}, reminding every ${arg2}`, message);
        LogModAction(message.member.user, embed);
        ResetBump(arg1, arg2)
    }
}