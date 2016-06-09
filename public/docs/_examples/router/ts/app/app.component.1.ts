/* First version */
// #docplaster

// #docregion
import { Component } from '@angular/core';
// #docregion import-router
import { provideRouter, ROUTER_DIRECTIVES } from '@angular/router';
// #enddocregion import-router
// #docregion route-config
import { routes } from './app.routes';

// #enddocregion route-config

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
  directives: [ROUTER_DIRECTIVES],
  providers: [
    provideRouter(routes)
  ]
})
// #enddocregion
export class AppComponent { }
// #enddocregion

/*
// #docregion route-config
@Component({
  providers: [
    provideRouter(routes)
  ]
})
// #enddocregion route-config

// #docregion
// #docregion route-config
export class AppComponent { }
// #enddocregion route-config
// #enddocregion
*/
