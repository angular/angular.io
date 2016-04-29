// #docplaster
// #docregion
import {Component} from 'angular2/core';
import {Routes, ROUTER_DIRECTIVES} from 'angular2/alt_router';

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
      <a [routerLink]="['/crisis-center/']">Crisis Center</a>
      <a [routerLink]="['/heroes']">Heroes</a>
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
    component: CrisisCenterComponent,
    // useAsDefault: true // not implemented yet
  },
  // #enddocregion routes-cc

  {path: '/heroes',  component: HeroListComponent},
  {path: '/hero/:id', component: HeroDetailComponent},
])
// #enddocregion routes
export class AppComponent { }
