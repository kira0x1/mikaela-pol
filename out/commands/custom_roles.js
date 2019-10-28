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
const Style_1 = require("../util/Style");
const customRoles = [
    {
        id: "605510163490799616", reactionId: "638245041629822976"
    }
];
exports.command = {
    name: 'customRoles',
    aliases: ['croles'],
    description: "Setup for custom roles",
    perms: ["admin"],
    hidden: true,
    cooldown: 20,
    execute(message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            customRoles.map((cr) => __awaiter(this, void 0, void 0, function* () {
                const role = message.guild.roles.get(cr.id);
                if (!role)
                    return console.log(chalk_1.default.bgRed.bold("Error trying get role"));
                const embed = new discord_js_1.RichEmbed()
                    .setTitle(role.name)
                    .setColor(Style_1.embedColor);
                const msg = yield message.channel.send(embed);
                if (msg instanceof (discord_js_1.Message)) {
                    yield addReaction(msg, cr.reactionId);
                }
            }));
            function addReaction(msg, reactionId) {
                return __awaiter(this, void 0, void 0, function* () {
                    const emoji = msg.guild.emojis.get(reactionId);
                    const filter = (reaction, user) => {
                        return reaction.emoji.name === emoji.name && !user.bot;
                    };
                    msg.react(emoji);
                    const collector = msg.createReactionCollector(filter);
                    collector.on("collect", (reaction, ReactionCollector) => __awaiter(this, void 0, void 0, function* () {
                        const user = reaction.users.last();
                        const roleId = customRoles.find(cr => cr.reactionId === reaction.emoji.id).id;
                        const member = msg.guild.members.get(user.id);
                        if (member.roles.find(rl => rl.id === roleId)) {
                            console.log(chalk_1.default.bgMagenta.bold(`Removed role from user ${user.username}`));
                            member.removeRole(roleId);
                        }
                        else {
                            console.log(chalk_1.default.bgGreen.bold(`Added role from user ${user.username}`));
                            msg.guild.members.get(user.id).addRole(roleId);
                        }
                    }));
                });
            }
        });
    }
};
