// #docregion
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Hero, HeroService } from '../shared';

@Component({
  selector: 'toh-heroes',
  template: `
      <pre>{{heroes | json}}</pre>
    `
})
export class HeroListComponent implements OnInit, OnDestroy {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  ngOnDestroy() {
    this.heroService.getHeroes().unsubscribe();
  }
}
