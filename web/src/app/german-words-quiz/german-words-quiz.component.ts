import { Component, OnInit } from '@angular/core';
import { WordsAndGender, ReviewState } from './WordsAndGenders';
import {Quiz} from './Quiz'
import { Http, Headers, RequestOptions } from "@angular/http";
const httpOptions = {
  headers: new Headers({ 'Content-Type': 'application/json' })
};

const baseUrl = "https://corsola001.chinacloudsites.cn/words";

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
    "gender": "m",
    "reviewState": {
      "correctTimes": 1,
      "wrongTimes": 2,
      "isArchived": false
    }
  }
];

const numberOfQuiz = 2;

@Component({
  selector: 'app-german-words-quiz',
  templateUrl: './german-words-quiz.component.html',
  styleUrls: ['./german-words-quiz.component.css']
})
export class GermanWordsQuizComponent implements OnInit {

  words: Array<WordsAndGender>;

  currentQuiz: Array<Quiz>;

  warning: string;
  shouldShowWarning: Boolean;


  newArticle: string;
  newWord: string;

  constructor(private http: Http) {
    
  }

  ngOnInit() {
    this.getNewQuiz();
    this.shouldShowWarning = false;
  }  

  public quizMarkerOnClick(quiz: Quiz){
    console.log(`${quiz.data.word}, ${this.getNominativeSingularArticle(quiz.data.gender)}`)
    if(quiz.status!='pending'){
      return;
    }
    let isCorrect: Boolean;
    if(quiz.article === this.getNominativeSingularArticle(quiz.data.gender)){
      quiz.status = 'correct';
      quiz.img = 'PeachCat-kiss.gif';
      isCorrect = true;
    } else {
      quiz.status = 'wrong';
      quiz.img = 'kitty-sad.gif';
      isCorrect = false;
    }
    this.http.put(`${baseUrl}/${quiz.data.word}/${isCorrect}`, {}).subscribe();
  }

  public deleteWord(quiz: Quiz) {

    if (quiz.status === 'pending-delete-confirm') {
      this.http.delete(`${baseUrl}?word=${quiz.data.word}`).subscribe(() => {
        this.shouldShowWarning = false;
        this.getNewQuiz();
      });
    }

    this.showWarning(`Are you sure you want to delete this word? Click again to confirm.`);
    quiz.status = 'pending-delete-confirm';
    return;
  }

  public submitNewWord(){
    if(!this.newArticle || !this.newWord || this.newArticle.length < 1 || this.newWord.length < 1){
      return;
    }
    let gender = this.getGenderFromArticle(this.newArticle);
    if(gender.length < 1){
      this.showWarning('Not a valid article');
      return;
    }

    if(!this.warning || this.warning.indexOf('Are you sure to overwrite the record') > 0){
      this.createNewRecord(gender);
      this.shouldShowWarning = false;
      this.warning = "";
      return;
    }

    this.http.get(`${baseUrl}/${this.newWord}`).subscribe(data=>{
      let words = data.json();
      if(words.length > 0){
        this.showWarning(`${this.newWord} already exists. Are you sure to overwrite the record? Click again to confirm.`);
        return;        
      } else {
        this.createNewRecord(gender);
      }
    });    
  }


  private createNewRecord(gender: string) {
    this.http.post(`${baseUrl}?word=${this.newWord}&gender=${gender}`, {}).subscribe(data => {
      this.newArticle = "";
      this.newWord = "";
      console.log(JSON.stringify(data.json()));
      this.http.get(baseUrl).subscribe(data => {
        this.words = data.json();
      });
    });
  }

  public getNewQuiz() {
    this.http.get(baseUrl).subscribe(data=>{
      this.words = data.json();
      this.words = this.shuffle<WordsAndGender>(this.words);
      this.currentQuiz = this.words.slice(0, numberOfQuiz).map((word) => {
        return {
          data: word,
          status: 'pending',
          img: 'questionMark.jpg',
          article: ''
        } as Quiz;
      });  
    });
    this.shouldShowWarning = false;
  }

  private getNominativeSingularArticle(gender: string): string{
    if(gender === 'm') {
        return 'der';
    }
    if(gender === 'f') {
        return 'die';
    }
    if(gender === 'n') {
        return 'das';
    }
    return 'das';
  }


  private getGenderFromArticle(article: string): string{
    if(article === 'der') {
        return 'm';
    }
    if(article === 'die') {
        return 'f';
    }
    if(article === 'das') {
        return 'n';
    }
    return '';
  }


  private shuffle<T>(array: T[]): T[] {
    if (!Array.isArray(array)) {
      throw new TypeError(`Expected an Array, got ${typeof array} instead.`);
    }
  
    const oldArray = [...array];
    let newArray = new Array<T>();
  
    while (oldArray.length) {
      const i = Math.floor(Math.random() * oldArray.length);
      newArray = newArray.concat(oldArray.splice(i, 1));
    }
  
    return newArray;
  }

  private showWarning(message: string){
    this.shouldShowWarning = true;
    this.warning = message;
    setTimeout(()=>{
      this.shouldShowWarning = false;
    }, 5000);
  }

}

