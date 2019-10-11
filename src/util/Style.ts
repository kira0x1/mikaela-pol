import { RichEmbed, Message } from "discord.js";

// export const embedColor = embedColor
export const embedColor = 0xf70a51;

export function darken(...content: string[]): string {
    const tag = `\``;
    return wrap(content, tag);
}

export function wrap(content: string[] | string, wrap: string): string {
    if (typeof content === "string") return wrap + content + wrap;

    return content
        .filter(str => str !== ``)
        .map(str => wrap + str + wrap)
        .join(" ");
}

export function QuickEmbed(content: string, message: Message) {
    const embed = new RichEmbed().setTitle(content);
    message.channel.send(embed);
}

export function createEmptyField(inline?: boolean | false) {
    return { name: `\u200b`, value: "\u200b", inline: true };
}

export function ListEmbed(
    message: Message,
    title?: string,
    description?: string,
    fields?: Array<{
        title: string | "\u200b";
        content?: string | "\u200b";
        inline?: boolean | false;
    }>
) {
    let embed = new RichEmbed();
    embed.setColor(embedColor);

    if (title !== undefined) embed.addField(title, `\u200b`);
    if (description !== undefined) embed.setDescription(description);
    if (fields !== undefined) fields.map(field => embed.addField(field.title, field.content, field.inline));

    message.channel.send(embed);
}
export function createField(name: string | "\u200b", content?: string | "\u200b", inline?: boolean | false) {
    const field = { name: name, value: content, inline: inline };
    return field;
}
