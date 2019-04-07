import { Component, OnInit } from '@angular/core';

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
  todoList: string[] = [];
  pending: string;
  constructor() { }

  ngOnInit() {
    this.updateTime();
    setInterval(() => {
      this.updateTime();
    }, 30000);
    this.todoList.push(`Learn German!`);
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
      this.todoList.push(item);
      this.pending = "";
    }

  };

  removeItem(item: string) {
    this.todoList = this.todoList.filter((i) => i !== item);
  }

  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.addItem(this.pending);
    }
  }
}
