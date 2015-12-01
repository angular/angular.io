// #docregion
import {Component, OnInit} from 'angular2/core';
import {Observable}        from 'rxjs/Observable';
import {HTTP_PROVIDERS}    from 'angular2/http';
import {Hero}              from './hero';
import {HeroService}       from './hero.service';

@Component({
  selector: 'my-toh',
// #docregion template
  template: `
  <h1>{{title}}</h1>
  <h3>Heroes:</h3>
  <ul>
    <li *ngFor="#hero of heroes | async">
      {{ hero.name }}
    </li>
  </ul>
  New Hero:
  <input #newHero />
  <button (click)="addHero(newHero.value)">Add Hero</button>
  `,
  // #enddocregion template
  providers: [HeroService, HTTP_PROVIDERS]
})
// #docregion component
export class TohComponent implements OnInit {

  constructor (private _heroService: HeroService) {}

  heroes:Observable<Hero[]>;
  title = 'Tour of Heroes';

  // #docregion ngOnInit
  ngOnInit() {
    // <li *ngFor="#hero of heroes | async">
    this.heroes = this._heroService.getHeroes();
  }
  // #enddocregion ngOnInit

  addHero (name: string) {
    name && alert(`Adding hero: "${name}"`);
  }
}
// #enddocregion component
