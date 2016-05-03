// #docregion
// #docregion example
import { Injectable } from '@angular/core';

import { Hero } from './hero.model';

@Injectable()
export class HeroCollectorService {
  hero: Hero;

  constructor() { }
}
// #enddocregion example
