// #docregion
import { Component } from 'angular2/core';
import { Hero, HeroService } from './hero.service';
import { Router, OnActivate, RouteSegment } from 'angular2/alt_router';

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
export class HeroDetailComponent implements OnActivate  {
  hero: Hero;

  // #docregion ctor
  constructor(
    private _router: Router,
    private _service: HeroService) {}
  // #enddocregion ctor


  // #docregion OnActivate
  routerOnActivate(curr: RouteSegment): void {
    let id = +curr.getParam('id');
    this._service.getHero(id).then(hero => this.hero = hero);
  }
  // #enddocregion OnActivate

  gotoHeroes() {
    let heroId = this.hero ? this.hero.id : null;
    // Pass along the hero id if available
    // so that the HeroList component can select that hero.
    // Add a totally useless `foo` parameter for kicks.
    // #docregion gotoHeroes-navigate
    this._router.navigateByUrl(`/heroes/${heroId};foo=foo`);
    // #enddocregion gotoHeroes-navigate
  }
}
