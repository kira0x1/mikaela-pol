import chalk from 'chalk';
import { Message } from 'discord.js';
import Command from "../classes/command";
import { HelpCommand } from './help';
import { removeRole, assignRole } from '../util/mod';
import { banPerms } from '../config';

const allowImg: Command = {
    name: 'allowimg',
    aliases: ["unbanimg"],
    usage: "[ mention | id ]",
    args: true,
    perms: ["admin"],

    async execute(message, args) {
        removeRole(message, banPerms.get("img perm denied"), "Allow Image", args.shift(), args.join(" "))
    }
}
const denyImage: Command = {
    name: 'denyImage',
    aliases: ["banimg"],
    usage: "[ mention | id ]",
    args: true,
    perms: ["admin"],

    async execute(message, args) {
        assignRole(message, banPerms.get("img perm denied"), args.shift(), args.join(" "))
    }
}
const brig: Command = {
    name: "brig",
    description: "Throw a member into the brig",
    usage: "[ mention | id ]",
    perms: ["admin"],
    args: true,

    async execute(message, args) {
        assignRole(message, banPerms.get("brig"), args.shift(), args.join(" "))
    }
}
const unbrig: Command = {
    name: "unbrig",
    description: "Unbrig a member",
    usage: "[ mention | id ]",
    perms: ["admin"],
    args: true,

    async execute(message, args) {
        removeRole(message, banPerms.get("brig"), "unbrig", args.shift(), args.join(" "))
    }
}
const radioActive: Command = {
    name: "radioactive",
    description: "Make a member radio active",
    aliases: ["radio", "rad"],
    usage: "[ mention | id ]",
    perms: ["admin"],
    args: true,

    async execute(message, args) {
        assignRole(message, banPerms.get("radioactive"), args.shift(), args.join(" "))
    }
}
const txtMute: Command = {
    name: 'txtmute',
    description: 'Deny user from sending messages',
    args: true,
    usage: "[ mention | id ]",
    perms: ["admin"],

    async execute(message, args) {
        assignRole(message, banPerms.get("txtmute"), args.shift(), args.join(" "))
    }
}
const unmuteTxt: Command = {
    name: 'unmutetxt',
    description: 'Allow user to send messages',
    args: true,
    usage: "[ mention | id ]",
    perms: ["admin"],

    async execute(message, args) {
        removeRole(message, banPerms.get("txtmute"), "txt unmute", args.shift(), args.join(" "))
    }
}
const muteVoice: Command = {
    name: "voicemute",
    description: "",
    aliases: ['vmute', 'vm', 'mutevoice'],
    perms: ['admin'],
    args: true,

    async execute(message, args) {
        assignRole(message, banPerms.get("vcmute"), args.shift(), args.join(" "))
    }
}
const unMuteVoice: Command = {
    name: 'unmuteVC',
    description: "Unmutes the user in voice",
    aliases: ['unsilence', 'unmute'],
    args: true,
    perms: ['admin'],

    async execute(message, args) {
        removeRole(message, banPerms.get("vcmute"), "unmute", args.shift(), args.join(" "))
    }
}
const unRadioActive: Command = {
    name: "unradioactive",
    description: "Remove the radioactive role from a member",
    aliases: ["unradio", "unrad"],
    usage: "[ mention | id ]",
    perms: ["admin"],
    args: true,

    async execute(message, args) {
        removeRole(message, banPerms.get("radioactive"), "un radioactive", args.shift(), args.join(" "))
    }
}

export const command: Command = {
    name: 'admin',
    aliases: ['sys'],
    description: 'Admin Commands',
    perms: ['admin'],
    subCmd: [
        allowImg, denyImage, brig,
        unbrig, radioActive, txtMute,
        unmuteTxt, muteVoice, unMuteVoice, unRadioActive
    ],

    async execute(message: Message, args: string[]) {
        HelpCommand(message, ['admin'])
        console.log(chalk.cyan.bold(`Admin command called`))
    }
}