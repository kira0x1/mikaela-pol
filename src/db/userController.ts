import { conn } from './database';
import { IUser, User, UserSchema } from './user';

// - GET - /users # returns all users
export let allUsers = () => {
    return new Promise(function (resolve, reject) {
        let users = User.find((err: any, users: any) => {
            if (err) reject(err);
            else resolve(users)
        })
    })
}

// - GET - /user/{1} # returns user with id 1
export async function getUser(tag: string) {
    return new Promise(async function (resolve, reject) {
        var userModel = await conn.model("users", UserSchema)
        await userModel.findOne({ tag: tag }, (err: any, user: any) => {
            if (err || user === null) reject(err)
            else resolve(user)
        })
    })
}

// - PUT - /user # inserts a new user into the table
export async function addUser(user: IUser) {
    return new Promise(async function (resolve, reject) {
        var userModel = await conn.model("users", UserSchema)
        await userModel.create({ username: user.username, id: user.id, tag: user.tag, roles: user.roles }).then(user => {
            resolve(user)
        }).catch(err => reject(err))
    })
}

export async function deleteUser(tag: string) {
    return new Promise(async function (resolve, reject) {
        var userModel = await conn.model("users", UserSchema)
        userModel.deleteOne({ tag: tag }, (err: any) => {
            if (err) {
                reject(err);
            } else {
                resolve(`Successfuly Deleted User`);
            }
        })
    })
}

export async function updateUser(tag: string, user: IUser) {
    return new Promise(async function (resolve, reject) {
        var userModel = await conn.model("users", UserSchema)
        userModel.findOneAndUpdate(tag, user, (err: any, res: any) => {
            if (err) {
                reject(err);
            } else {
                resolve(user);
            }
        })
    })
}
