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
const user_1 = require("./user");
const database_1 = require("./database");
const user_2 = require("./user");
// - GET - /users # returns all users
exports.allUsers = () => {
    return new Promise(function (resolve, reject) {
        let users = user_1.User.find((err, users) => {
            if (err)
                reject(err);
            else
                resolve(users);
        });
    });
};
// - GET - /user/{1} # returns user with id 1
function getUser(tag) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(function (resolve, reject) {
            return __awaiter(this, void 0, void 0, function* () {
                var userModel = yield database_1.conn.model("users", user_2.UserSchema);
                yield userModel.findOne({ tag: tag }, (err, user) => {
                    if (err || user === null)
                        reject(err);
                    else
                        resolve(user);
                });
            });
        });
    });
}
exports.getUser = getUser;
// - PUT - /user # inserts a new user into the table
function addUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(function (resolve, reject) {
            return __awaiter(this, void 0, void 0, function* () {
                var userModel = yield database_1.conn.model("users", user_2.UserSchema);
                yield userModel.create({ username: user.username, id: user.id, tag: user.tag, roles: user.roles }).then(user => {
                    resolve(user);
                }).catch(err => reject(err));
            });
        });
    });
}
exports.addUser = addUser;
function deleteUser(tag) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(function (resolve, reject) {
            return __awaiter(this, void 0, void 0, function* () {
                var userModel = yield database_1.conn.model("users", user_2.UserSchema);
                userModel.deleteOne({ tag: tag }, (err) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(`Successfuly Deleted User`);
                    }
                });
            });
        });
    });
}
exports.deleteUser = deleteUser;
function updateUser(tag, user) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(function (resolve, reject) {
            return __awaiter(this, void 0, void 0, function* () {
                var userModel = yield database_1.conn.model("users", user_2.UserSchema);
                userModel.findOneAndUpdate(tag, user, (err, res) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(user);
                    }
                });
            });
        });
    });
}
exports.updateUser = updateUser;
