// #docregion
import {Component, OnInit} from 'angular2/core';
import {Hero}              from './hero';
import {HeroService}       from './hero.service';

@Component({
  selector: 'hero-list',
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
})
// #docregion component
export class HeroListComponent implements OnInit {

  constructor (private _heroService: HeroService) {}

  heroes:Hero[];

  // #docregion ngOnInit
  ngOnInit() {
    this._heroService.getHeroes()
                     .subscribe(
                       heroes => this.heroes = heroes,
                       error => alert(`Server error. Try again later`));
  }
  // #enddocregion ngOnInit

  // #docregion addHero
  addHero (name: string) {
    if (!name) {return;}
    this._heroService.addHero(name)
                     .subscribe(
                       hero  => this.heroes.push(hero),
                       error => alert(error));

  }
  // #enddocregion addHero
}
// #enddocregion component
