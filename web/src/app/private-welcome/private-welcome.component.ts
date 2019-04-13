import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-private-welcome',
  templateUrl: './private-welcome.component.html',
  styleUrls: ['./private-welcome.component.css']
})
export class PrivateWelcomeComponent implements OnInit {
  enabledFeatures: Feature[] = [
    {name:'todolist', displayName: "To-do List"},
    {name:'germanWordsQuiz', displayName: "German Quiz!"}
  ];

  showing: string;
  get showWelcome(): boolean{
    return 'welcome' === this.showing;
  }
  showFeature(name: string): boolean{
    return name === this.showing;
  }
  constructor() { }

  ngOnInit() {
    this.showing = 'welcome';
  }

  changeShowing(feature: Feature): void{
    if(this.enabledFeatures.map(f=>f.name).indexOf(feature.name)<0){
      this.showing = 'welcome';
      return;
    }
    this.showing = feature.name;
  }
}


class Feature{
  name: string;
  displayName: string;
}