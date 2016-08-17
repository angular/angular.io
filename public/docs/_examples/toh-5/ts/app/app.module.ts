// #docplaster
// #docregion
import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';

import { AppComponent }   from './app.component';
// #docregion routing
import { routing }        from './app.routing';
// #enddocregion routing

import { HeroesComponent }      from './heroes.component';
import { DashboardComponent }   from './dashboard.component';
import { HeroDetailComponent }  from './hero-detail.component';

import { HeroService }  from './hero.service';
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
    HeroesComponent,
    DashboardComponent,
    // #enddocregion dashboard
    HeroDetailComponent
    // #docregion dashboard
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
