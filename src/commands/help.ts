import { Message, RichEmbed } from 'discord.js';
import Command from '../classes/command';
import { commands, GetCommand, CheckPerms } from '../util/CommandUtil';
import { createField, embedColor, ListEmbed, QuickEmbed, createEmptyField } from '../util/Style';

export const command: Command = {
    name: "help",
    description: "List Commands",
    aliases: ["h", "commands"],
    cooldown: 1,

    async execute(message, args) {
        if (args.length === 0 || !args) HelpAll(message);
        else HelpCommand(message, args);
    }
};

function HelpAll(message: Message) {
    let fields: Array<{ title: string; content?: string; inline?: boolean }>;
    fields = commands.filter(cmd => CheckPerms(cmd, message)).map(cmd => ({
        title: cmd.name,
        content: cmd.description + "\n \u200b",
        inline: false
    }));

    ListEmbed(message, "Commands", undefined, fields);
}

export async function HelpCommand(message: Message, args: string[]) {
    const commandName = args.shift().toLowerCase();
    const command = GetCommand(commandName);

    //Check if command is found
    if (!command) return QuickEmbed(`Command not found`, message);

    //Check if user has permission
    if (!CheckPerms(command, message)) return;

    //Create embed
    const embed = new RichEmbed().setColor(embedColor);
    embed.fields.push(createField(command.name, command.description + `\n\u200b`));

    //Check if command has subcommands
    if (command.subCmd) {
        InsertSubCommands(embed, command.subCmd);
    }

    message.channel.send(embed);
}

function InsertSubCommands(embed: RichEmbed, subCommands: Command[]) {
    //Get amound of rows for flags
    const rows = Math.ceil(subCommands.length / 3);

    let count = 0;
    //Add command flags
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < 3; col++) {
            if (count >= subCommands.length) {
                embed.fields.push(createEmptyField(true));
            } else {
                let aliases = 'aliases: none'
                if (subCommands[count].aliases !== undefined)
                    aliases = subCommands[count].aliases.join(", ")

                embed.fields.push(createField(subCommands[count].name, aliases, true));
            }
            count++;
        }
    }
}