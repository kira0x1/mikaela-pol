import { conn } from './database';
import { IFilteredWord, WordSchema, Word } from './word';

export async function addWord(word: IFilteredWord) {
    return new Promise(async function (resolve, reject) {
        var wordModel = await conn.model("words", WordSchema)
        await wordModel.create({ word: word.word }).then(word => {
            resolve(word)
        }).catch(err => reject(err))
    })
}

export async function deleteWord(word: IFilteredWord) {
    return new Promise(async function (resolve, reject) {
        var wordModel = await conn.model("words", WordSchema)
        wordModel.deleteOne({ word: word.word }, (err: any) => {
            if (err) {
                reject(err);
            } else {
                resolve(`Successfuly Deleted Word`);
            }
        })
    })
}

export async function getWord(word: IFilteredWord) {
    return new Promise(async function (resolve, reject) {
        var wordModel = await conn.model("words", WordSchema)
        await wordModel.findOne({ word: word.word }, (err: any, word: any) => {
            if (err || word === null) reject(err)
            else resolve(word)
        })
    })
}

export let getAllWords = () => {
    return new Promise(async function (resolve, reject) {
        var wordModel = await conn.model("words", WordSchema)
        await wordModel.find().then(words => {
            resolve(words)
        }).catch(error => reject(error))
    })
}
