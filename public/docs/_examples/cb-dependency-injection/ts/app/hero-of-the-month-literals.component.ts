/* tslint:disable:one-line:check-open-brace*/
// #docplaster
// #docregion opaque-token
import { OpaqueToken } from '@angular/core';

export const TITLE = new OpaqueToken('title');
// #enddocregion opaque-token

// #docregion hero-of-the-month
import { Component, Inject } from '@angular/core';

import { DateLoggerService,
         MinimalLogger }     from './date-logger.service';
import { Hero }              from './hero';
import { HeroService }       from './hero.service';
import { LoggerService }     from './logger.service';
import { RUNNERS_UP,
         runnersUpFactory }  from './runners-up';

// #enddocregion hero-of-the-month
// #docregion some-hero
const someHero = new Hero(42, 'Magma', 'Had a great month!', '555-555-5555');
// #enddocregion some-hero

const template = `
  <h3>{{title}}</h3>
  <div>Winner: <strong>{{heroOfTheMonth.name}}</strong></div>
  <div>Reason for award: <strong>{{heroOfTheMonth.description}}</strong></div>
  <div>Runners-up: <strong id="rups2">{{runnersUp}}</strong></div>

  <p>Logs:</p>
  <div id="logs">
    <div *ngFor="let log of logs">{{log}}</div>
  </div>
  `;

// #docregion hero-of-the-month
@Component({
  selector: 'hero-of-the-month-lit',
  template: template,
  // #docregion providers-using-object-literals
  providers: [
    {provide: Hero,          useValue:    someHero},
    {provide: TITLE,         useValue:    'Hero of the Month - Object Literals'},
    {provide: HeroService,   useClass:    HeroService},
    {provide: LoggerService, useClass:    DateLoggerService},
    {provide: MinimalLogger, useExisting: LoggerService},
    {provide: RUNNERS_UP,    useFactory:  runnersUpFactory(2), deps: [Hero, HeroService]}
  ]
  // #enddocregion providers-using-object-literals
})
export class HeroOfTheMonthLiteralsComponent {
  logs: string[] = [];

// #docregion ctor-signature
  constructor(
      logger: MinimalLogger,
      public heroOfTheMonth: Hero,
      @Inject(RUNNERS_UP) public runnersUp: string,
      @Inject(TITLE) public title: string)
// #enddocregion ctor-signature
  {
    this.logs = logger.logs;
    logger.logInfo('starting up');
  }
}
// #enddocregion hero-of-the-month
