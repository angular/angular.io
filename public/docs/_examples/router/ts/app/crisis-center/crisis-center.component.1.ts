import { Component }            from '@angular/core';
import { ROUTER_DIRECTIVES }    from '@angular/router';

import { CrisisService }        from './crisis.service';

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
export class CrisisCenterComponent { }
// #enddocregion  minus-imports
