import {WordsAndGender} from './WordsAndGenders'

export interface Quiz{
    data: WordsAndGender;
    article: string;
    status: string;
    img: string;
}