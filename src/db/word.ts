import { model, Schema } from 'mongoose';

export interface IFilteredWord {
    word: string
}

export const WordSchema = new Schema({
    word: { type: String, required: true }
})

export const Word = model('Word', WordSchema)