/* Second Heroes version */
// #docplaster

// #docregion
import { Component }                 from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

// #enddocregion
/*
 // Apparent Milestone 2 imports
 // #docregion
 // #docregion hero-import
 import { HeroDetailComponent }   from './heroes/hero-detail.component';
 import { HeroListComponent }     from './heroes/hero-list.component';
 import { HeroService }           from './heroes/hero.service';
 // #enddocregion hero-import
 // #enddocregion
 */
// Actual Milestone 2 imports
import { HeroService }           from './heroes/hero.service';
// #docregion

@Component({
  selector: 'my-app',
  template: `
    <h1>Component Router</h1>
    <nav>
      <a routerLink="/crisis-center" routerLinkActive="active">Crisis Center</a>
      <a routerLink="/heroes" routerLinkActive="active">Heroes</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  providers:  [HeroService],
  directives: [ROUTER_DIRECTIVES]
})
// #enddocregion
export class AppComponent {
}
// #enddocregion route-config
// #enddocregion
