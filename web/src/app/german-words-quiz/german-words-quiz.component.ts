import { Component, OnInit } from '@angular/core';
import { WordsAndGender, ReviewState } from './WordsAndGenders';


const list: Array<WordsAndGender> = [
  {
    "word": "Orange",
    "gender": "f",
    "reviewState": {
      "correctTimes": 1,
      "wrongTimes": 2,
      "isArchived": false
    }
  },
  {
    "word": "Milch",
    "gender": "f",
    "reviewState": {
      "correctTimes": 1,
      "wrongTimes": 2,
      "isArchived": false
    }
  }
];


@Component({
  selector: 'app-german-words-quiz',
  templateUrl: './german-words-quiz.component.html',
  styleUrls: ['./german-words-quiz.component.css']
})
export class GermanWordsQuizComponent implements OnInit {

  words: Array<WordsAndGender>;
  constructor() {
    
  }

  ngOnInit() {
    this.words = list;
  }

}
