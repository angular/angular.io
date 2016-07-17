import { HEROES }     from './test-heroes';
import { Injectable } from '@angular/core';

@Injectable()
export class HeroService {
  getHeroes() {
    return Promise.resolve(HEROES);
  }

  getHero(id: number | string) {
    if (typeof id === 'string') {
      id = parseInt(id as string, 10);
    }
    return this.getHeroes().then(
      heroes => heroes.find(hero => hero.id === id)
    );
  }
}
