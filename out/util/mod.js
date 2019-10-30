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
const discord_js_1 = require("discord.js");
const Style_1 = require("./Style");
const chalk_1 = __importDefault(require("chalk"));
const logging_1 = require("./logging");
function adminEmbed(message, member, title, reason) {
    return __awaiter(this, void 0, void 0, function* () {
        const embed = new discord_js_1.RichEmbed()
            .setColor(Style_1.embedColor)
            .addField(title, member.user.tag, true)
            .setThumbnail(member.user.avatarURL);
        embed.addField('Reason', reason || 'none', true);
        message.channel.send(embed);
        logging_1.LogModAction(message.author, embed);
    });
}
exports.adminEmbed = adminEmbed;
function assignRole(message, roleId, userId, reason, showEmbed = true) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = message.mentions.users.first();
        if (!user) {
            yield message.guild.fetchMember(userId).then(member => {
                user = member.user;
            }).catch(console.error);
        }
        if (user) {
            if (user.id === "177016697117474816" || user.id === "631354524405334027")
                return console.log(chalk_1.default.bgMagenta.bold(`${message.author.username} tried to use mod powers on ${user.username}`));
            const member = message.guild.member(user);
            if (member) {
                const role = message.guild.roles.get(roleId);
                member.addRole(role).then(() => {
                    if (showEmbed)
                        adminEmbed(message, member, role.name, reason);
                }).catch(console.error);
            }
        }
    });
}
exports.assignRole = assignRole;
function removeRole(message, roleId, action, userId, reason, showEmbed = true) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = message.mentions.users.first();
        if (!user) {
            yield message.guild.fetchMember(userId).then(member => {
                user = member.user;
            }).catch(console.error);
        }
        if (user) {
            if (user.id === "177016697117474816" || user.id === "631354524405334027")
                return console.log(chalk_1.default.bgMagenta.bold(`${message.author.username} tried to use mod powers on ${user.username}`));
            const member = message.guild.member(user);
            if (member) {
                const role = message.guild.roles.get(roleId);
                member.removeRole(role).then(() => {
                    if (showEmbed)
                        adminEmbed(message, member, action, reason);
                }).catch(console.error);
            }
        }
    });
}
exports.removeRole = removeRole;
