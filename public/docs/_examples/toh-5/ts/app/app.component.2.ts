// #docplaster
// #docregion
import { Component } from '@angular/core';
// #docregion import-router
import { ROUTER_DIRECTIVES } from '@angular/router';
// #enddocregion import-router

import { HeroService }     from './hero.service';

@Component({
  selector: 'my-app',
  // #docregion template
  template: `
    <h1>{{title}}</h1>
    <a [routerLink]="['/heroes']">Heroes</a>
    <router-outlet></router-outlet>
  `,
  // #enddocregion template
  // #docregion directives-and-providers
  directives: [ROUTER_DIRECTIVES],
  providers: [
    HeroService
  ]
  // #enddocregion directives-and-providers
})
export class AppComponent {
  title = 'Tour of Heroes';
}
