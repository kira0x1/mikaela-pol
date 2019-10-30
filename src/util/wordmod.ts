import { Message } from 'discord.js';
import { getWord } from '../db/wordController';

export async function CheckWord(message: Message) {
    const content = message.content.split(/ +/)

    content.map(async word => {
        await getWord({ word: word }).then(word => {
            // message.member.user.send(`The word \`${word}\` is banned`)
            message.delete();
        }).catch(() => { })
    })
}