import { model, Schema } from 'mongoose';

export interface IRole {
    name: string,
    id: string
}

export const UserSchema = new Schema({
    username: { type: String, required: true },
    id: { type: String, required: true },
    tag: { type: String, required: true },
    roles: { type: [{ name: String, id: String }], required: true },
    createdAt: Date
})

export interface IUser {
    username: string,
    id: string,
    tag: string,
    roles: IRole[]
}

export const User = model('User', UserSchema);