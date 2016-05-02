import { Component }     from '@angular/core';
import { Routes, ROUTER_DIRECTIVES } from '@angular/router';

import { CrisisListComponent }   from './crisis-list.component.1';
import { CrisisDetailComponent } from './crisis-detail.component.1';
import { CrisisService }         from './crisis.service';

// #docregion minus-imports
@Component({
  template:  `
    <h2>CRISIS CENTER</h2>
    <router-outlet></router-outlet>
  `,
  directives: [ROUTER_DIRECTIVES],
// #docregion providers
  providers:  [CrisisService]
// #enddocregion providers
})
// #docregion route-config
@Routes([
  // #docregion default-route
  {path: '/',    component: CrisisListComponent}, // , useAsDefault: true}, // coming soon
  // #enddocregion default-route
  {path: '/:id', component: CrisisDetailComponent}
])
// #enddocregion route-config
export class CrisisCenterComponent { }
// #enddocregion  minus-imports
