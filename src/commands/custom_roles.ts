import chalk from 'chalk';
import { Message, RichEmbed, ReactionCollector, MessageReaction, User } from 'discord.js';
import Command from '../classes/command';
import { embedColor } from '../util/Style';

const customRoles = [
    {
        id: "605510163490799616", reactionId: "638245041629822976"
    }
]

export const command: Command = {
    name: 'customRoles',
    aliases: ['croles'],
    description: "Setup for custom roles",
    perms: ["admin"],
    hidden: true,
    cooldown: 20,

    async execute(message, args) {
        customRoles.map(async cr => {
            const role = message.guild.roles.get(cr.id)
            if (!role) return console.log(chalk.bgRed.bold("Error trying get role"))

            const embed = new RichEmbed()
                .setTitle(role.name)
                .setColor(embedColor)

            const msg = await message.channel.send(embed)
            if (msg instanceof (Message)) {
                await addReaction(msg, cr.reactionId)
            }
        })


        async function addReaction(msg: Message, reactionId) {
            const emoji = msg.guild.emojis.get(reactionId)

            const filter = (reaction: MessageReaction, user: User) => {
                return reaction.emoji.name === emoji.name && !user.bot;
            };

            msg.react(emoji)

            const collector = msg.createReactionCollector(filter)

            collector.on("collect", async (reaction, ReactionCollector) => {
                const user = reaction.users.last()
                const roleId = customRoles.find(cr => cr.reactionId === reaction.emoji.id).id
                const member = msg.guild.members.get(user.id)
                if (member.roles.find(rl => rl.id === roleId)) {
                    // console.log(chalk.bgMagenta.bold(`Removed role from user ${user.username}`))
                    member.removeRole(roleId)
                } else {
                    // console.log(chalk.bgGreen.bold(`Added role from user ${user.username}`))
                    msg.guild.members.get(user.id).addRole(roleId)
                }
            })
        }
    }
}