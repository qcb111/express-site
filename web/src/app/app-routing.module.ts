import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { ContactAuthorComponent } from './contact-author/contact-author.component';

const routes: Routes = [
  { path: 'todolist', component: ToDoListComponent },
  { path: '', component: ContactAuthorComponent },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
