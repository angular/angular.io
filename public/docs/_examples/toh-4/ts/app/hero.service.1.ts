// #docplaster
// #docregion
// #docregion empty-class
import { Injectable } from '@angular/core';

// #enddocregion empty-class
import { HEROES } from './mock-heroes';

// #docregion empty-class, getHeroes-stub
@Injectable()
export class HeroService {
  // #enddocregion empty-class
  getHeroes() {
    // #enddocregion getHeroes-stub
    return HEROES;
    // #docregion getHeroes-stub
  }
  // #docregion empty-class
}
