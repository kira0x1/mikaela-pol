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
const userController_1 = require("./db/userController");
const config_1 = require("./config");
function setMemberRoles(member) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = {
            username: member.user.username, tag: member.user.tag, id: member.id, roles: []
        };
        userController_1.getUser(user.tag).then(userFound => {
            console.log(`found existing user.. ${user.tag}`);
            member.roles.map(rl => user.roles.push({ name: rl.name, id: rl.id }));
            userController_1.updateUser(user.tag, user);
        }).catch(err => {
            member.roles.map(rl => {
                if (config_1.PersistantRoles.find(prole => prole.id === rl.id)) {
                    user.roles.push({ name: rl.name, id: rl.id });
                }
            });
            console.log(`user ${user.tag} does not exist, creating user now`);
            userController_1.addUser(user);
        });
    });
}
exports.setMemberRoles = setMemberRoles;
//Used to sync left member with their saved roles
function syncMemberRoles(member) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = {
            username: member.user.username, tag: member.user.tag, id: member.id, roles: []
        };
        userController_1.getUser(user.tag).then(userFound => {
            console.log(`found existing user.. ${user.tag}`);
            const roles = new discord_js_1.Collection();
            if (!(userFound instanceof discord_js_1.GuildMember))
                return;
            userFound.roles.map(rl => {
                roles.set(rl.id, member.guild.roles.get(rl.id));
            });
            member.setRoles(roles);
        }).catch(err => {
            member.roles.map(rl => user.roles.push({ name: rl.name, id: rl.id }));
            console.log(`user ${user.tag} does not exist, creating user now`);
            userController_1.addUser(user);
        });
    });
}
exports.syncMemberRoles = syncMemberRoles;
