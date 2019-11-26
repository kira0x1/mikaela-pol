import chalk from 'chalk';
import { Client } from 'discord.js';
import { initBump } from './bump';
import { polGuildId, prefix, token, logMessagesChannelId, logDeletedMessagesChannelId } from './config';
import { dbinit as LoadDB } from './db/database';
import { initLogging, LogMessage, LogEditedMessage } from './util/logging';
import { setMemberRoles, syncMemberRoles } from './rolePersist';
import { ExecuteCommand, LoadCommands } from './util/CommandUtil';
import { CheckWord } from './util/wordmod';
import { SyncRoles } from './util/SyncRoles';

const client = new Client();

async function init() {
    await LoadDB();
    LoadCommands();
    client.login(token);
}

client.on('ready', () => {
    console.log(chalk.bgCyan.bold(`${client.user.username} online!`))
    initLogging(client);
    initBump(client)
    SyncRoles(client);
})

client.on('guildMemberAdd', member => {
    if (member.guild.id !== polGuildId) return
    syncMemberRoles(member);
})

client.on('guildMemberRemove', member => {
    if (member.guild.id !== polGuildId) return
    setMemberRoles(member);
})

client.on('messageDelete', message => {
    LogMessage(message, logDeletedMessagesChannelId);
})

client.on('messageUpdate', (oldMsg, newMsg) => {
    if (oldMsg.author.bot) return

    if (newMsg && newMsg.edits) {
        LogEditedMessage(oldMsg, newMsg)
    }
})

client.on('message', message => {
    if (message.author.id !== client.user.id && message.guild.id === polGuildId) {
        LogMessage(message, logMessagesChannelId);
        CheckWord(message)
    }

    if (message.author.bot || !message.content.startsWith(prefix))
        return;

    const args = message.content.slice(prefix.length).split(/ +/)
    let commandName: string = (args.shift() || '').toLowerCase();
    if (commandName === '' || commandName.startsWith(prefix)) return;

    ExecuteCommand(commandName, message, args);
})

init();