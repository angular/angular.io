import { Component, OnInit }   from '@angular/core';

import { Hero }                from './hero';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService }         from './hero.service';

// #docregion metadata
@Component({
  selector:    'hero-list',
  templateUrl: 'app/hero-list.component.html',
  directives:  [HeroDetailComponent],
  // #docregion providers
  providers:   [HeroService]
  // #enddocregion providers
})
// #docregion class
export class HeroListComponent implements OnInit {
  // #enddocregion metadata
  heroes: Hero[];
  selectedHero: Hero;

  // #docregion ctor
  constructor(private service: HeroService) { }
  // #enddocregion ctor

  ngOnInit() {
    this.heroes = this.service.getHeroes();
  }

  selectHero(hero: Hero) { this.selectedHero = hero; }
  // #docregion metadata
}
