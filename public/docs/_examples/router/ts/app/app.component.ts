// #docplaster
// #docregion
import {Component} from 'angular2/core';
import {Routes, ROUTER_DIRECTIVES} from 'angular2/router';

import {CrisisCenterComponent} from './crisis-center/crisis-center.component';
import {HeroListComponent}     from './heroes/hero-list.component';
import {HeroDetailComponent}   from './heroes/hero-detail.component';

import {DialogService}         from './dialog.service';
import {HeroService}           from './heroes/hero.service';

@Component({
  selector: 'my-app',
// #docregion template
  template: `
    <h1 class="title">Component Router</h1>
    <nav>
      <a [routerLink]="['CrisisCenter']">Crisis Center</a>
      <a [routerLink]="['Heroes']">Heroes</a>
    </nav>
    <router-outlet></router-outlet>
  `,
// #enddocregion template
  providers:  [DialogService, HeroService],
  directives: [ROUTER_DIRECTIVES]
})
// #docregion routes
@Routes([

  // #docregion routes-cc
  { // Crisis Center child route
    path: '/crisis-center/...',
    name: 'CrisisCenter',
    component: CrisisCenterComponent,
    useAsDefault: true
  },
  // #enddocregion routes-cc

  {path: '/heroes',   name: 'Heroes',     component: HeroListComponent},
  {path: '/hero/:id', name: 'HeroDetail', component: HeroDetailComponent},
  // #enddocregion routes
  // #docregion asteroid-route
  {path: '/disaster', name: 'Asteroid', redirectTo: ['CrisisCenter', 'CrisisDetail', {id:3}]}
   // #enddocregion asteroid-route
   // #docregion routes
])
// #enddocregion routes
export class AppComponent { }
