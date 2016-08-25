import { Injectable } from '@angular/core';

import { Hero, HeroService } from '../model';

@Injectable()
export class HeroDetailService {
  constructor(private heroService: HeroService) {  }

  getHero(id: number | string): Promise<Hero> {
    if (typeof id === 'string') {
      id = parseInt(id as string, 10);
    }
    return this.heroService.getHero(id).then(hero => {
      return hero ? Object.assign({}, hero) : null; // clone or null
    });
  }

  saveHero(hero: Hero) {
    return this.heroService.updateHero(hero);
  }
}
