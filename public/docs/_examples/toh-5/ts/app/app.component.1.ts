// #docplaster
// #docregion
import { Component }       from '@angular/core';
import { HeroService }     from './hero.service';
import { HeroesComponent } from './heroes.component';
// #enddocregion

// For testing only
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router';

// #docregion

@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <my-heroes></my-heroes>
  `,
  directives: [HeroesComponent],
  providers: [
// #enddocregion
   ROUTER_PROVIDERS,
// #docregion
    HeroService
  ]
})
export class AppComponent {
  title = 'Tour of Heroes';
}
// #enddocregion
