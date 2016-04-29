// #docregion
import { Component }            from '@angular/core';
import { ROUTER_DIRECTIVES }    from '@angular/router';

import { CrisisService }        from './crisis.service';

@Component({
  template:  `
    <h2>CRISIS CENTER</h2>
    <router-outlet></router-outlet>
  `,
  directives: [ROUTER_DIRECTIVES],
  providers:  [CrisisService]
})
export class CrisisCenterComponent { }
// #enddocregion
