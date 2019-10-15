"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    id: { type: String, required: true },
    tag: { type: String, required: true },
    roles: { type: [{ name: String, id: String }], required: true },
    createdAt: Date
});
exports.User = mongoose_1.model('User', exports.UserSchema);
