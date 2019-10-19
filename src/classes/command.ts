import { Message } from "discord.js";

export default abstract class Command {
    name: string;
    description?: string;
    usage?: string | undefined;
    aliases?: Array<string>;
    subCmd?: Array<Command> | undefined;
    args?: boolean | false;
    cooldown?: number | 3;
    perms?: string[];

    constructor(command: Command) {
        this.name = command.name;
        this.description = command.description;
        this.subCmd = command.subCmd;
        this.perms = command.perms;
        this.usage = command.usage;
        this.aliases = command.aliases;
        this.args = command.args;
        this.cooldown = command.cooldown;
    }

    abstract execute(message: Message, args: Array<string>): void;
}