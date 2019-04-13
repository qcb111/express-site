import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-private-welcome',
  templateUrl: './private-welcome.component.html',
  styleUrls: ['./private-welcome.component.css']
})
export class PrivateWelcomeComponent implements OnInit {
  enabledFeatures: string[] = ['todolist', 'germanWordsQuiz'];

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

  changeShowing(featureName: string): void{
    if(this.enabledFeatures.indexOf(featureName)<0){
      this.showing = 'welcome';
      return;
    }
    this.showing = featureName;
  }
}
