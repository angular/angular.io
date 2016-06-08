// #docplaster
// #docregion
import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';

import { DashboardComponent } from './dashboard.component';
import { HeroesComponent } from './heroes.component';
// #docregion hero-detail-import
import { HeroDetailComponent } from './hero-detail.component';
// #enddocregion hero-detail-import
import { HeroService } from './hero.service';

@Component({
  selector: 'my-app',
// #docregion template
  template: `
    <h1>{{title}}</h1>
    <nav>
      <a [routerLink]="['Dashboard']">Dashboard</a>
      <a [routerLink]="['Heroes']">Heroes</a>
    </nav>
    <router-outlet></router-outlet>
  `,
// #enddocregion template
// #docregion style-urls
  styleUrls: ['app/app.component.css'],
// #enddocregion style-urls
  directives: [ROUTER_DIRECTIVES],
  providers: [
    ROUTER_PROVIDERS,
    HeroService
  ]
})
@RouteConfig([
// #docregion dashboard-route
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardComponent,
    useAsDefault: true
  },
// #enddocregion dashboard-route
// #docregion hero-detail-route
  {
    path: '/detail/:id',
    name: 'HeroDetail',
    component: HeroDetailComponent
  },
// #enddocregion hero-detail-route
  {
    path: '/heroes',
    name: 'Heroes',
    component: HeroesComponent
  }
])
export class AppComponent {
  title = 'Tour of Heroes';
}
// #enddocregion
