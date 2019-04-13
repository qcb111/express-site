import express = require('express');
import FileRepository from '../common/FileRepository'
import {WordsAndGender, ReviewState} from '../models/WordsAndGender'


const collectionName = `words`;
const archiveThershold = 3;

class GermanWordsGenderController {
    public path = '/words';
    public router = express.Router();

    public collection: FileRepository<WordsAndGender>;


    constructor() {
        this.intializeRoutes();
        this.collection = new FileRepository(collectionName);
        console.log(`GermanWordsGenderController initialize finished ${this.collection.get(()=>true).length}`)
    }

    public intializeRoutes() {
        this.router.get(this.path, this.getAll);
        this.router.post(this.path, this.addItem);
        this.router.put(`${this.path}/:word/:isCorrect`, this.updateRecord);
    }

    getAll = (request: express.Request, response: express.Response) => {
        let words = this.collection.get(doc=>!doc.reviewState.isArchived);
        response.status(200).json(words);
    };

    addItem = (request: express.Request, response: express.Response) => {
        let word: string = request.query.word;
        let gender: string = request.query.gender;

        let doc = {
            word: word,
            gender: gender,
            reviewState:{
                correctTimes: 0,
                wrongTimes: 0,
                isArchived: false
            } as ReviewState
        } as WordsAndGender;
        this.collection.insertOne(doc);
        response.status(201).json(doc);
    };

    updateRecord = (req: express.Request, res: express.Response) => {
        let isCorrect = req.params.isCorrect == 'true';
        let word = req.params.word;

        let matched = this.collection.get((doc)=>doc.word == word);
        
        if(matched.length == 0) res.status(404).send(`word ${word} not found`);
        if(matched.length > 1) res.status(400).send(`duplicated records of word ${word}`);

        let storedWord = matched[0];
        if(isCorrect){
            storedWord.reviewState.correctTimes++;
            if(storedWord.reviewState.correctTimes - storedWord.reviewState.wrongTimes >= archiveThershold){
                storedWord.reviewState.isArchived = true;
            }
        } else {
            storedWord.reviewState.wrongTimes++;
        }

        this.collection.update((doc)=>doc.word == word, storedWord);
        res.status(200).json(storedWord);
    }

}

export default GermanWordsGenderController;