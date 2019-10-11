import { Client } from 'discord.js';
import { ExecuteCommand, LoadCommands } from './util/CommandUtil';
import { prefix, token } from './config';
import { dbinit as LoadDB } from './db/dbSetup';

const client = new Client();

async function init() {
    await LoadDB();
    await LoadCommands();
    client.login(token);
}

client.on('ready', () => {
    console.log(`${client.user.username} online!`)
})

client.on('message', message => {
    if (message.author.bot || !message.content.startsWith(prefix))
        return;

    const args = message.content.slice(prefix.length).split(/ +/)
    let commandName: string = (args.shift() || '').toLowerCase();
    if (commandName === '' || commandName.startsWith(prefix)) return;
    ExecuteCommand(commandName, message, args);
})

init();