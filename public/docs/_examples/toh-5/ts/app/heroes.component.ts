// #docplaster
// #docregion
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';

// #docregion renaming, metadata
@Component({
  selector: 'my-heroes',
  // #enddocregion renaming
  templateUrl: 'app/heroes.component.html',
  styleUrls:  ['app/heroes.component.css']
  // #docregion renaming
})
// #enddocregion metadata
// #docregion class
export class HeroesComponent implements OnInit {
  // #enddocregion renaming
  heroes: Hero[];
  selectedHero: Hero;

  constructor(
    private router: Router,
    private heroService: HeroService) { }

  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }
  // #docregion renaming
}
