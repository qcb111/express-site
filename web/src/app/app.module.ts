import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { HttpModule } from "@angular/http";

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppRoutingModule }     from './app-routing.module';

import { AppComponent }         from './app.component';
import { PublicWelcomeComponent } from './public-welcome/public-welcome.component';
import { PrivateWelcomeComponent } from './private-welcome/private-welcome.component';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { ContactAuthorComponent } from './contact-author/contact-author.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    // AppRoutingModule,
    HttpClientModule,
    HttpModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  declarations: [
    AppComponent,
    PublicWelcomeComponent,
    PrivateWelcomeComponent,
    ToDoListComponent,
    ContactAuthorComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
