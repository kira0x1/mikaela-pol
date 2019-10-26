"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ms_1 = __importDefault(require("ms"));
const config_1 = require("./config");
const chalk_1 = __importDefault(require("chalk"));
let bumpChannel;
function initBump(client) {
    bumpChannel = client.guilds.get(config_1.polGuildId).channels.get(config_1.bumpChannelId);
    setInterval(bump, ms_1.default('1h'));
}
exports.initBump = initBump;
function bump() {
    if (!((bumpChannel) => bumpChannel.type === 'text')(bumpChannel))
        return;
    console.log(chalk_1.default.bgGreen.bold("Bumping!"));
    bumpChannel.send("!d bump");
}
