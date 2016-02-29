// #docregion
import {Component,  OnInit}  from 'angular2/core';
import {Hero, HeroService}   from './hero.service';
import {RouteParams, Router} from 'angular2/router';

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
    private _router:Router,
    private _routeParams:RouteParams,
    private _service:HeroService){}
  // #enddocregion ctor

  // #docregion ngOnInit
  ngOnInit() {
    let id = this._routeParams.get('id');
    this._service.getHero(id).then(hero => this.hero = hero);
  }
  // #enddocregion ngOnInit

  // #docregion gotoHeroes
  gotoHeroes() {
    let heroId = this.hero ? this.hero.id : null;
    // Pass along the hero id if available
    // so that the HeroList component can select that hero.
    // Add a totally useless `foo` parameter for kicks.
    // #docregion gotoHeroes-navigate
    this._router.navigate(['Heroes',  {id: heroId, foo: 'foo'} ]);
    // #enddocregion gotoHeroes-navigate
  }
  // #enddocregion gotoHeroes
}
