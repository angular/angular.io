// #docplaster
// #docregion
// #docregion just-get-heroes
import {Injectable} from '@angular/core';

import {Hero} from './hero';
import {HEROES} from './mock-heroes';

@Injectable()
export class HeroService {
  //#docregion get-heroes
  getHeroes() {
    return Promise.resolve(HEROES);
  }
  //#enddocregion get-heroes
  // #enddocregion just-get-heroes
  // See the "Take it slow" appendix
  //#docregion get-heroes-slowly
  getHeroesSlowly() {
    return new Promise<Hero[]>(resolve =>
      setTimeout(()=>resolve(HEROES), 2000) // 2 seconds
    );
  }
  //#enddocregion get-heroes-slowly
  // #docregion just-get-heroes
}
// #enddocregion just-get-heroes
// #enddocregion