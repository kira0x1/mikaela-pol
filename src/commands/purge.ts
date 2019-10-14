import Command from '../classes/command';
import { QuickEmbed } from '../util/Style';


const maxPurgeLimit = 15;

export const command: Command = {
    name: 'purge',
    description: 'purges messages',
    args: true,
    aliases: [],
    perms: ["admin"],

    async execute(message, args) {
        let amount = Number(args.shift())

        if (isNaN(amount)) return QuickEmbed("amount must be a number", message)
        if (amount > maxPurgeLimit) return QuickEmbed(`Max Limit ${maxPurgeLimit}`, message)
        if (amount <= 0) return QuickEmbed("amount must be greater then 0", message)

        console.log("purging...")

        message.channel.fetchMessages({ limit: amount + 1 }).then(msg => {
            message.channel.bulkDelete(msg)
        })
    }
}