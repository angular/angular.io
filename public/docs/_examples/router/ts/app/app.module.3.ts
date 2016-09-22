// #docplaster
// #docregion
// #docregion hero-import
import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';

import { AppComponent }      from './app.component';
import { AppRoutingModule }  from './app-routing.module';

import { HeroesModule }         from './heroes/heroes.module';

import { CrisisListComponent }  from './crisis-list.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HeroesModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    CrisisListComponent
  ],
  bootstrap: [ AppComponent ]
})
// #enddocregion hero-import
export class AppModule {
}
// #enddocregion
