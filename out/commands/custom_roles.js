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
const Style_1 = require("../util/Style");
const customRoles = [
    {
        "title": "Systems of Government",
        "roles": [
            { name: "Unitary", id: "605510163490799616", emoji: "💂🏻" },
            { name: "Federal", id: "605510163490799616", emoji: "🔰" },
        ]
    }, {
        "title": "Pronouns",
        "roles": [
            { name: "He/Him/His", id: "605510163490799616", emoji: "🔵" },
            { name: "She/Her/Hers", id: "605510163490799616", emoji: "🔴" },
            { name: "They/Them/Theirs", id: "605510163490799616", emoji: "⚫" }
        ]
    }
];
exports.command = {
    name: 'customRoles',
    aliases: ['croles'],
    description: "Setup for custom roles",
    perms: ["admin"],
    hidden: true,
    cooldown: 1,
    execute(message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            customRoles.forEach((roleCategory) => __awaiter(this, void 0, void 0, function* () {
                const embed = new discord_js_1.RichEmbed()
                    .setColor(Style_1.embedColor);
                let field = { title: "", content: "\u200b" };
                roleCategory.roles.map(roles => {
                    field.title = field.title.concat(roles.name, ' ', roles.emoji, "\n");
                });
                embed.addField(field.title, field.content);
                yield message.channel.send(`[${roleCategory.title}]`);
                const msg = yield message.channel.send(embed);
                if (msg instanceof (discord_js_1.Message)) {
                    roleCategory.roles.map(cr => {
                        // addReaction(msg, cr.emoji)
                    });
                }
            }));
            // function addReaction(msg: Message, emoji) {
            //     const filter = (reaction: MessageReaction, user: User) => {
            //         return reaction.emoji.name === emoji.name && !user.bot;
            //     };
            //     msg.react(emoji)
            //     const collector = msg.createReactionCollector(filter)
            //     collector.on("collect", async (reaction, ReactionCollector) => {
            //         const user = reaction.users.last()
            //         const roleId = customRoles.find(cr => cr.reactionId === reaction.emoji.id).id
            //         const member = msg.guild.members.get(user.id)
            //         if (member.roles.find(rl => rl.id === roleId)) {
            //             // console.log(chalk.bgMagenta.bold(`Removed role from user ${user.username}`))
            //             member.removeRole(roleId)
            //         } else {
            //             // console.log(chalk.bgGreen.bold(`Added role from user ${user.username}`))
            //             msg.guild.members.get(user.id).addRole(roleId)
            //         }
            //     })
            // }
            // async function addCustomReaction(msg: Message, reactionId) {
            //     const emoji = msg.guild.emojis.get(reactionId)
            //     const filter = (reaction: MessageReaction, user: User) => {
            //         return reaction.emoji.name === emoji.name && !user.bot;
            //     };
            //     msg.react(emoji)
            //     const collector = msg.createReactionCollector(filter)
            //     collector.on("collect", async (reaction, ReactionCollector) => {
            //         const user = reaction.users.last()
            //         const roleId = customRoles.find(cr => cr.reactionId === reaction.emoji.id).id
            //         const member = msg.guild.members.get(user.id)
            //         if (member.roles.find(rl => rl.id === roleId)) {
            //             // console.log(chalk.bgMagenta.bold(`Removed role from user ${user.username}`))
            //             member.removeRole(roleId)
            //         } else {
            //             // console.log(chalk.bgGreen.bold(`Added role from user ${user.username}`))
            //             msg.guild.members.get(user.id).addRole(roleId)
            //         }
            //     })
            // }
        });
    }
};
