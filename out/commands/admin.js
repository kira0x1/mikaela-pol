"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const help_1 = require("./help");
const mod_1 = require("../util/mod");
const config_1 = require("../config");
const allowImg = {
    name: 'allowimg',
    aliases: ["unbanimg"],
    usage: "[ mention | id ]",
    args: true,
    perms: ["admin"],
    execute(message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            mod_1.removeRole(message, config_1.banPerms.get("img perm denied"), "Allow Image", args.shift(), args.join(" "));
        });
    }
};
const denyImage = {
    name: 'denyImage',
    aliases: ["banimg"],
    usage: "[ mention | id ]",
    args: true,
    perms: ["admin"],
    execute(message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            mod_1.assignRole(message, config_1.banPerms.get("img perm denied"), args.shift(), args.join(" "));
        });
    }
};
const brig = {
    name: "brig",
    description: "Throw a member into the brig",
    usage: "[ mention | id ]",
    perms: ["admin"],
    args: true,
    execute(message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const arg = args.shift();
            mod_1.assignRole(message, config_1.banPerms.get("brig"), arg, args.join(" "));
            mod_1.assignRole(message, config_1.banPerms.get("vcmute"), arg, args.join(" "), false);
        });
    }
};
const unbrig = {
    name: "unbrig",
    description: "Unbrig a member",
    usage: "[ mention | id ]",
    perms: ["admin"],
    args: true,
    execute(message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const arg = args.shift();
            mod_1.removeRole(message, config_1.banPerms.get("brig"), "unbrig", arg, args.join(" "));
            mod_1.removeRole(message, config_1.banPerms.get("vcmute"), "unmute", arg, args.join(" "));
        });
    }
};
const radioActive = {
    name: "radioactive",
    description: "Make a member radio active",
    aliases: ["radio", "rad"],
    usage: "[ mention | id ]",
    perms: ["admin"],
    args: true,
    execute(message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            mod_1.assignRole(message, config_1.banPerms.get("radioactive"), args.shift(), args.join(" "));
        });
    }
};
const txtMute = {
    name: 'txtmute',
    description: 'Deny user from sending messages',
    args: true,
    usage: "[ mention | id ]",
    perms: ["admin"],
    execute(message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            mod_1.assignRole(message, config_1.banPerms.get("txtmute"), args.shift(), args.join(" "));
        });
    }
};
const unmuteTxt = {
    name: 'unmutetxt',
    description: 'Allow user to send messages',
    args: true,
    usage: "[ mention | id ]",
    perms: ["admin"],
    execute(message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            mod_1.removeRole(message, config_1.banPerms.get("txtmute"), "txt unmute", args.shift(), args.join(" "));
        });
    }
};
const muteVoice = {
    name: "voicemute",
    description: "",
    aliases: ['vmute', 'vm', 'mutevoice'],
    perms: ['admin'],
    args: true,
    execute(message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            mod_1.assignRole(message, config_1.banPerms.get("vcmute"), args.shift(), args.join(" "));
        });
    }
};
const unMuteVoice = {
    name: 'unmuteVC',
    description: "Unmutes the user in voice",
    aliases: ['unsilence', 'unmute'],
    args: true,
    perms: ['admin'],
    execute(message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            mod_1.removeRole(message, config_1.banPerms.get("vcmute"), "unmute", args.shift(), args.join(" "));
        });
    }
};
const unRadioActive = {
    name: "unradioactive",
    description: "Remove the radioactive role from a member",
    aliases: ["unradio", "unrad"],
    usage: "[ mention | id ]",
    perms: ["admin"],
    args: true,
    execute(message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            mod_1.removeRole(message, config_1.banPerms.get("radioactive"), "un radioactive", args.shift(), args.join(" "));
        });
    }
};
exports.command = {
    name: 'admin',
    aliases: ['sys'],
    description: 'Admin Commands',
    perms: ['admin'],
    subCmd: [
        allowImg, denyImage, brig,
        unbrig, radioActive, txtMute,
        unmuteTxt, muteVoice, unMuteVoice, unRadioActive
    ],
    execute(message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            help_1.HelpCommand(message, ['admin']);
            console.log(chalk_1.default.cyan.bold(`Admin command called`));
        });
    }
};
