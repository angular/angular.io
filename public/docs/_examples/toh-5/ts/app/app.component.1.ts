/* tslint:disable no-unused-variables */
// #docplaster
// #docregion
import { Component }       from '@angular/core';

import { HeroService }     from './hero.service';
import { HeroesComponent } from './heroes.component';
// #enddocregion

// For testing only
import { ROUTER_DIRECTIVES } from '@angular/router';

// #docregion
@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <my-heroes></my-heroes>
  `,
  directives: [HeroesComponent],
  providers: [
    // #enddocregion
    // #docregion
    HeroService
  ]
})
export class AppComponent {
  title = 'Tour of Heroes';
}
