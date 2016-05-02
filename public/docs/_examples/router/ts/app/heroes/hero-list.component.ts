// #docplaster
// #docregion
// TODO SOMEDAY: Feature Componetized like CrisisCenter
import { Component }          from 'angular2/core';
import { Hero, HeroService}   from './hero.service';
// #docregion import-route-params
import { Router, RouteSegment, Tree, OnActivate } from 'angular2/alt_router';
// #enddocregion import-route-params

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
  private _selectedId: number;

  constructor(
    private _service: HeroService,
    private _router: Router) {  }
  // #enddocregion ctor

  routerOnActivate(curr: RouteSegment, prev?: RouteSegment, currTree?: Tree<RouteSegment>, prevTree?: Tree<RouteSegment>): void {
    this._selectedId = +curr.getParam('id');
    this._service.getHeroes().then(heroes => this.heroes = heroes);
  }

  // #docregion isSelected
  isSelected(hero: Hero) { return hero.id === this._selectedId; }
  // #enddocregion isSelected

  // #docregion select
  onSelect(hero: Hero) {
    this._router.navigateByUrl( `/heroes/${hero.id}`);
  }
  // #enddocregion select

}
// #enddocregion
