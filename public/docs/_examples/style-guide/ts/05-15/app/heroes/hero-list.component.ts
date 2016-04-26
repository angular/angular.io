// #docregion
import { Component, OnInit } from 'angular2/core';

import { Hero, HeroService } from './shared/index';

@Component({
  selector: 'toh-hero-list',
  template: `...`
})
// #docregion example
export class HeroListComponent implements OnInit {
  heroes: Hero[];
  constructor(private heroService: HeroService) {}
  getHeros() {
    this.heroes = [];
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }
  ngOnInit() {
    this.getHeros();
  }
}
// #enddocregion example

