// #docregion
// Promise Version
import { Component, OnInit } from '@angular/core';
import { Hero }              from './hero';
import { HeroService }       from './hero.service.promise';

@Component({
  selector: 'hero-list-promise',
  templateUrl: 'app/toh/hero-list.component.html',
  providers: [ HeroService ]
})
// #docregion component
export class HeroListPromiseComponent implements OnInit {
  errorMessage: string;
  heroes: Hero[];
  mode = 'Promise';

  constructor (private heroService: HeroService) {}

  ngOnInit() { this.getHeroes(); }

  // #docregion methods
  getHeroes() {
    this.heroService.getHeroes()
                     .then(
                       heroes => this.heroes = heroes,
                       error =>  this.errorMessage = <any>error);
  }

  addHero (name: string) {
    if (!name) { return; }
    this.heroService.addHero(name)
                     .then(
                       hero  => this.heroes.push(hero),
                       error =>  this.errorMessage = <any>error);
  }
  // #enddocregion methods
}
// #enddocregion component
