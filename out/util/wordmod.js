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
function CheckWord(message) {
    return __awaiter(this, void 0, void 0, function* () {
        const content = message.content.split(/ +/);
        content.map((word) => __awaiter(this, void 0, void 0, function* () {
            yield wordController_1.getWord({ word: word }).then(word => {
                // message.member.user.send(`The word \`${word}\` is banned`)
                message.delete();
            }).catch(() => { });
        }));
    });
}
exports.CheckWord = CheckWord;
