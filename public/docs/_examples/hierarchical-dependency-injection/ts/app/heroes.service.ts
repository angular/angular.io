import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';

import { Hero, HeroTaxReturn } from './hero';

@Injectable()
export class HeroesService {
  heroes: Hero[] = [
    { id: 1, name: 'RubberMan', tid: '082-27-5678'},
    { id: 2, name: 'Tornado',   tid: '099-42-4321'}
  ];

  heroTaxReturns: HeroTaxReturn[] = [
    new HeroTaxReturn(10, this.heroes[0], 35000),
    new HeroTaxReturn(20, this.heroes[1], 1250000)
  ];

  getHeroes(): Observable<Hero[]> {
    return new Observable<Hero[]>((subscriber: Subscriber<Hero[]>) => {
      subscriber.next(this.heroes);
      subscriber.complete();
    });
  }

  getTaxReturn(hero: Hero): Observable<HeroTaxReturn> {
    return new Observable<HeroTaxReturn>((subscriber: Subscriber<HeroTaxReturn>) => {
      const htr = this.heroTaxReturns.find(t => t.hero.id === hero.id);
      subscriber.next(htr || new HeroTaxReturn(0, hero));
      subscriber.complete();
    });
  }

  saveTaxReturn(heroTaxReturn: HeroTaxReturn): Observable<HeroTaxReturn> {
    return new Observable<HeroTaxReturn>((subscriber: Subscriber<HeroTaxReturn>) => {
      const htr = this.heroTaxReturns.find(t => t.id === heroTaxReturn.id);
      if (htr) {
        heroTaxReturn = Object.assign(htr, heroTaxReturn); // demo: mutate
      } else {
        this.heroTaxReturns.push(heroTaxReturn);
      }
      subscriber.next(heroTaxReturn);
      subscriber.complete();
    });
  }
}
