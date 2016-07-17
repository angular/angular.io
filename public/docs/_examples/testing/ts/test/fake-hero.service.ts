import { Hero }           from '../app/hero/hero';
import { HeroService }    from '../app/hero/hero.service';

// Re-export for testing convenience
export { Hero }           from '../app/hero/hero';
export { HeroService }    from '../app/hero/hero.service';

export var HEROES: Hero[] = [
  {id: 41, name: 'Bob'},
  {id: 42, name: 'Carol'},
  {id: 43, name: 'Ted'},
  {id: 44, name: 'Alice'},
  {id: 45, name: 'Speedy'},
  {id: 46, name: 'Stealthy'}
];

export class FakeHeroService implements HeroService {

  heroes = HEROES.map(h => Object.assign({}, h)); // clone HEROES
  lastPromise: Promise<any>;  // remember so we can spy on promise calls

  getHero(id: number | string) {
    if (typeof id === 'string') {
      id = parseInt(id as string, 10);
    }
    let hero = this.heroes.find(h => h.id === id);
    return this.lastPromise = Promise.resolve(hero);
  }

  getHeroes() {
    return this.lastPromise = Promise.resolve<Hero[]>(this.heroes);
  }

}
