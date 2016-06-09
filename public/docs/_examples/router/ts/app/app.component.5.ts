// #docplaster
// #docregion
import { Component }                        from '@angular/core';

import { provideRouter, ROUTER_DIRECTIVES } from '@angular/router';
import { routes }                           from './app.routes';
// #docregion can-deactivate-guard
import { CanDeactivateGuard }               from './interfaces';
// #enddocregion can-deactivate-guard

import { DialogService }                    from './dialog.service';
import { HeroService }                      from './heroes/hero.service';

// Add these symbols to override the `LocationStrategy`
import { LocationStrategy,
         HashLocationStrategy } from '@angular/common';


@Component({
  selector: 'my-app',
// #docregion template
  template: `
    <h1 class="title">Component Router</h1>
    <nav>
      <a [routerLink]="['/crisis-center']">Crisis Center</a>
      <a [routerLink]="['/heroes']">Heroes</a>
    </nav>
    <router-outlet></router-outlet>
  `,
// #enddocregion template
  providers:  [
    HeroService,
    DialogService,
    provideRouter(routes),
    CanDeactivateGuard,
    { provide: LocationStrategy,
      useClass: HashLocationStrategy } // .../#/crisis-center/
  ],
  directives: [ROUTER_DIRECTIVES]
})
export class AppComponent {
}
