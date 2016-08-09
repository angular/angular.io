// #docregion
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { TodoAppComponent }   from './todo_app';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [ TodoAppComponent ],
  bootstrap: [ TodoAppComponent ]
})
export class AppModule { }
