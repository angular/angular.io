// #docregion
import {Hero}   from './hero';
import {HEROES} from './mock-heroes';

export class HeroService {
  getHeroes() { return HEROES;  }
}
