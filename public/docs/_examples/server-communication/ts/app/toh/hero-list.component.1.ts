// #docregion
import {Component, OnInit} from 'angular2/core';
import {Hero}              from './hero';
import {HeroService}       from './hero.service.1';

@Component({
  selector: 'hero-list',
// #docregion template
  template: `
  <h3>Heroes:</h3>
  <ul>
    <li *ngFor="#hero of heroes">
      {{ hero.name }}
    </li>
  </ul>
  New Hero:
  <input #newHero />
  <button (click)="addHero(newHero.value); newHero.value=''">
    Add Hero
  </button>
  `,
  // #enddocregion template
})
// #docregion component
export class HeroListComponent implements OnInit {

  constructor (private _heroService: HeroService) {}

  heroes:Hero[];

  // #docregion ngOnInit
  ngOnInit() {
    this._heroService.getHeroes()
                     .then(
                       heroes => this.heroes = heroes,
                       error => alert(`Server error. Try again later`));
  }
  // #enddocregion ngOnInit

  // #docregion addHero
  addHero (name: string) {
    if (!name) {return;}
    this._heroService.addHero(name)
                     .then(
                       hero  => this.heroes.push(hero),
                       error => alert(error));

  }
  // #enddocregion addHero
}
// #enddocregion component
