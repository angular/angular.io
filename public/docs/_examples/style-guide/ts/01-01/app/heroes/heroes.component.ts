// #docregion
import { Component, OnInit } from '@angular/core';

import { Hero }        from './shared/hero.model';
import { HeroService } from './shared/hero.service';

@Component({
  selector: 'toh-heroes',
  template: `
      <pre>{{heroes | json}}</pre>
    `
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) {}

  ngOnInit() {
    this.heroService.getHeroes()
      .then(heroes => this.heroes = heroes);
  }
}
