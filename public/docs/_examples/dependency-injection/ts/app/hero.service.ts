// #docregion
import {Hero} from './hero';
import {HEROES} from './mock_heroes';

class HeroService {

  heroes: Hero[];

  constructor() {
    this.heroes = HEROES;
  }

  getHeroes() {
    return this.heroes;
  }
}
// #enddocregion
