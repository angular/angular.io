// #docregion
// #docregion example
/* avoid */

import { Injectable } from 'angular2/core';

import { IHero } from './hero.model.avoid';

@Injectable()
export class HeroCollectorService {
  hero: IHero;

  constructor() { }
}
// #enddocregion example
