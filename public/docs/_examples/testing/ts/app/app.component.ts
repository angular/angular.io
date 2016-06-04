// #docplaster
// #docregion
import { Component } from '@angular/core';

// Can't test with ROUTER_DIRECTIVES yet
// import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';

import { RouteConfig, RouterLink,
         RouterOutlet, ROUTER_PROVIDERS } from '@angular/router-deprecated';

import { DashboardComponent }  from './dashboard.component';
import { HeroesComponent }     from './heroes.component';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService }         from './hero.service';

import { BAG_DIRECTIVES, BAG_PROVIDERS } from './bag';

@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <nav>
      <a [routerLink]="['Dashboard']">Dashboard</a>
      <a [routerLink]="['Heroes']">Heroes</a>
    </nav>
    <router-outlet></router-outlet>
    <hr>
    <h1>Bag-a-specs</h1>
    <my-if-parent-comp></my-if-parent-comp>
    <h3>External Template Comp</h3>
    <external-template-comp></external-template-comp>
    <h3>Comp With External Template Comp</h3>
    <comp-w-ext-comp></comp-w-ext-comp>
  `,
  /*

  */
  styleUrls: ['app/app.component.css'],
  directives: [RouterLink, RouterOutlet, BAG_DIRECTIVES],
  providers: [
    ROUTER_PROVIDERS,
    HeroService,
    BAG_PROVIDERS
  ]
})
@RouteConfig([
  { path: '/dashboard',  name: 'Dashboard',  component: DashboardComponent, useAsDefault: true },
  { path: '/detail/:id', name: 'HeroDetail', component: HeroDetailComponent },
  { path: '/heroes',    name: 'Heroes',      component: HeroesComponent }
])
export class AppComponent {
  title = 'Tour of Heroes';
}
