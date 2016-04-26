// #docregion
import { Component, OnInit } from 'angular2/core';

import { HeroService } from './shared/hero.service';
import { Hero } from './shared/hero';

@Component({
  selector: 'toh-heroes',
  template: `
      <pre>{{heroes | json}}</pre>
    `
})
export class HeroListComponent implements OnInit{
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) {}
  
  ngOnInit() {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }
}
