// #docplaster

// TODO SOMEDAY: Feature Componetized like CrisisCenter
// #docregion
import { Component, OnInit }   from '@angular/core';
// #docregion import-route-params
import { RouteParams, Router } from '@angular/router-deprecated';
// #enddocregion import-route-params

import { Hero, HeroService }   from './hero.service';

@Component({
  // #docregion template
  template: `
    <h2>HEROES</h2>
    <ul class="items">
      <li *ngFor="let hero of heroes"
        [class.selected]="isSelected(hero)"
        (click)="onSelect(hero)">
        <span class="badge">{{hero.id}}</span> {{hero.name}}
      </li>
    </ul>
  `
  // #enddocregion template
})
export class HeroListComponent implements OnInit {
  heroes: Hero[];

  // #docregion ctor
  private selectedId: number;

  constructor(
    private service: HeroService,
    private router: Router,
    routeParams: RouteParams) {
      this.selectedId = +routeParams.get('id');
  }
  // #enddocregion ctor

  // #docregion isSelected
  isSelected(hero: Hero) { return hero.id === this.selectedId; }
  // #enddocregion isSelected

  // #docregion select
  onSelect(hero: Hero) {
    this.router.navigate( ['HeroDetail', { id: hero.id }] );
  }
  // #enddocregion select

  ngOnInit() {


  this.service.getHeroes().then(heroes => this.heroes = heroes);
  }
}
// #enddocregion
