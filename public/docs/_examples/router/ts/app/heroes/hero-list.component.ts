// #docplaster
// #docregion
// TODO SOMEDAY: Feature Componetized like CrisisCenter
import { Component }          from '@angular/core';
// #docregion import-router
import { OnActivate, Router, RouteSegment, RouteTree } from '@angular/router';
// #enddocregion import-router

import { Hero, HeroService}   from './hero.service';

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
export class HeroListComponent implements OnActivate {
  heroes: Hero[];

  // #docregion ctor
  private selectedId: number;

  constructor(
    private service: HeroService,
    private router: Router) {  }
  // #enddocregion ctor

  routerOnActivate(curr: RouteSegment, prev?: RouteSegment, currTree?: RouteTree, prevTree?: RouteTree): void {
    this.selectedId = +curr.getParam('id');
    this.service.getHeroes().then(heroes => this.heroes = heroes);
  }

  // #docregion isSelected
  isSelected(hero: Hero) { return hero.id === this.selectedId; }
  // #enddocregion isSelected

  // #docregion select
  onSelect(hero: Hero) {
    this.router.navigate(['/hero', hero.id]);
  }
  // #enddocregion select

}
// #enddocregion
