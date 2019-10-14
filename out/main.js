"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var CommandUtil_1 = require("./util/CommandUtil");
var config_1 = require("./config");
var chalk_1 = __importDefault(require("chalk"));
var client = new discord_js_1.Client();
var logGuild;
var testingChannel;
var logMessageChannel;
function init() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // await LoadDB();
                return [4 /*yield*/, CommandUtil_1.LoadCommands()];
                case 1:
                    // await LoadDB();
                    _a.sent();
                    client.login(config_1.token);
                    return [2 /*return*/];
            }
        });
    });
}
client.on('ready', function () {
    console.log(chalk_1.default.bgCyan.bold(client.user.username + " online!"));
    logGuild = client.guilds.get(config_1.archiveGuildId);
    testingChannel = logGuild.channels.get(config_1.testingChannelId);
    logMessageChannel = logGuild.channels.get(config_1.logMessagesChannelId);
});
client.on('message', function (message) {
    if (message.author.id !== client.user.id)
        LogMessage(message);
    if (message.author.bot || !message.content.startsWith(config_1.prefix))
        return;
    var args = message.content.slice(config_1.prefix.length).split(/ +/);
    var commandName = (args.shift() || '').toLowerCase();
    if (commandName === '' || commandName.startsWith(config_1.prefix))
        return;
    CommandUtil_1.ExecuteCommand(commandName, message, args);
});
function LogMessage(message) {
    var msglog = {
        username: message.author.username,
        tag: message.author.tag,
        nickname: message.member.displayName,
        id: message.author.id,
        content: message.content,
        timestamp: new Date(message.createdTimestamp).toUTCString(),
        channel: {
            name: message.channel.name,
            id: message.channel.id
        }
    };
    var embed = new discord_js_1.RichEmbed()
        .setThumbnail(message.author.avatarURL)
        .setTitle("Tag: " + msglog.tag)
        .setDescription("user: " + msglog.username + "\nid: " + msglog.id + "\n\u200B")
        .addBlankField(true)
        .addField("Channel", "**" + msglog.channel.name + "**\n\u200B", true)
        .addBlankField(true)
        .addField("Content", msglog.content.split(/ +/).join(" ") || "**EMPTY**", true)
        .addBlankField(true)
        .setFooter("Timestamp: " + msglog.timestamp)
        .setColor("0x#c90c58");
    logMessageChannel.send(embed);
}
init();
