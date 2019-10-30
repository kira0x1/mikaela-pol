"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const wordController_1 = require("../db/wordController");
const Style_1 = require("../util/Style");
const discord_js_1 = require("discord.js");
const addWordCommand = {
    name: 'addWord',
    description: 'Add Filtered Word',
    usage: '[word]',
    aliases: ['addw'],
    perms: ['admin'],
    args: true,
    execute(message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const newWord = args.join(" ");
            yield wordController_1.getWord({ word: newWord }).then(word => {
                Style_1.QuickEmbed(`Word ${newWord} is already a filtered word`, message);
            }).catch(() => __awaiter(this, void 0, void 0, function* () {
                yield wordController_1.addWord({ word: newWord });
                Style_1.QuickEmbed(`Added ${newWord} to filtered words list`, message);
            }));
        });
    }
};
const listWords = {
    name: 'listWords',
    description: 'List all filtered words',
    perms: ['admin'],
    execute(message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const embed = new discord_js_1.RichEmbed();
            embed.setTitle("Filtered Words")
                .setColor(Style_1.embedColor);
            yield wordController_1.getAllWords().then(words => {
                console.log(words);
                if (!words.length) {
                    embed.addField("No Words", "\u200b");
                }
                else {
                    words.map(word => {
                        embed.addField(word.word, "\u200b");
                    });
                }
            }).catch(error => console.error);
            message.channel.send(embed);
        });
    }
};
const removeWordCommand = {
    name: 'removeWord',
    description: 'Remove a word from the filtered words list',
    usage: '[word]',
    perms: ['admin'],
    args: true,
    execute(message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            wordController_1.deleteWord({ word: args.join(" ") }).then(word => {
                Style_1.QuickEmbed(`Removed word: ${word} from the filtered words list`, message);
            }).catch(err => console.error(err));
        });
    }
};
exports.command = {
    name: 'Filter',
    description: "Filter Words",
    aliases: ["fl"],
    subCmd: [addWordCommand, listWords, removeWordCommand],
    execute(message, args) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
};
