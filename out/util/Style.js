"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
// export const embedColor = embedColor
exports.embedColor = 0xf70a51;
function darken() {
    var content = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        content[_i] = arguments[_i];
    }
    var tag = "`";
    return wrap(content, tag);
}
exports.darken = darken;
function wrap(content, wrap) {
    if (typeof content === "string")
        return wrap + content + wrap;
    return content
        .filter(function (str) { return str !== ""; })
        .map(function (str) { return wrap + str + wrap; })
        .join(" ");
}
exports.wrap = wrap;
function QuickEmbed(content, message) {
    var embed = new discord_js_1.RichEmbed().setTitle(content);
    message.channel.send(embed);
}
exports.QuickEmbed = QuickEmbed;
function createEmptyField(inline) {
    return { name: "\u200B", value: "\u200b", inline: true };
}
exports.createEmptyField = createEmptyField;
function ListEmbed(message, title, description, fields) {
    var embed = new discord_js_1.RichEmbed();
    embed.setColor(exports.embedColor);
    if (title !== undefined)
        embed.addField(title, "\u200B");
    if (description !== undefined)
        embed.setDescription(description);
    if (fields !== undefined)
        fields.map(function (field) { return embed.addField(field.title, field.content, field.inline); });
    message.channel.send(embed);
}
exports.ListEmbed = ListEmbed;
function createField(name, content, inline) {
    var field = { name: name, value: content, inline: inline };
    return field;
}
exports.createField = createField;
