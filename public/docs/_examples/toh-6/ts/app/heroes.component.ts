// #docregion
import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router-deprecated';

import { Hero }                from './hero';
import { HeroService }         from './hero.service';

@Component({
  selector: 'my-heroes',
  templateUrl: 'app/heroes.component.html',
  styleUrls:  ['app/heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;
  addingHero = false;
  error: any;

  constructor(
    private _router: Router,
    private _heroService: HeroService) { }

  getHeroes() {
    this._heroService
        .getHeroes()
        .then(heroes => this.heroes = heroes)
        .catch(error => this.error = error); // TODO: Display error message
  }

  addHero() {
    this.addingHero = true;
    this.selectedHero = null;
  }

  close(savedHero: Hero) {
    this.addingHero = false;
    if (savedHero) { this.getHeroes(); }
  }

  // #docregion delete
  delete(hero: Hero, event: any) {
    event.stopPropagation();
    this._heroService
        .delete(hero)
        .then(res => {
          this.heroes = this.heroes.filter(h => h.id !== hero.id);
        })
        .catch(error => this.error = error); // TODO: Display error message
  }
  // #enddocregion delete

  ngOnInit() {
    this.getHeroes();
  }

  onSelect(hero: Hero) {
    this.selectedHero = hero;
    this.addingHero = false;
  }

  gotoDetail() {
    this._router.navigate(['HeroDetail', { id: this.selectedHero.id }]);
  }
}
