// #docregion
import { Component } from '@angular/core';

import { HeroBiosComponent,
         HeroBiosAndContactsComponent } from './hero-bios.component';
import { HeroOfTheMonthComponent }     from './hero-of-the-month.component';
import { HeroesBaseComponent,
         SortedHeroesComponent }       from './sorted-heroes.component';
import { HighlightDirective }          from './highlight.directive';
import { ParentFinderComponent }       from './parent-finder.component';

const DIRECTIVES = [
    HeroBiosComponent, HeroBiosAndContactsComponent,
    HeroesBaseComponent, SortedHeroesComponent,
    HeroOfTheMonthComponent,
    HighlightDirective,
    ParentFinderComponent
];

// #docregion import-services
import { LoggerService }      from './logger.service';
import { UserContextService } from './user-context.service';
import { UserService }        from './user.service';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  directives: DIRECTIVES,
// #docregion providers
  providers: [LoggerService, UserContextService, UserService]
// #enddocregion providers
})
export class AppComponent {
// #enddocregion import-services

  private userId: number = 1;

  // #docregion ctor
  constructor(logger: LoggerService, public userContext: UserContextService) {
    userContext.loadUser(this.userId);
    logger.logInfo('AppComponent initialized');
  }
  // #enddocregion ctor
// #docregion import-services
}
// #enddocregion import-services
