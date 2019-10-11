import { Message, RichEmbed } from 'discord.js';
import { Command } from '../classes/command';
import { commands, GetCommand } from '../util/CommandUtil';
import { createField, embedColor, ListEmbed, QuickEmbed } from '../util/Style';

const command: Command = {
    name: "help",
    description: "List Commands",
    aliases: ["h"],
    cooldown: 3,

    async execute(message, args) {
        if (args.length === 0 || !args) HelpAll(message);
        else HelpCommand(message, args);
    }
};

function HelpAll(message: Message) {
    let fields: Array<{ title: string; content?: string; inline?: boolean }>;
    fields = commands.map(cmd => ({
        title: cmd.name,
        content: cmd.description + "\n \u200b",
        inline: false
    }));
    ListEmbed(message, "Commands", undefined, fields);
}

function HelpCommand(message: Message, args: string[]) {
    {
        const commandName = args.shift().toLowerCase();
        const command = GetCommand(commandName);

        //Check if command is found
        if (!command) return QuickEmbed(`Command not found`, message);

        //Create embed
        const embed = new RichEmbed().setColor(embedColor);
        embed.fields.push(createField(command.name, command.description + `\n\u200b`));

        message.channel.send(embed);
    }
}

module.exports = command;