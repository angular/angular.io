// #docregion
import { Component }   from '@angular/core';
import { Hero }        from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'hero-list',
  template: `
  <div *ngFor="let hero of heroes">
    {{hero.id}} - {{hero.name}}
  </div>
  `,
})
export class HeroListComponent {
  heroes: Hero[];

  // #docregion ctor
  constructor(heroService: HeroService) {
    this.heroes = heroService.getHeroes();
  }
  // #enddocregion ctor
}
