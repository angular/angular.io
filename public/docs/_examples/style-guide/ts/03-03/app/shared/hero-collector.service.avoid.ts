// #docregion
// #docregion example
/* avoid */

import { Injectable } from '@angular/core';

import { IHero } from './hero.model';

@Injectable()
export class HeroCollectorService {
  hero: IHero;

  constructor() { }
}
// #enddocregion example
