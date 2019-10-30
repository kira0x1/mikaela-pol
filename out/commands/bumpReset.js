"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bump_1 = require("../bump");
const logging_1 = require("../util/logging");
const Style_1 = require("../util/Style");
exports.command = {
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
        const embed = Style_1.QuickEmbed(`Reset bump reminder, starting in ${arg1}, reminding every ${arg2}`, message);
        logging_1.LogModAction(message.member.user, embed);
        bump_1.ResetBump(arg1, arg2);
    }
};
