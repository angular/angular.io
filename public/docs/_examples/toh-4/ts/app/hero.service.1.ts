// #docplaster
// #docregion
// #docregion empty-class
import { Injectable } from '@angular/core';

// #enddocregion empty-class
import { HEROES } from './mock-heroes';

// #docregion empty-class
// #docregion getHeroes-stub
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
// #enddocregion getHeroes-stub
// #enddocregion empty-class
// #enddocregion
