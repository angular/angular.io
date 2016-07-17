import { Injectable } from '@angular/core';

import { Hero }       from './hero';
import { HEROES }     from './test-heroes';

@Injectable()
/** Dummy HeroService that pretends to be real */
export class HeroService {
  getHeroes() {
    return Promise.resolve(HEROES);
  }

  getHero(id: number | string): Promise<Hero> {
    if (typeof id === 'string') {
      id = parseInt(id as string, 10);
    }
    return this.getHeroes().then(
      heroes => heroes.find(hero => hero.id === id)
    );
  }

  updateHero(hero: Hero): Promise<Hero> {
    return this.getHero(hero.id).then(h => {
      return h ?
        Object.assign(h, hero) :
        Promise.reject(`Hero ${hero.id} not found`) as any as Promise<Hero>;
    });
  }
}
