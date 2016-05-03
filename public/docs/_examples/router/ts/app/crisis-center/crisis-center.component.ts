// #docregion
import { Component }     from '@angular/core';
import { ROUTER_DIRECTIVES, Routes } from '@angular/router';

import { CrisisDetailComponent } from './crisis-detail.component';
import { CrisisListComponent }   from './crisis-list.component';
import { CrisisService }         from './crisis.service';

@Component({
  template:  `
    <h2>CRISIS CENTER</h2>
    <router-outlet></router-outlet>
  `,
  directives: [ROUTER_DIRECTIVES],
  providers:  [CrisisService]
})
@Routes([
  {path: '',    component: CrisisListComponent}, // , useAsDefault: true}, // coming soon
  {path: '/:id', component: CrisisDetailComponent}
])
export class CrisisCenterComponent { }
// #enddocregion
