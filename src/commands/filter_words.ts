import Command from '../classes/command';
import { getWord, addWord, getAllWords, deleteWord } from '../db/wordController';
import { QuickEmbed, embedColor } from '../util/Style';
import { RichEmbed } from 'discord.js';

const addWordCommand: Command = {
    name: 'addWord',
    description: 'Add Filtered Word',
    usage: '[word]',
    aliases: ['addw'],
    perms: ['admin'],
    args: true,

    async execute(message, args) {
        const newWord = args.join(" ")

        await getWord({ word: newWord }).then(word => {
            QuickEmbed(`Word ${newWord} is already a filtered word`, message)
        }).catch(async () => {
            await addWord({ word: newWord })
            QuickEmbed(`Added ${newWord} to filtered words list`, message)
        })
    }
}

const listWords: Command = {
    name: 'listWords',
    description: 'List all filtered words',
    perms: ['admin'],

    async execute(message, args) {
        const embed = new RichEmbed()
        embed.setTitle("Filtered Words")
            .setColor(embedColor)

        await getAllWords().then(words => {
            console.log(words)
            if (!words.length) {
                embed.addField("No Words", "\u200b")
            } else {
                words.map(word => {
                    embed.addField(word.word, "\u200b")
                })
            }
        }).catch(error => console.error)


        message.channel.send(embed)
    }
}

const removeWordCommand: Command = {
    name: 'removeWord',
    description: 'Remove a word from the filtered words list',
    usage: '[word]',
    perms: ['admin'],
    args: true,

    async execute(message, args) {
        deleteWord({ word: args.join(" ") }).then(word => {
            QuickEmbed(`Removed word: ${word} from the filtered words list`, message)
        }).catch(err => console.error(err))
    }
}

export const command: Command = {
    name: 'Filter',
    description: "Filter Words",
    aliases: ["fl"],
    subCmd: [addWordCommand, listWords, removeWordCommand],

    async execute(message, args) {

    }
}