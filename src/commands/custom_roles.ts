import chalk from 'chalk';
import { Message, RichEmbed, ReactionCollector, MessageReaction, User, MessageEmbedField } from 'discord.js';
import Command from '../classes/command';
import { embedColor } from '../util/Style';

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
]

export const command: Command = {
    name: 'customRoles',
    aliases: ['croles'],
    description: "Setup for custom roles",
    perms: ["admin"],
    hidden: true,
    cooldown: 1,

    async execute(message, args) {
        customRoles.forEach(async roleCategory => {
            const embed = new RichEmbed()
                .setColor(embedColor)

            let field = { title: "", content: "\u200b" }
            roleCategory.roles.map(roles => {
                field.title = field.title.concat(roles.name, ' ', roles.emoji, "\n")
            })

            embed.addField(field.title, field.content)

            await message.channel.send(`[${roleCategory.title}]`)
            const msg = await message.channel.send(embed)

            if (msg instanceof (Message)) {
                roleCategory.roles.map(cr => {
                    // addReaction(msg, cr.emoji)
                })
            }
        })

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
    }
}