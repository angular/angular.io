// ToH Promise Version
// #docregion
import {Component, OnInit} from 'angular2/core';
import {Hero}              from './hero';
import {HeroService}       from './hero.service.1';

@Component({
  selector: 'hero-list',
  templateUrl: 'app/toh/hero-list.component.html',
  styles: ['.error {color:red;}']
})
// #docregion component
export class HeroListComponent implements OnInit {

  constructor (private _heroService: HeroService) {}

  errorMessage: string;
  heroes: Hero[];

  ngOnInit() { this.getHeroes(); }

  // #docregion methods
  getHeroes() {
    this._heroService.getHeroes()
                     .then(
                       heroes => this.heroes = heroes,
                       error =>  this.errorMessage = <any>error);
  }

  addHero (name: string) {
    if (!name) {return;}
    this._heroService.addHero(name)
                     .then(
                       hero  => this.heroes.push(hero),
                       error =>  this.errorMessage = <any>error);
  }
  // #enddocregion methods
}
// #enddocregion component
