import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
const httpOptions = {
  headers: new Headers({ 'Content-Type': 'application/json' })
};

const baseUrl = "https://corsola001.chinacloudsites.cn/todolist";

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css'],
  host: {
    '(document:keypress)': 'handleKeyboardEvent($event)'
  }
})

export class ToDoListComponent implements OnInit {

  displayTime: string;
  displayGreetings: string;
  todoList: Item[] = [];
  pending: string;
  constructor(private http: Http) { }

  ngOnInit() {
    this.updateTime();
    setInterval(() => {
      this.updateTime();
    }, 30000);

    this.http.get(baseUrl).subscribe((data)=>{
      this.todoList = data.json();
    })
  };

  updateTime(): void {
    let now = new Date(); //Sat Jul 29 08:24:48 UTC+0800 2006   

    let hh = now.getHours();
    let mm = now.getMinutes();

    let clock = hh + ':';
    if (mm < 10) clock += '0';
    clock += mm;
    this.displayTime = clock;

    if (hh >= 22 || hh < 5) {
      this.displayGreetings = `Gute Nacht`;
    }
    else if (hh < 11) {
      this.displayGreetings = `Guten Morgen`;
    } else if (hh < 18) {
      this.displayGreetings = `Guten Tag`;
    } else {
      this.displayGreetings = `Guten Abend`;
    }
  };

  addItem(item: string) {
    if (this.pending && this.pending.length > 0) {
      let i: Item = {
        content: item,
        isFinished: false
      };
      this.http.put(baseUrl, i).subscribe(()=>{
        this.todoList.push(i);
        this.pending = "";  
      });
    }
  };

  removeItem(item: string) {
    this.http.delete(`${baseUrl}/${item}`).subscribe((data)=>{
      this.todoList = this.todoList.filter((i) => i.content !== item);
    });
  }

  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.addItem(this.pending);
    }
  }
}

interface Item{
  content: string;
  isFinished: boolean;
  order?: number;
}