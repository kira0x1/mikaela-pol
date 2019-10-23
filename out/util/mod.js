"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Style_1 = require("./Style");
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
function assignRole(message, roleId, userId, reason) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = message.mentions.users.first();
        if (!user) {
            yield message.guild.fetchMember(userId).then(member => {
                user = member.user;
            }).catch(console.error);
        }
        if (user) {
            const member = message.guild.member(user);
            if (member) {
                const role = message.guild.roles.get(roleId);
                member.addRole(role).then(() => {
                    adminEmbed(message, member, role.name, reason);
                }).catch(console.error);
            }
        }
    });
}
exports.assignRole = assignRole;
function removeRole(message, roleId, action, userId, reason) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = message.mentions.users.first();
        if (!user) {
            yield message.guild.fetchMember(userId).then(member => {
                user = member.user;
            }).catch(console.error);
        }
        if (user) {
            const member = message.guild.member(user);
            if (member) {
                const role = message.guild.roles.get(roleId);
                member.removeRole(role).then(() => {
                    adminEmbed(message, member, action, reason);
                }).catch(console.error);
            }
        }
    });
}
exports.removeRole = removeRole;
