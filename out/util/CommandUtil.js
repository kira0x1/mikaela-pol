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
var path_1 = __importDefault(require("path"));
var fs_1 = require("fs");
var Style_1 = require("./Style");
exports.commands = new discord_js_1.Collection();
exports.cooldowns = new discord_js_1.Collection();
function LoadCommands() {
    return __awaiter(this, void 0, void 0, function () {
        var folderPath, commandFiles;
        return __generator(this, function (_a) {
            folderPath = path_1.default.join(__dirname, '..', 'commands');
            commandFiles = fs_1.readdirSync(folderPath).filter(function (file) { return file.endsWith('.js'); });
            commandFiles.map(function (file) {
                var command = require(path_1.default.join(folderPath, file));
                exports.commands.set(command.name, command);
            });
            return [2 /*return*/];
        });
    });
}
exports.LoadCommands = LoadCommands;
function GetCommand(commandName) {
    return exports.commands.get(commandName) || exports.commands.find(function (cmd) { return cmd.aliases && cmd.aliases.includes(commandName); });
}
exports.GetCommand = GetCommand;
function ExecuteCommand(commandName, message, args) {
    var command = GetCommand(commandName);
    if (!command) {
        return Style_1.QuickEmbed("Command **" + commandName + "** not found", message);
    }
    //Check if command is on cooldown, if so return.
    if (IsOnCoolDown(command, message))
        return;
    //Execute Command
    try {
        command.execute(message, args);
    }
    catch (error) {
        console.error("command execute failed", error);
    }
}
exports.ExecuteCommand = ExecuteCommand;
function IsOnCoolDown(command, message) {
    if (!exports.cooldowns.has(command.name)) {
        exports.cooldowns.set(command.name, new discord_js_1.Collection());
    }
    var now = Date.now();
    var timestamps = exports.cooldowns.get(command.name);
    var cdAmount = command.cooldown * 1000;
    var userId = message.author.id;
    if (timestamps.has(userId)) {
        var cdEndTime = timestamps.get(userId) + cdAmount;
        //Check if command is still on cooldown
        if (now < cdEndTime) {
            timestamps.set(userId, now);
            var timeLeft = (cdEndTime - now) / 1000;
            Style_1.QuickEmbed("Command **" + command.name + "** on cooldown " + timeLeft.toFixed(1) + " seconds left", message);
            return true;
        }
    }
    timestamps.set(userId, now);
    //Automatically delete timestamp just incase
    setTimeout(function () { return timestamps.delete(userId); }, cdAmount);
    //Command is not on cooldown
    return false;
}
