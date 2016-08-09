// #docplaster
// #docregion
import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';

import { AppComponent }   from './app.component';
import { routing }        from './app.routing';

import { HeroesComponent }  from './heroes.component';
// #docregion dashboard-declaration
import { DashboardComponent } from './dashboard.component';
// #enddocregion dashboard-declaration
// #docregion hero-detail-declaration
import { HeroDetailComponent } from './hero-detail.component';
// #enddocregion hero-detail-declaration
import { HeroService }  from './hero.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    routing
  ],
// #docregion dashboard-declaration, hero-detail-declaration

  declarations: [
// #enddocregion dashboard-declaration, hero-detail-declaration
    AppComponent,
    HeroesComponent,
// #docregion dashboard-declaration
    DashboardComponent,
// #enddocregion dashboard-declaration
// #docregion hero-detail-declaration
    HeroDetailComponent
// #enddocregion hero-detail-declaration
// #docregion dashboard-declaration, hero-detail-declaration
  ],
// #enddocregion dashboard-declaration, hero-detail-declaration
  providers: [
    HeroService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
// #enddocregion
