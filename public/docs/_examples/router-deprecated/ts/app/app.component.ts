// #docplaster
// #docregion
import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import { CrisisCenterComponent } from './crisis-center/crisis-center.component';
import { HeroListComponent }     from './heroes/hero-list.component';
import { HeroDetailComponent }   from './heroes/hero-detail.component';

import { DialogService }         from './dialog.service';
import { HeroService }           from './heroes/hero.service';

@Component({
  selector: 'my-app',
// #docregion template
  template: `
    <h1 class="title">Component Router (Deprecated)</h1>
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
// #docregion route-config
@RouteConfig([

  // #docregion route-config-cc
  { // Crisis Center child route
    path: '/crisis-center/...',
    name: 'CrisisCenter',
    component: CrisisCenterComponent,
    useAsDefault: true
  },
  // #enddocregion route-config-cc

  {path: '/heroes',   name: 'Heroes',     component: HeroListComponent},
  {path: '/hero/:id', name: 'HeroDetail', component: HeroDetailComponent},
])
// #enddocregion route-config
export class AppComponent { }
