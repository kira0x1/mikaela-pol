"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Command = /** @class */ (function () {
    function Command(command) {
        this.name = command.name;
        this.description = command.description;
        this.subCmd = command.subCmd;
        this.perms = command.perms;
        this.usage = command.usage;
        this.aliases = command.aliases;
        this.args = command.args;
        this.cooldown = command.cooldown;
    }
    return Command;
}());
exports.Command = Command;
