// #docregion example
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Hero, HeroService } from '../shared';

@Component({
  selector: 'toh-hero-list',
  template: `...`
})
export class HeroListComponent implements OnInit, OnDestroy {
  heroes: Hero[];

  constructor(private heroService: HeroService) {}

  getHeroes() {
    this.heroes = [];
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }

  ngOnInit() {
    this.getHeroes();
  }

  ngOnDestroy() {
    this.heroService.getHeroes().unsubscribe();
  }
}
// #enddocregion example

