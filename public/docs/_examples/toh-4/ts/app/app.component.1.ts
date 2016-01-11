// #docplaster
// #docregion on-init
import {OnInit} from 'angular2/core';

// #enddocregion on-init
import {Component} from 'angular2/core';
import {Hero} from './hero';
import {HeroDetailComponent} from './hero-detail.component';
// #docregion hero-service-import
import {HeroService} from './hero.service.1';
// #enddocregion hero-service-import

// Testable but never shown
@Component({
  selector: 'my-app',
  template: `
  <div *ngFor="#hero of heroes" (click)="onSelect(hero)">
    {{hero.name}}
  </div>
  <my-hero-detail [hero]="selectedHero"></my-hero-detail>
  `,
  directives: [HeroDetailComponent],
  // #docregion providers
  providers: [HeroService]
  // #enddocregion providers
})
// #docregion on-init
export class AppComponent implements OnInit {
  // #enddocregion on-init
  public title = 'Tour of Heroes';
  // #docregion heroes-prop
  public heroes: Hero[];
  // #enddocregion heroes-prop
  public selectedHero: Hero;

  // #docregion new-service
  heroService = new HeroService(); // don't do this
  // #enddocregion new-service
  // #docregion ctor
  constructor(private _heroService: HeroService) { }
  // #enddocregion ctor
  // #docregion getHeroes
  getHeroes() {
    //#docregion get-heroes
    this.heroes = this._heroService.getHeroes();
    // #enddocregion get-heroes
  }
  // #enddocregion getHeroes

  // #docregion ng-on-init
  // #docregion on-init
  ngOnInit() {
    // #enddocregion on-init
    this.getHeroes();
    // #docregion on-init
  }
  // #enddocregion on-init
  // #enddocregion ng-on-init

  onSelect(hero: Hero) { this.selectedHero = hero; }
  // #docregion on-init
}
// #enddocregion on-init
