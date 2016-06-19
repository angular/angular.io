// #docplaster
// #docregion
import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { HeroService } from './hero.service';

@Component({
  selector: 'my-app',
  // #docregion template
  template: `
    <h1>{{title}}</h1>
    <nav>
      // #docregion router-link-active
      <a [routerLink]="['/dashboard']" routerLinkActive="active">Dashboard</a>
      <a [routerLink]="['/heroes']" routerLinkActive="active">Heroes</a>
      // #enddocregion router-link-active
    </nav>
    <router-outlet></router-outlet>
  `,
  // #enddocregion template
  // #docregion style-urls
  styleUrls: ['app/app.component.css'],
  // #enddocregion style-urls
  directives: [ROUTER_DIRECTIVES],
  providers: [
    HeroService
  ]
})
export class AppComponent {
  title = 'Tour of Heroes';
}
// #enddocregion
