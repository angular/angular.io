// #docregion
import { Component, OnInit } from 'angular2/core';

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
    this.heroService.getHeros()
      .subscribe(heroes => this.heroes = heroes);
  }
  ngOnInit() {
    this.getHeros();
  }
}
// #enddocregion example

