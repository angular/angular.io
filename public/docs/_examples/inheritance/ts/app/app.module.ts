// #docregion
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { BaseComponent } from './base.component';
import { SubComponent }  from './sub.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [
    AppComponent,
    BaseComponent,
    SubComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
