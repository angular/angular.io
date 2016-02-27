// #docplaster

// TODO SOMEDAY: Feature Componetized like CrisisCenter
// #docregion
import {Component, OnInit}   from 'angular2/core';
import {Hero, HeroService}   from './hero.service';
// #docregion import-route-params
import {Router, RouteParams} from 'angular2/router';
// #enddocregion import-route-params

@Component({
  // #docregion template
  template: `
    <h2>HEROES</h2>
    <ul class="items">
      <li *ngFor="#hero of heroes"
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
  private _selectedId: number;

  constructor(
    private _service: HeroService,
    private _router: Router,
    routeParams: RouteParams) {
      this._selectedId = +routeParams.get('id');
  }
  // #enddocregion ctor

  // #docregion isSelected
  isSelected(hero: Hero) { return hero.id === this._selectedId; }
  // #enddocregion isSelected

  // #docregion select
  onSelect(hero: Hero) {
    this._router.navigate( ['HeroDetail', { id: hero.id }] );
  }
  // #enddocregion select

  ngOnInit() {
    this._service.getHeroes().then(heroes => this.heroes = heroes)
  }
}
// #enddocregion
