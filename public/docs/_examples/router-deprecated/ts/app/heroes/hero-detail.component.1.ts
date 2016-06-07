// #docregion
import { Component,  OnInit }  from '@angular/core';
import { RouteParams, Router } from '@angular/router-deprecated';

import { Hero, HeroService }   from './hero.service';

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
  `,
})
export class HeroDetailComponent implements OnInit  {
  hero: Hero;

  // #docregion ctor
  constructor(
    private router: Router,
    private routeParams: RouteParams,
    private service: HeroService) {}
  // #enddocregion ctor

  // #docregion ngOnInit
  ngOnInit() {
    let id = this.routeParams.get('id');
    this.service.getHero(id).then(hero => this.hero = hero);
  }
  // #enddocregion ngOnInit

  // #docregion gotoHeroes
  gotoHeroes() {
    // Like <a [routerLink]="['Heroes']">Heroes</a>
    this.router.navigate(['Heroes']);
  }
  // #enddocregion gotoHeroes
}
