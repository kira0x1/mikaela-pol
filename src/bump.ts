import { Client, GuildChannel, TextChannel } from 'discord.js';
import ms from 'ms';

import { bumpChannelId, polGuildId } from './config';
import chalk from 'chalk';

let bumpChannel: TextChannel | GuildChannel

export function initBump(client: Client) {
    bumpChannel = client.guilds.get(polGuildId).channels.get(bumpChannelId)
    setInterval(bump, ms('1h'))
}

function bump() {
    if (!((bumpChannel): bumpChannel is TextChannel => bumpChannel.type === 'text')(bumpChannel)) return;
    console.log(chalk.bgGreen.bold("Bumping!"))
    bumpChannel.send("!d bump")
}