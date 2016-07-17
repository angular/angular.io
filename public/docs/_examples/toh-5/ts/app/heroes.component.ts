// #docplaster
// #docregion
import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';

// #docregion heroes-component-renaming, metadata
@Component({
  selector: 'my-heroes',
  // #enddocregion heroes-component-renaming
  templateUrl: 'app/heroes.component.html',
  styleUrls:  ['app/heroes.component.css'],
  // #docregion heroes-component-renaming,
  directives: [ROUTER_DIRECTIVES]
})
// #enddocregion heroes-component-renaming, metadata
// #docregion class, heroes-component-renaming
export class HeroesComponent implements OnInit {
  // #enddocregion heroes-component-renaming
  heroes: Hero[];
  selectedHero: Hero;
  redirect: string = encodeURIComponent('/heroes');

  constructor(
    private router: Router,
    private heroService: HeroService) { }

  getHeroes() {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  ngOnInit() {
    this.getHeroes();
  }

  onSelect(hero: Hero) { this.selectedHero = hero; }

  // #docregion heroes-component-renaming
}
