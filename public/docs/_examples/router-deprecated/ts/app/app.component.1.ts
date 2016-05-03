/* First version */
// #docplaster

// #docregion
import { Component } from '@angular/core';
// #docregion import-router
import { RouteConfig, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
// #enddocregion import-router

import { CrisisListComponent }   from './crisis-list.component';
import { HeroListComponent }     from './hero-list.component';

@Component({
  selector: 'my-app',
// #docregion template
  template: `
    <h1>Component Router (Deprecated)</h1>
    <nav>
      <a [routerLink]="['CrisisCenter']">Crisis Center</a>
      <a [routerLink]="['Heroes']">Heroes</a>
    </nav>
    <router-outlet></router-outlet>
  `,
// #enddocregion template
  directives: [ROUTER_DIRECTIVES]
})
// #enddocregion
/*
// #docregion route-config
@Component({ ... })
// #enddocregion route-config
*/
// #docregion
// #docregion route-config
@RouteConfig([
// #docregion route-defs
  {path: '/crisis-center', name: 'CrisisCenter', component: CrisisListComponent},
  {path: '/heroes',        name: 'Heroes',       component: HeroListComponent}
// #enddocregion route-defs
])
export class AppComponent { }
// #enddocregion route-config
// #enddocregion
