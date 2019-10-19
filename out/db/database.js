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
const mongoose_1 = require("mongoose");
const config_1 = require("../config");
let conn = undefined;
exports.conn = conn;
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        mongoose_1.createConnection(config_1.dbLogin, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: true,
            keepAlive: true
        }).then(connection => {
            exports.conn = conn = connection;
            console.log(`connected to mongodb`);
        }).catch(err => console.log(`failed to connect to mongodb`, err));
    });
}
exports.dbinit = init;
