// #docplaster
// #docregion
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';

import { Hero } from './hero';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from './hero.service';

// #docregion metadata
// #docregion heroes-component-renaming
@Component({
  selector: 'my-heroes',
// #enddocregion heroes-component-renaming
  templateUrl: 'app/heroes.component.html',
  styleUrls:  ['app/heroes.component.css'],
  directives: [HeroDetailComponent]
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
    private _router: Router,
    private _heroService: HeroService) { }

  getHeroes() {
    this._heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  ngOnInit() {
    this.getHeroes();
  }

  onSelect(hero: Hero) { this.selectedHero = hero; }

  gotoDetail() {
    this._router.navigate(['HeroDetail', { id: this.selectedHero.id }]);
  }
// #docregion heroes-component-renaming
}
// #enddocregion heroes-component-renaming
// #enddocregion class
// #enddocregion
