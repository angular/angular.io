import {Component}     from 'angular2/core';
import {RouteConfig, RouterOutlet} from 'angular2/router';

import {CrisisListComponent}   from './crisis-list.component.1';
import {CrisisDetailComponent} from './crisis-detail.component.1';
import {CrisisService}         from './crisis.service';

// #docregion minus-imports
@Component({
  template:  `
    <h2>CRISIS CENTER</h2>
    <router-outlet></router-outlet>
  `,
  directives: [RouterOutlet],
// #docregion providers
  providers:  [CrisisService]
// #enddocregion providers
})
// #docregion route-config
@RouteConfig([
  // #docregion default-route
  {path:'/',         name: 'CrisisCenter', component: CrisisListComponent, useAsDefault: true},
  // #enddocregion default-route
  {path:'/:id',      name: 'CrisisDetail', component: CrisisDetailComponent}
])
// #enddocregion route-config
export class CrisisCenterComponent { }
// #enddocregion  minus-imports
