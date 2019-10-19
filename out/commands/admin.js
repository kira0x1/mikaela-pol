"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const discord_js_1 = require("discord.js");
const userController_1 = require("../db/userController");
const help_1 = require("./help");
const Style_1 = require("../util/Style");
// Sub-Command List Users
const listUsers = {
    name: 'listUsers',
    aliases: ['lsu'],
    perms: ['admin'],
    execute(message, args) {
        message.channel.send("ls users called");
    }
};
const deleteMe = {
    name: 'deleteMe',
    aliases: ['dl'],
    perms: ['admin'],
    execute(message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const author = message.author;
            const user = {
                username: author.username,
                tag: author.tag,
                id: author.id,
                roles: []
            };
            userController_1.deleteUser(author.tag).then(res => console.log(res)).catch(err => console.error(err));
        });
    }
};
const testAdd = {
    name: 'testAdd',
    aliases: ['ta'],
    perms: ['admin'],
    execute(message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const author = message.author;
            const user = {
                username: author.username,
                tag: author.tag,
                id: author.id,
                roles: []
            };
            message.client.emit('guildMemberAdd', message.member);
            return;
            message.client.guilds.get("628013859776626708")
                .members.get(author.id)
                .roles.map(rl => user.roles.push({ name: rl.name, id: rl.id }));
            // addUser(user)
            //     .then(user => console.log(`created new user`, user))
            //     .catch(err => console.error(err))
            userController_1.updateUser(user.id, user)
                .then(user => console.log(`updated user`, user))
                .catch(err => console.error(err));
        });
    }
};
const ban = {
    name: 'Ban',
    args: true,
    description: 'Ban user by id or mention',
    usage: '[id | @user]',
    cooldown: 1,
    execute(message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = undefined;
            if (message.mentions.members.first() !== undefined) {
                user = message.mentions.members.first();
            }
            else {
                let id = args.shift();
                message.guild.fetchMember(id).then(member => {
                    banMember(message, member);
                }).catch(err => {
                    message.channel.send(`Cannot find id ${id}`);
                });
            }
        });
    }
};
const kick = {
    name: 'Kick',
    args: true,
    description: 'Kick user by id or mention',
    usage: '[id | @user]',
    cooldown: 1,
    execute(message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = undefined;
            if (message.mentions.members.first() !== undefined) {
                user = message.mentions.members.first();
            }
            else {
                let id = args.shift();
                message.guild.fetchMember(id).then(member => {
                    let reason = undefined;
                    if (args.length) {
                        reason = args.shift();
                    }
                    kickMember(message, member, reason);
                }).catch(err => {
                    message.channel.send(`Cannot find id ${id}`);
                });
            }
        });
    }
};
function adminEmbed(message, member, title, reason) {
    return __awaiter(this, void 0, void 0, function* () {
        const embed = new discord_js_1.RichEmbed()
            .setColor(Style_1.embedColor)
            .addField(title, member.user.tag, true)
            .setThumbnail(member.user.avatarURL);
        embed.addField('Reason', reason || 'none', true);
        message.channel.send(embed);
    });
}
exports.adminEmbed = adminEmbed;
function kickMember(message, member, reason) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!member.kickable) {
            //TODO FEEDBACK
        }
        return adminEmbed(message, member, 'Kicking', reason);
        member.kick(reason).then(guildMember => {
            adminEmbed(message, member, `Kicking user ${member.displayName}`, reason);
        }).catch(err => {
            message.channel.send(`error trying to kick user:\n${err}`);
        });
    });
}
function banMember(message, member, reason, days) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!member.bannable) {
            //TODO FEEDBACK
        }
        return adminEmbed(message, member, 'Banning', reason);
        let options = { reason: reason, days: days };
        member.ban(options).then(guildMember => {
            adminEmbed(message, member, 'Banning', reason);
        }).catch(err => {
            message.channel.send(`error trying to ban user:\n${err}`);
        });
    });
}
exports.command = {
    name: 'admin',
    aliases: ['sys'],
    description: 'Admin Commands',
    perms: ['admin'],
    subCmd: [],
    execute(message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            help_1.HelpCommand(message, ['admin']);
            console.log(chalk_1.default.cyan.bold(`Admin command called`));
        });
    }
};
