export { Hero }           from './hero';
export { HeroService }    from './hero.service';

import { HEROES }         from './mock-heroes';
import { Hero }           from './hero';
import { HeroService }    from './hero.service';

import { PromiseWrapper } from 'angular2/src/facade/promise';

export class MockHeroService implements HeroService {

    mockHeroes = HEROES.slice();
    lastPromise: Promise<any>;  // so we can spy on promise calls

    getHero(id: number) {
      return this.lastPromise = PromiseWrapper.resolve(this.mockHeroes[0]);
    }

    getHeroes() {
      return this.lastPromise = PromiseWrapper.resolve<Hero[]>(this.mockHeroes);
    }

    getHeroesSlowly() { return this.getHeroes(); }
}
