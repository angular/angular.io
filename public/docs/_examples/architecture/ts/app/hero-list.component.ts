// #docplaster
import { Component, OnInit }   from '@angular/core';

import { Hero }                from './hero';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService }         from './hero.service';

// #docregion metadata
// #docregion providers
@Component({
// #enddocregion providers
  selector:    'hero-list',
  templateUrl: 'app/hero-list.component.html',
  directives:  [HeroDetailComponent],
// #docregion providers
  providers:   [HeroService]
})
// #enddocregion providers
// #enddocregion metadata
/*
// #docregion metadata, providers
export class HeroesComponent { ... }
// #enddocregion metadata, providers
*/
// #docregion class
export class HeroListComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;

// #docregion ctor
  constructor(private service: HeroService) { }
// #enddocregion ctor

  ngOnInit() {
    this.heroes = this.service.getHeroes();
  }

  selectHero(hero: Hero) { this.selectedHero = hero; }
}
// #enddocregion class
