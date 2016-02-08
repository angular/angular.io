// #docplaster
import {Component, OnInit}   from 'angular2/core';
import {Hero}                from './hero';
import {HeroDetailComponent} from './hero-detail.component';
import {HeroService}         from './hero.service';

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
// #docregion ctor
  constructor(private _service: HeroService){ }
// #enddocregion ctor

  heroes:Hero[];
  selectedHero: Hero;

  ngOnInit(){
    this.heroes = this._service.getHeroes();
  }

  selectHero(hero: Hero) { this.selectedHero = hero; }
}
// #enddocregion class
