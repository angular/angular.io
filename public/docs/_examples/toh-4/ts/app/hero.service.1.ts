// #docplaster
// #docregion
import {HEROES} from './mock-heroes';
// #docregion empty-class
import {Injectable} from 'angular2/core';

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