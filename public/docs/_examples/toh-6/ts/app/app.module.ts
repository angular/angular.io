// #docplaster
// #docregion , v1, v2
import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule }     from '@angular/http';

// #enddocregion v1
// Imports for loading & configuring the in-memory web api
import { XHRBackend } from '@angular/http';

import { InMemoryBackendService, SEED_DATA } from 'angular2-in-memory-web-api';
import { InMemoryDataService }               from './in-memory-data.service';

// #docregion v1
import { AppComponent }   from './app.component';
import { routing }        from './app.routing';

import { HeroDetailComponent }  from './hero-detail.component';
import { HeroesComponent }      from './heroes.component';
import { DashboardComponent }   from './dashboard.component';
import { HeroService }          from './hero.service';
// #enddocregion v1, v2
// #docregion search
import { HeroSearchComponent }  from './hero-search.component';
// #docregion v1, v2

// #enddocregion search
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpModule
  ],
  // #docregion search
  declarations: [
    AppComponent,
    HeroDetailComponent,
    HeroesComponent,
    DashboardComponent,
    // #enddocregion v1, v2
    HeroSearchComponent
    // #docregion v1, v2
  ],
  // #enddocregion search
  providers: [
    HeroService,
    // #enddocregion v1
    { provide: XHRBackend, useClass: InMemoryBackendService }, // in-mem server
    { provide: SEED_DATA,  useClass: InMemoryDataService }     // in-mem server data
    // #docregion v1
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
