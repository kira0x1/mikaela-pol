import { Client, GuildChannel, TextChannel } from 'discord.js';
import ms from 'ms';

import { bumpChannelId, polGuildId } from './config';
import chalk from 'chalk';

let bumpChannel: TextChannel | GuildChannel
var bumpInterval
var intervalRunning: boolean = false

export function initBump(client: Client) {
    bumpChannel = client.guilds.get(polGuildId).channels.get(bumpChannelId)
    bumpInterval = setInterval(bump, ms('2h'))
    intervalRunning = true;
}

function bump() {
    if (!((bumpChannel): bumpChannel is TextChannel => bumpChannel.type === 'text')(bumpChannel)) return;
    console.log(chalk.bgGreen.bold("Bumping!"))
    bumpChannel.send("@here Reminder to bump 💖")
}

export function ResetBump(delay: string = '0s', frequency: string = '2h') {
    if (intervalRunning) {
        clearInterval(bumpInterval)
        intervalRunning = false
    }
    setTimeout(() => {
        bumpInterval = setInterval(bump, ms(frequency))
        intervalRunning = true;
    }, ms(delay))
}