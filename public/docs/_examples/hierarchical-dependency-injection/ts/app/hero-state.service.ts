// #docregion
import { Injectable }    from '@angular/core';
import { Hero }          from './hero';
import { HeroesService } from './heroes.service';

@Injectable()
export class HeroStateService {
  private currentHero: Hero;
  private originalHero: Hero;

  constructor(private heroService: HeroesService) { }

  set hero (hero: Hero) {
    this.originalHero = hero;
    this.currentHero = this.cloneHero(hero);
  }

  get hero (): Hero {
    return this.currentHero;
  }

  restoreHero() {
    this.hero = this.originalHero;
  }

  saveHero() {
    this.hero = this.currentHero;
    this.heroService.saveHero(this.currentHero);
  }

  ///// private ////

  private cloneHero (hero: Hero): Hero {
    return Object.assign({}, hero); // lame cloning
  }
}
