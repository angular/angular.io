// #docregion
import { Component, OnInit } from '@angular/core';
import { Hero }              from './hero';
import { HeroService }       from './hero.service';

@Component({
  moduleId: module.id,
  selector: 'hero-list',
  templateUrl: 'hero-list.component.html',
  providers: [ HeroService ]
})

export class HeroListComponent implements OnInit {

  constructor (private heroService: HeroService) {}

  errorMessage: string;
  heroes: Hero[];
  mode = 'Observable';

  ngOnInit() { this.getHeroes(); }

  getHeroes() {
    this.heroService.getHeroes()
                     .subscribe(
                       heroes => this.heroes = heroes,
                       error =>  this.errorMessage = <any>error);
  }

  addHero (name: string) {
    if (!name) { return; }
    this.heroService.addHero(name)
                     .subscribe(
                       hero  => this.heroes.push(hero),
                       error =>  this.errorMessage = <any>error);
  }
}
