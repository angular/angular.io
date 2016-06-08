// #docplaster
// #docregion
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';

import { Hero } from './hero';
import { HeroService } from './hero.service';

// #docregion metadata
// #docregion heroes-component-renaming
@Component({
  selector: 'my-heroes',
// #enddocregion heroes-component-renaming
  templateUrl: 'app/heroes.component.html',
  styleUrls:  ['app/heroes.component.css']
// #docregion heroes-component-renaming
})
// #enddocregion heroes-component-renaming
// #enddocregion metadata
// #docregion class
// #docregion heroes-component-renaming
export class HeroesComponent implements OnInit {
// #enddocregion heroes-component-renaming
  heroes: Hero[];
  selectedHero: Hero;

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

  gotoDetail() {
    this.router.navigate(['HeroDetail', { id: this.selectedHero.id }]);
  }
// #docregion heroes-component-renaming
}
// #enddocregion heroes-component-renaming
// #enddocregion class
// #enddocregion
