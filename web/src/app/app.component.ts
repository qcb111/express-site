import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Headers, RequestOptions } from "@angular/http";

const httpOptions = {
  headers: new Headers({ 'Content-Type': 'application/json' })
};
const baseUrl: string = 'https://corsola001.chinacloudsites.cn/';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name: string;
 
  private authState: number;
 
  constructor(private http: Http){
    this.authState = 0; //0: init, 1: unauth, 2:auth
  };
  ngOnInit(): void {
    
  }

  sendAuth() {
    let body = {
      name: this.name
    };
    this.http.post(`${baseUrl}/auth`, body, httpOptions).subscribe(res=>{
      let j = res.json();
      this.authState = j.state;
    });
  };

  get AuthState(){
    return this.authState;
  }

  shouldShowLogin():boolean{
    return this.authState === 0;
  }

  shouldShowPublic():boolean{
    return this.authState === 1;
  }

  shouldShowPrivate():boolean{
    return this.authState === 2;
  }
}
