"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.WordSchema = new mongoose_1.Schema({
    word: { type: String, required: true }
});
exports.Word = mongoose_1.model('Word', exports.WordSchema);
