/* First version */
// #docplaster

// #docregion
import {Component} from 'angular2/core';
import {Routes, ROUTER_DIRECTIVES} from 'angular2/router';

import {CrisisListComponent}   from './crisis-list.component';
import {HeroListComponent}     from './hero-list.component';

@Component({
  selector: 'my-app',
// #docregion template
  template: `
    <h1>Component Router</h1>
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
// #docregion routes
@Component({ ... })
// #enddocregion routes
*/
// #docregion
// #docregion routes
@Routes([
// #docregion route-defs
  {path:'/crisis-center', name: 'CrisisCenter', component: CrisisListComponent},
  {path:'/heroes',        name: 'Heroes',       component: HeroListComponent}
// #enddocregion route-defs
])
export class AppComponent { }
// #enddocregion routes
// #enddocregion
