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
const database_1 = require("./database");
const word_1 = require("./word");
function addWord(word) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(function (resolve, reject) {
            return __awaiter(this, void 0, void 0, function* () {
                var wordModel = yield database_1.conn.model("words", word_1.WordSchema);
                yield wordModel.create({ word: word.word }).then(word => {
                    resolve(word);
                }).catch(err => reject(err));
            });
        });
    });
}
exports.addWord = addWord;
function deleteWord(word) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(function (resolve, reject) {
            return __awaiter(this, void 0, void 0, function* () {
                var wordModel = yield database_1.conn.model("words", word_1.WordSchema);
                wordModel.deleteOne({ word: word.word }, (err) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(`Successfuly Deleted Word`);
                    }
                });
            });
        });
    });
}
exports.deleteWord = deleteWord;
function getWord(word) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(function (resolve, reject) {
            return __awaiter(this, void 0, void 0, function* () {
                var wordModel = yield database_1.conn.model("words", word_1.WordSchema);
                yield wordModel.findOne({ word: word.word }, (err, word) => {
                    if (err || word === null)
                        reject(err);
                    else
                        resolve(word);
                });
            });
        });
    });
}
exports.getWord = getWord;
exports.getAllWords = () => {
    return new Promise(function (resolve, reject) {
        return __awaiter(this, void 0, void 0, function* () {
            var wordModel = yield database_1.conn.model("words", word_1.WordSchema);
            yield wordModel.find().then(words => {
                resolve(words);
            }).catch(error => reject(error));
        });
    });
};
