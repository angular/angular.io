// #docplaster
// #docregion
import { Component, OnInit } from '@angular/core';
// #docregion imports
import { Router, ActivatedRoute, Params } from '@angular/router';
// #enddocregion imports

import { Hero, HeroService } from './hero.service';

@Component({
  template: `
  <h2>HEROES</h2>
  <div *ngIf="hero">
    <h3>"{{hero.name}}"</h3>
    <div>
      <label>Id: </label>{{hero.id}}</div>
    <div>
      <label>Name: </label>
      <input [(ngModel)]="hero.name" placeholder="name"/>
    </div>
    <p>
      <button (click)="gotoHeroes()">Back</button>
    </p>
  </div>
  `
})
export class HeroDetailComponent implements OnInit  {
  hero: Hero;

  // #docregion ctor
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: HeroService
  ) {}
  // #enddocregion ctor

  // #docregion ngOnInit
  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let id = +params['id']; // (+) converts string 'id' to a number
      this.service.getHero(id).then(hero => this.hero = hero);
    });
  }
  // #enddocregion ngOnInit

  // #docregion gotoHeroes
  gotoHeroes() { this.router.navigate(['/heroes']); }
  // #enddocregion gotoHeroes
}
