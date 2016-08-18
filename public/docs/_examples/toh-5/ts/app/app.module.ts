// #docplaster
// #docregion
import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard.component';
import { HeroDetailComponent }  from './hero-detail.component';
import { HeroesComponent }      from './heroes.component';
import { HeroService }          from './hero.service';
// #docregion routing
import { routing } from './app.routing';
// #docregion routing

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    routing
  ],
  // #enddocregion routing
  // #docregion dashboard, hero-detail
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroDetailComponent,
    HeroesComponent
  ],
  // #enddocregion dashboard, hero-detail
  providers: [
    HeroService
  ],
  bootstrap: [ AppComponent ]
  // #docregion routing
})
export class AppModule {
}
