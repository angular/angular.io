import { Injectable } from '@angular/core';

import { Hero } from './hero';
import { BackendService } from './backend.service';
import { Logger } from './logger.service';

@Injectable()
// #docregion class
export class HeroService {
  private heroes: Hero[] = [];

  // #docregion ctor
  constructor(
    private backend: BackendService,
    private logger: Logger) { }
  // #enddocregion ctor

  getHeroes() {
    this.backend.getAll(Hero).then( (heroes: Hero[]) => {
      this.logger.log(`Fetched ${heroes.length} heroes.`);
      this.heroes.push(...heroes); // fill cache
    });
    return this.heroes;
  }
}
// #enddocregion class
