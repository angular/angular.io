// #docregion
import { BrowserModule }                from '@angular/platform-browser';
import { FormsModule }                  from '@angular/forms';
import { XHRBackend }                   from '@angular/http';
// import { appRouterProviders }        from './app.routes';
import { LocationStrategy,
         HashLocationStrategy }         from '@angular/common';
import { NgModule }                     from '@angular/core';

import { HeroData }                     from './hero-data';
import { InMemoryBackendService,
         SEED_DATA }                    from 'angular2-in-memory-web-api';

import { AppComponent }                 from './app.component';
import { HeroBioComponent }             from './hero-bio.component';
import { HeroBiosComponent,
         HeroBiosAndContactsComponent } from './hero-bios.component';
import { HeroOfTheMonthComponent }      from './hero-of-the-month.component';
import { HeroContactComponent }         from './hero-contact.component';
import { HeroesBaseComponent,
         SortedHeroesComponent }        from './sorted-heroes.component';
import { HighlightDirective }           from './highlight.directive';
import { ParentFinderComponent,
         AlexComponent,
         AliceComponent,
         CarolComponent,
         ChrisComponent,
         CraigComponent,
         CathyComponent,
         BarryComponent,
         BethComponent,
         BobComponent }                 from './parent-finder.component';

const DIRECTIVES = [
    HeroBiosComponent, HeroBiosAndContactsComponent, HeroBioComponent,
    HeroesBaseComponent, SortedHeroesComponent,
    HeroOfTheMonthComponent, HeroContactComponent,
    HighlightDirective,
    ParentFinderComponent,
    AppComponent
];

const B_DIRECTIVES = [ BarryComponent, BethComponent, BobComponent ];

// #docregion C_DIRECTIVES
const C_DIRECTIVES = [
  CarolComponent, ChrisComponent, CraigComponent,
  CathyComponent
];
// #enddocregion C_DIRECTIVES

// #docregion bootstrap
@NgModule({
  imports: [ BrowserModule, FormsModule ],
  declarations: [ ...DIRECTIVES,
                  ...B_DIRECTIVES,
                  ...C_DIRECTIVES,
                  AliceComponent,
                  AlexComponent ],
  bootstrap: [ AppComponent ],
  providers: [
    // appRouterProviders, TODO: add routes
    { provide: LocationStrategy, useClass: HashLocationStrategy },

    { provide: XHRBackend, useClass: InMemoryBackendService }, // in-mem server
    { provide: SEED_DATA,  useClass: HeroData } // in-mem server data
  ]
})
export class AppModule {
  constructor() {
  }
}
// #enddocregion bootstraps

