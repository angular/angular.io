/* First version */
// #docplaster
// #docregion
import { Component } from '@angular/core';
// #docregion import-router
import { ROUTER_DIRECTIVES } from '@angular/router';
// #enddocregion import-router

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
  // #docregion directives
  directives: [ROUTER_DIRECTIVES]
  // #enddocregion directives
})

export class AppComponent { }
