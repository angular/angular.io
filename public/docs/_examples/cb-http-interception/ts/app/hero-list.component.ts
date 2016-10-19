// #docregion
import { Component, OnInit } from '@angular/core';
import { Hero }              from './hero';
import { HeroService }       from './hero.service';

@Component({
  moduleId: module.id,
  selector: 'hero-list',
  templateUrl: 'hero-list.component.html',
  providers: [ HeroService ],
  styles: ['.error {color:red;}']
})
export class HeroListComponent implements OnInit {
  errorMessage = '';
  heroes: Hero[];

  constructor (private heroService: HeroService) {}

  ngOnInit() { this.getHeroes(); }

  getHeroes() {
    this.heroes = [];
    this.heroService.getHeroes().subscribe(
      heroes => this.heroes = heroes,
      error =>  this.errorMessage = error);
  }

  addHero (name: string) {
    this.errorMessage = '';
    if (!name) { return; }
    this.heroService.addHero(name).subscribe(
      hero  => this.heroes.push(hero),
      error =>  this.errorMessage = error);
  }

  deleteHero (hero: Hero) {
    this.errorMessage = '';
    this.heroService.deleteHero(hero).subscribe(
      () => this.getHeroes(),
      error =>  this.errorMessage = error);
  }

  refresh() {
    this.errorMessage = '';
    this.getHeroes();
  }
}
