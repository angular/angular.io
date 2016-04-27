// #docplaster
// #docregion
import { Component } from '@angular/core';
// #docregion import-router
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
// #enddocregion import-router

import { HeroService }     from './hero.service';
import { HeroesComponent } from './heroes.component';

@Component({
  selector: 'my-app',
// #docregion template
  template: `
    <h1>{{title}}</h1>
    <a [routerLink]="['Heroes']">Heroes</a>
    <router-outlet></router-outlet>
  `,
// #enddocregion template
// #docregion directives-and-providers
  directives: [ROUTER_DIRECTIVES],
  providers: [
    ROUTER_PROVIDERS,
    HeroService
  ]
  // #enddocregion directives-and-providers
})
// #docregion route-config
@RouteConfig([
  {
    path: '/heroes',
    name: 'Heroes',
    component: HeroesComponent
  }
])
// #enddocregion route-config
export class AppComponent {
  title = 'Tour of Heroes';
}
// #enddocregion
