import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of }         from 'rxjs/observable/of';

import { Hero } from './hero';

@Injectable()
export class HeroesService {
  heroes: Hero[] = [
    { id: 1, name: 'RubberMan', power: 'Flexibility'},
    { id: 2, name: 'Tornado',   power: 'Weather changer'}
  ];

  getHeroes(): Observable<Hero[]> {
    return of(this.heroes);
  }

  saveHero(hero: Hero) {
    const currentHero = this.heroes.find(h => h.id === hero.id);
    if (currentHero) {
      Object.assign(currentHero, hero); // demo: mutate
    }
  }
}
