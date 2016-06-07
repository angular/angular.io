// #docplaster
// #docregion
import { Component, OnInit } from '@angular/core';

import { Hero } from './hero';
import { HeroDetailComponent } from './hero-detail.component';
// #docregion hero-service-import
import { HeroService } from './hero.service';
// #enddocregion hero-service-import

@Component({
  selector: 'my-app',
  // #docregion template
  template: `
    <h1>{{title}}</h1>
    <h2>My Heroes</h2>
    <ul class="heroes">
      <li *ngFor="let hero of heroes"
         role="button"
        [class.selected]="hero === selectedHero"
        [attr.aria-pressed]="hero === selectedHero"
        (click)="onSelect(hero)"
        (keydown.enter)="onSelect(hero)"
        tabindex="0">
        <span class="badge">{{hero.id}}</span> {{hero.name}}
      </li>
    </ul>
    <my-hero-detail [hero]="selectedHero"></my-hero-detail>
  `,
  // #enddocregion template
  styles: [`
    .selected {
      background-color: #CFD8DC !important;
      color: black;
    }
    .heroes {
      margin: 0 0 2em 0;
      list-style-type: none;
      padding: 0;
      width: 15em;
    }
    .heroes li {
      cursor: pointer;
      position: relative;
      left: 0;
      background-color: #EEE;
      margin: .5em;
      padding: .3em 0;
      height: 1.6em;
      border-radius: 4px;
    }
    .heroes li.selected:hover,
    .heroes li.selected:focus{
      background-color: #BBD8DC !important;
      color: black;
    }
    .heroes li:hover,
    .heroes li:focus{
      color: white;
      background-color: #6469dd;
      left: .1em;
    }
    .heroes .text {
      position: relative;
      top: -3px;
    }
    .heroes .badge {
      display: inline-block;
      font-size: small;
      color: white;
      padding: 0.8em 0.7em 0 0.7em;
      background-color: #4E6570;
      line-height: 1em;
      position: relative;
      left: -1px;
      top: -4px;
      height: 1.8em;
      margin-right: .8em;
      border-radius: 4px 0 0 4px;
    }
  `],
  directives: [HeroDetailComponent],
  providers: [HeroService]
})
export class AppComponent implements OnInit {
  title = 'Tour of Heroes';
  heroes: Hero[];
  selectedHero: Hero;

  constructor(private heroService: HeroService) { }

// #docregion get-heroes
  getHeroes() {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }
// #enddocregion get-heroes

  ngOnInit() {
    this.getHeroes();
  }

  onSelect(hero: Hero) { this.selectedHero = hero; }
}
