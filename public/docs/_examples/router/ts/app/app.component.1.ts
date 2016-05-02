/* First version */
// #docplaster

// #docregion
import {Component} from 'angular2/core';
import {Routes, ROUTER_DIRECTIVES} from 'angular2/alt_router';

import {CrisisListComponent}   from './crisis-list.component';
import {HeroListComponent}     from './hero-list.component';

@Component({
  selector: 'my-app',
// #docregion template
  template: `
    <h1>Component Router</h1>
    <nav>
      <a [routerLink]="['/crisis-center']">Crisis Center</a>
      <a [routerLink]="['/heroes']">Heroes</a>
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
@Routes([
// #docregion route-defs
  {path: '/crisis-center', component: CrisisListComponent},
  {path: '/heroes',        component: HeroListComponent}
// #enddocregion route-defs
])
export class AppComponent { }
// #enddocregion route-config
// #enddocregion
