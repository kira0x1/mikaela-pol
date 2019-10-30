"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ms_1 = __importDefault(require("ms"));
const config_1 = require("./config");
const chalk_1 = __importDefault(require("chalk"));
let bumpChannel;
var bumpInterval;
var intervalRunning = false;
function initBump(client) {
    bumpChannel = client.guilds.get(config_1.polGuildId).channels.get(config_1.bumpChannelId);
    bumpInterval = setInterval(bump, ms_1.default('2h'));
    intervalRunning = true;
}
exports.initBump = initBump;
function bump() {
    if (!((bumpChannel) => bumpChannel.type === 'text')(bumpChannel))
        return;
    console.log(chalk_1.default.bgGreen.bold("Bumping!"));
    bumpChannel.send("@here Reminder to bump 💖");
}
function ResetBump(delay = '0s', frequency = '2h') {
    if (intervalRunning) {
        clearInterval(bumpInterval);
        intervalRunning = false;
    }
    setTimeout(() => {
        bumpInterval = setInterval(bump, ms_1.default(frequency));
        intervalRunning = true;
    }, ms_1.default(delay));
}
exports.ResetBump = ResetBump;
